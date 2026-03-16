import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const createUserFromClerk = async (clerkId) => {
  if (!ENV.CLERK_SECRET_KEY) {
    throw new Error("Missing Clerk secret key");
  }

  const response = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
    headers: {
      Authorization: `Bearer ${ENV.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Clerk user: ${response.status}`);
  }

  const clerkUser = await response.json();
  const primaryEmail = clerkUser.email_addresses?.[0]?.email_address;

  if (!primaryEmail) {
    throw new Error("Clerk user does not have a primary email address");
  }

  return User.create({
    clerkId,
    email: primaryEmail,
    name:
      `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim() ||
      primaryEmail,
    profileImage: clerkUser.image_url || "",
  });
};

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      let user = await User.findOne({ clerkId });

      if (!user) {
        user = await createUserFromClerk(clerkId);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
