import express from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controller/user.controller.js";

const router = express.Router();

// Route for user signup
router.post("/signup", registerUser);
router.post("/login", loginUser);

router.post("/logout", logout);

export default router;
