import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createLecture, getLecturesByCourseId, getLectureById, deleteLecture } from "../controller/Lecture.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/createLecture", upload.single("file"), createLecture);
router.get("/:courseId", verifyToken, getLecturesByCourseId);
router.get("/single/:lectureId", verifyToken, getLectureById); // ✅ Single Lecture Route
router.delete("/delete/:lectureId", verifyToken, deleteLecture); // ✅ Delete Lecture Route

export default router;
