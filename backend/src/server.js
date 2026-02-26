import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";
import { connectDB } from "./db/db.js";

const app = express();
const PORT = ENV.PORT || 3000;

app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
