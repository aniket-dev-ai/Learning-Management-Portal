import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required"],
      trim: true,
      maxlength: [150, "Lecture title cannot exceed 150 characters"],
    },
    description: {
      type: String,
      required: [true, "Lecture description is required"],
      trim: true,
      minlength: [
        10,
        "Lecture description must be at least 10 characters long",
      ],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: [true, "Lecture duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to Course model
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Instructor who created the lecture
      // required: true,
    },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
