import Course from "../Models/Course.model.js"; // Ensure correct import

export const createcourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    console.log("Request Body:", req.body);
    console.log("Course Title:", courseTitle);
    console.log("Category:", category);
    console.log("Creator ID:", req.userId);
    // Validate input fields
    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    console.log("User ID:", req.userId);
    // Check if user exists (to prevent errors)
    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Create new course
    const course = new Course({
      courseTitle,
      category,
      creator: req.userId,
    });

    // Save to DB
    await course.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getalladminCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.userId });
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      isPublished,
    } = req.body;

    // Validate input fields
    if (!courseTitle || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Course Title, Description, and Category are required",
      });
    }

    // Update course
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        isPublished,
      },
      { new: true, runValidators: true } // ✅ Fix: Ensure validation runs
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getcoursedetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Fetch course details
    const course = await Course.findById(courseId).populate(
      "creator",
      "name email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      course,
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
