import { chatClient, streamClient } from "../lib/stream.js";
import crypto from "crypto";
import Session from "../models/Session.js";

const PASSWORD_KEYLEN = 64;

function hashSessionPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .scryptSync(password, salt, PASSWORD_KEYLEN)
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifySessionPassword(password, storedPasswordHash) {
  if (!storedPasswordHash || !password) return false;

  const [salt, storedHash] = storedPasswordHash.split(":");
  if (!salt || !storedHash) return false;

  const hashBuffer = crypto.scryptSync(password, salt, PASSWORD_KEYLEN);
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  if (hashBuffer.length !== storedHashBuffer.length) return false;

  return crypto.timingSafeEqual(hashBuffer, storedHashBuffer);
}

function sanitizeSession(sessionDoc) {
  const session = sessionDoc.toObject
    ? sessionDoc.toObject()
    : { ...sessionDoc };
  session.isPasswordProtected = Boolean(session.sessionPassword);
  delete session.sessionPassword;
  return session;
}

export async function createSession(req, res) {
  try {
    const { problem, difficulty, sessionPassword } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty || !sessionPassword) {
      return res
        .status(400)
        .json({ error: "Problem, difficulty, and room password are required" });
    }

    if (sessionPassword.trim().length < 4) {
      return res
        .status(400)
        .json({ message: "Room password must be at least 4 characters" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
      sessionPassword: hashSessionPassword(sessionPassword.trim()),
    });

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: {
          problem,
          difficulty,
          sessionId: session._id.toString(),
        },
      },
    });

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();
    res.status(201).json({ session: sanitizeSession(session) });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .select("+sessionPassword")
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions: sessions.map(sanitizeSession) });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;
    const session = await Session.findById(id)
      .select("+sessionPassword")
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ session: sanitizeSession(session) });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const { sessionPassword } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const session = await Session.findById(id).select("+sessionPassword");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join as participant" });
    }

    if (
      session.sessionPassword &&
      !verifySessionPassword(
        (sessionPassword || "").trim(),
        session.sessionPassword,
      )
    ) {
      return res.status(401).json({ message: "Invalid room password" });
    }

    if (session.participant) {
      return res.status(409).json({ message: "Session is already full" });
    }
    session.participant = userId;
    await session.save();
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    res.status(200).json({ session: sanitizeSession(session) });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
