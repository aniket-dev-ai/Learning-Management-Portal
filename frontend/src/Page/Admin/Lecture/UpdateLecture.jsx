import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { useGetLectureByIdQuery, useUpdateLectureMutation } from "../../../feature/api/LectureApi";

const UpdateLecture = () => {
  const { lectureId } = useParams(); // ✅ Get Lecture ID from URL
  console.log("Lecture ID: ", lectureId);
  const navigate = useNavigate();

  // 🛠️ States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");

  // ✅ Fetch Existing Lecture Data
  const { data, isLoading: isFetching } = useGetLectureByIdQuery(lectureId);
  const [updateLecture, { isLoading , refetch }] = useUpdateLectureMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.lecture.title);
      setDescription(data.lecture.description);
      setVideoUrl(data.lecture.videoUrl);
      setDuration(data.lecture.duration);
    }
  }, [data]);

  // 🛠️ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !videoUrl || !duration) {
      toast.error("Please fill all fields!");
      return;
    }

    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      toast.error("Please enter a valid duration in minutes!");
      return;
    }

    try {
      const response = await updateLecture({
        lectureId,
        title,
        description,
        videoUrl,
        duration: parsedDuration,
      }).unwrap();
      toast.success(response.message);
        refetch(); // Refetch the updated lecture data

      // 🚀 Redirect to Course Page
      navigate(`/admin/updatecourse/${data.lecture.course}`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update lecture!");
    }
  };

  if (isFetching) return <h1 className="text-white">Loading Lecture Data...</h1>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">✏️ Update Lecture</h1>

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
          type="text"
          placeholder="Video URL"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (in minutes)"
          className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? "Updating..." : "💾 Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateLecture;
