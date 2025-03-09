import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [100, "Course title cannot exceed 100 characters"],
    },
    subTitle: {
      type: String,
      //   required: [true, "Subtitle is required"],
      trim: true,
      maxlength: [150, "Subtitle cannot exceed 150 characters"],
    },
    description: {
      type: String,
      //   required: [true, "Course description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      //   required: [true, "Course level is required"],
    },
    coursePrice: {
      type: Number,
      //   required: [true, "Course price is required"],
      min: [0, "Course price must be a positive number"],
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture", // Reference to Lecture model
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Instructor who created the course
      //   required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
