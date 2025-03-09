import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from "../../feature/api/courseApi";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // States for course fields
  const [courseTitle, setCourseTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // API Hooks
  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();
  const { data: courseData, isLoading: courseLoading } =
    useGetCourseDetailsQuery(courseId);

  // Load existing course data
  useEffect(() => {
    if (courseData?.course) {
      setCourseTitle(courseData.course.courseTitle);
      setSubTitle(courseData.course.subTitle);
      setDescription(courseData.course.description);
      setCategory(courseData.course.category);
      setCourseLevel(courseData.course.courseLevel);
      setCoursePrice(courseData.course.coursePrice);
      setIsPublished(courseData.course.isPublished);
    }
  }, [courseData]);

  // Handle Course Update
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
      });
    } catch (err) {
      toast.error(err?.data?.message || "Update failed!");
    }
  };

  // Toast Notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully!");
      navigate("/admin/courses");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
    if (isLoading) {
      toast.loading("Updating course...");
    }
  }, [isSuccess, error, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">Update Course</h1>
      <form onSubmit={handleUpdateCourse} className="mt-4 space-y-4">
        <Link to={`/admin/createlecture/${courseData?.course?._id}`}>
          <Button className="mt-2 bg-green-500 hover:bg-green-600">
            🎥 Add Lecture
          </Button>
        </Link>

        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subtitle"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Web Development">🌐 Web Development</option>
          <option value="Data Science">📊 Data Science</option>
        </select>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Update Course
        </Button>
      </form>
    </div>
  );
};

export default UpdateCourse;
