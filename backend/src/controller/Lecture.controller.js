import { uploadmedia } from "../Middleware/Cloudinary.js";
import Course from "../Models/Course.model.js";
import Lecture from "../Models/Lecture.model.js";
import fs from "fs"; // To delete the uploaded file after Cloudinary upload

export const createLecture = async (req, res) => {
  try {
    const { title, description, courseId, duration } = req.body;

    // ✅ Validation check
    if (!title || !description || !courseId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // ✅ Check if video file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Video file is required" });
    }

    // ✅ Validate duration (Ensure it's a number)
    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Valid duration is required" });
    }

    // ✅ Upload video to Cloudinary
    const isVideo = req.file.mimetype.startsWith("video/");
    const videoUpload = await uploadmedia(
      req.file.path,
      isVideo ? "video" : "image"
    );

    if (!videoUpload.secure_url) {
      return res
        .status(500)
        .json({ success: false, message: "Video upload failed" });
    }

    // ✅ Delete local file after Cloudinary upload
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error("Error deleting local file:", err);
    }

    console.log(req.userId + " " );
    // ✅ Create new lecture
    const lecture = new Lecture({
      title,
      description,
      videoUrl: videoUpload.secure_url,
      duration: Math.floor(parsedDuration),
      course: courseId,
      creator: req.userId, // Authenticated user
    });

    // ✅ Save lecture
    await lecture.save();

    // ✅ Add lecture to course
    course.lectures.push(lecture._id);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lecture,
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getLecturesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lectures = await Lecture.find({ course: courseId }).sort({
      createdAt: -1,
    });

    if (!lectures.length) {
      return res
        .status(404)
        .json({ success: false, message: "No lectures found!" });
    }

    res.status(200).json({ success: true, lectures });
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    // ✅ Check if lecture exists
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res
        .status(404)
        .json({ success: false, message: "Lecture not found!" });
    }

    res.status(200).json({ success: true, lecture });
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized! No user ID found." });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ success: false, message: "Lecture not found!" });
    }
    // console.log("Lecture Creator ID:", lecture.creator);
    // console.log("Request User ID:", req.userId);
    // console.log("Lecture Creator ID:", lecture.creator.toString());
    // if (lecture.creator.toString() !== req.userId) {
    //   return res.status(403).json({ success: false, message: "You are not authorized!" });
    // }

    const course = await Course.findById(lecture.course);
    if (course) {
      course.lectures = course.lectures.filter(id => id.toString() !== lectureId);
      await course.save();
    }

    await Lecture.findByIdAndDelete(lectureId);
    res.status(200).json({ success: true, message: "Lecture deleted successfully" });

  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
