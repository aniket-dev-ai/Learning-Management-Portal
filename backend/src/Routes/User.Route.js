import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  editProfile,
  showProfile,
} from "../controller/user.controller.js";
import { verifyToken } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.post("/logout", logout);
router.put("/edit", verifyToken, editProfile);
router.get("/profile", verifyToken, showProfile);

export default router;
