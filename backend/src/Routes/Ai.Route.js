import express from "express";
import { courseAi, courseReasonAi } from "../controller/Ai.controller.js"; // ✅ Ensure .js extension in ES module

const router = express.Router();

// ✅ Route to Generate AI Course
router.post("/generate-course", courseAi);
// ✅ Route to Generate Course Reason
router.post("/generate-courseReasontoBuy",courseReasonAi)

export default router;
