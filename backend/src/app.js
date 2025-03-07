import express from "express";
import connectDB from "./Database/dataBase.js";
import userRoutes from "./Routes/User.Route.js";
import cookieParser from "cookie-parser";

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

// Routes
app.use("/api/user", userRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default app;
