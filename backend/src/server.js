import express from "express";
import { ENV } from "./lib/env.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { connectDB } from "./db/db.js";
import { inngest, functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();
const PORT = ENV.PORT || 3000;
// this add req.auth and req.session to the request object, allowing us to access the authenticated user's information in our routes and functions
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/session", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Code Vista API running");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    console.log("test")
  }
};

startServer();
