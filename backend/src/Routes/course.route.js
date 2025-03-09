import express from "express";
import {createcourse} from "../controller/course.controller.js";
import { verifyToken } from "../Middleware/Auth.js";
import upload from "../Middleware/Multer.js";

const router = express.Router();

router.post("/createcourse", verifyToken, createcourse);

export default router;