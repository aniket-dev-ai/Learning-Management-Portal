import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createLecture,
  getLecturesByCourseId,
  getLectureById,
  deleteLecture,
  editLectureById,
} from "../controller/Lecture.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/createLecture",
  verifyToken,
  upload.single("file"),
  createLecture
);
router.get("/:courseId", verifyToken, getLecturesByCourseId);
router.get("/single/:lectureId", verifyToken, getLectureById);
router.delete("/delete/:lectureId", verifyToken, deleteLecture);
router.put("/lecture/:lectureId", verifyToken, editLectureById);

export default router;
