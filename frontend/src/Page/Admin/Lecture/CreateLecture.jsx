import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { useCreateLectureMutation } from "../../../feature/api/LectureApi";

const CreateLecture = () => {
  const { courseId } = useParams(); // ✅ Course ID from URL
  const navigate = useNavigate();

  // 🛠️ States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(""); // ✅ New duration state

  // API Hook
  const [createLecture, { isLoading }] = useCreateLectureMutation();

  // 🛠️ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !video || !duration) {
      toast.error("Please fill all fields and upload a video!");
      return;
    }

    // ✅ Validate duration before sending
    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      toast.error("Please enter a valid duration in seconds!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("courseId", courseId);
    formData.append("duration", parsedDuration); // ✅ Ensuring duration is a number
    formData.append("file", video);

    try {
      const response = await createLecture(formData).unwrap();
      toast.success(response.message);

      // 🚀 Redirect to Update Course Page
      navigate(`/admin/updatecourse/${courseId}`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to create lecture!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">📚 Add New Lecture</h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Lecture Title"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Lecture Description"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (in seconds)"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="file"
          accept="video/*"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? "Uploading..." : "🚀 Upload Lecture"}
        </Button>
      </form>
    </div>
  );
};

export default CreateLecture;
