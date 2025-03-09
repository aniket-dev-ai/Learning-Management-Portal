import express from "express";
import {
  createcourse,
  getalladminCourses,
  getallcourses,
  getcoursedetails,
  updateCourse,
} from "../controller/course.controller.js";
import { verifyToken } from "../Middleware/Auth.js";
import upload from "../Middleware/Multer.js";

const router = express.Router();

router.post("/createcourse", verifyToken, createcourse);
router.get("/getalladminCourses", verifyToken, getalladminCourses);
router.get("/getcoursedetails/:courseId", verifyToken, getcoursedetails);
router.get("/getallCourses", getallcourses);
router.put("/updatecourse/:courseId", verifyToken, updateCourse);

export default router;
