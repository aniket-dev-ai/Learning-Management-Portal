import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
  useGenerateCourseWithAIMutation,
} from "../../feature/api/courseApi";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // 🏷️ States for all course fields
  const [courseTitle, setCourseTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [img, setImg] = useState("");
  const [topic, setTopic] = useState(""); // AI topic state

  // 🔄 API Hooks
  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();
  const { data: courseData, isLoading: courseLoading } =
    useGetCourseDetailsQuery(courseId);
  const [generateCourseWithAI, { isLoading: aiLoading }] =
    useGenerateCourseWithAIMutation();

  // 🔄 Load existing course data when component mounts
  useEffect(() => {
    if (courseData?.course) {
      setCourseTitle(courseData.course.courseTitle);
      setSubTitle(courseData.course.subTitle);
      setDescription(courseData.course.description);
      setCategory(courseData.course.category);
      setCourseLevel(courseData.course.courseLevel);
      setCoursePrice(courseData.course.coursePrice);
      setIsPublished(courseData.course.isPublished);
      setImg(courseData.course.img);
    }
  }, [courseData]);

  // 🧠 AI Auto-Fill Function
  const handleGenerateAI = async () => {
    if (!topic) {
      toast.error("Please enter a topic for AI generation!");
      return;
    }
    try {
      const { data } = await generateCourseWithAI(topic);
      if (data?.courseDetails) {
        setCourseTitle(data.courseDetails.courseTitle);
        setSubTitle(data.courseDetails.subTitle);
        setDescription(data.courseDetails.description);
        setCategory(data.courseDetails.category);
        setCourseLevel(data.courseDetails.courseLevel);
        setCoursePrice(data.courseDetails.coursePrice);
        setImg(data.courseDetails.img);
        toast.success("✨ AI-generated course details filled!");
      }
    } catch (err) {
      toast.error("AI generation failed!");
    }
  };

  // 🎯 Handle Course Update
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!courseTitle || !category || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await updateCourse({
        courseId,
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        isPublished,
        img,
      });
      toast.success("✅ Course Updated Successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Update Course</h1>

      <form onSubmit={handleUpdateCourse} className="space-y-4">
        {/* 🔹 AI Input Field */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter topic for AI"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleGenerateAI}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={aiLoading}
          >
            {aiLoading ? "Generating..." : "✨ AI Generate"}
          </Button>
        </div>

        {/* 🔹 Course Title */}
        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />

        {/* 🔹 Subtitle */}
        <input
          type="text"
          placeholder="Subtitle"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        {/* 🔹 Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 🔹 Category */}
        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* 🔹 Course Level (Dropdown) */}
        <select
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={courseLevel}
          onChange={(e) => setCourseLevel(e.target.value)}
        >
          <option value="">Select Course Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* 🔹 Course Price */}
        <input
          type="number"
          placeholder="Course Price (₹)"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={coursePrice}
          onChange={(e) => setCoursePrice(e.target.value)}
        />

        {/* 🔹 Course Image */}
        <input
          type="text"
          placeholder="Course Image URL"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        {/* 🔹 Publish Status (Toggle) */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Publish Course?</label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
            className="h-5 w-5"
          />
        </div>

        {/* 🔹 Submit Button */}
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Course"}
        </Button>
      </form>

      {/* 🔹 Add Lecture Button */}
      <div className="mt-6">
        <Button
          onClick={() => navigate(`/admin/createlecture/${courseId}`)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          ➕ Add Lecture
        </Button>
      </div>
    </div>
  );
};

export default UpdateCourse;
