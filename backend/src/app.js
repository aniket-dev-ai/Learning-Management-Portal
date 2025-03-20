import express from "express";
import connectDB from "./Database/dataBase.js";
import userRoutes from "./Routes/User.Route.js";
import courseRoutes from "./Routes/course.route.js";
import lectureRoutes from "./Routes/Lecture.route.js";
import airoutes from "./Routes/Ai.Route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5175", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/course/ai", airoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default app;
