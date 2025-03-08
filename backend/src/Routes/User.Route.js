import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  editProfile,
  showProfile,
} from "../controller/user.controller.js";
import { verifyToken } from "../Middleware/Auth.js";
import upload from "../Middleware/Multer.js";



const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.post("/logout", logout);
router.get("/profile", verifyToken, showProfile);
router.put("/profile/update", verifyToken, upload.single("file"), editProfile);


export default router;
