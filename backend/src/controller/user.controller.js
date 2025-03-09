import bcrypt from "bcrypt";
import User from "../Models/User.Model.js"; // Ye tumhara User Model hai (Mongoose)

// 🛠️ Register Controller
export const registerUser = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    // Basic Manual Validations
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, role and password are required.",
      });
    }

    // Email format check (basic regex) - industry mein regex libraries bhi use hoti hain, par yeh kaam chalau hai
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Existing User Check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Success Response
    res.status(201).json({
      success: true,
      message: "Registration successful. Welcome aboard! 🚀",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("💥 Error in registerUser:", error);

    // Mongoose Validation Error Handling
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Data validation failed.",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Duplicate Key Error (MongoDB)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Generic Server Error
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email aur password dono required hain! 💌",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Pehle register kar lo na! 😢",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Galat password! 🤦‍♀️ Please check and try again.",
      });
    }

    // JWT Generation (Token with expiry 1 day)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set Cookie with token (httpOnly for better security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // In dev, it'll work without https
      sameSite: "strict", // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful! 🥳" + `Welcome back ${user.name} `,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error 😵",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout successful! Bye Bye 👋",
  });
};
import { uploadmedia, deleteMedia } from "../Middleware/Cloudinary.js";

export const editProfile = async (req, res) => {
  try {
    const userId = req.userId; // 🛠️ Extracted from JWT middleware
    const { name } = req.body;
    const profileImage = req.file; // 🛠️ Multer ka file

    // ✅ Fetch user
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    if (name) user.name = name;

    let cloudinaryResponse = null;

    if (profileImage) {
      if (user.imageUrl) {
        const publicId = user.imageUrl.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
    }
    console.log(cloudinaryResponse);
    cloudinaryResponse = await uploadmedia(profileImage.path);
    user.imageUrl = cloudinaryResponse.secure_url;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully! ✨",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
      },
      cloudinaryResponse,
    });
  } catch (error) {
    console.error("Profile Update Error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update profile 😔",
        error: error.message,
      });
  }
};

export const showProfile = async (req, res) => {
  try {
    const userId = req.userId; // Again, ideally from auth middleware (JWT decode se)

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found! 😥",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully! 😎",
      user,
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile 😵‍💫",
      error: error.message,
    });
  }
};
