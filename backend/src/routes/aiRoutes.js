import express from "express";
import {
  explainProblem,
  generateFullCode,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/problem/explain", explainProblem);
router.post("/problem/generate", generateFullCode);

export default router;
