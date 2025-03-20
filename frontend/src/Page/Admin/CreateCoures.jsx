import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../feature/api/CourseApi";

const CreateCourse = () => {
  //   const [courseTitle, setcourseTitle] = useState("");
  //   const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [createCourse, { data, isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  const [formdata, setformdata] = useState({
    courseTitle: "",
    category: "",
  });
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    console.log({ formdata });
    await createCourse(formdata);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/admin/courses");
    }
    if (error) {
      toast.error(error.data.message);
    }
    
  }, [isSuccess, error]);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">Create New Course</h1>
      <form onSubmit={handleCreateCourse} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={formdata.courseTitle}
          onChange={(e) =>
            setformdata({ ...formdata, courseTitle: e.target.value })
          }
        />
        <select
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={formdata.category}
          onChange={(e) =>
            setformdata({ ...formdata, category: e.target.value })
          }
        >
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Web Development">🌐 Web Development</option>
          <option value="Data Science">📊 Data Science</option>
          <option value="Machine Learning">🤖 Machine Learning</option>
          <option value="Cyber Security">🔒 Cyber Security</option>
          <option value="Artificial Intelligence">
            🧠 Artificial Intelligence
          </option>
          <option value="Blockchain">⛓️ Blockchain</option>
          <option value="Cloud Computing">☁️ Cloud Computing</option>
          <option value="UI/UX Design">🎨 UI/UX Design</option>
          <option value="DevOps">⚙️ DevOps</option>
          <option value="Game Development">🎮 Game Development</option>
          <option value="Embedded Systems">🖥️ Embedded Systems</option>
          <option value="Big Data">📡 Big Data</option>
        </select>

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Create Course
        </Button>
      </form>
    </div>
  );
};

export default CreateCourse;
