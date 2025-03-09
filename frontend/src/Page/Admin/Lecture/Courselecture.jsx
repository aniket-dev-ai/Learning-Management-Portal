import { useParams, Link } from "react-router-dom";
import {
  useDeleteLectureMutation,
  useGetLecturesByCourseIdQuery,
} from "../../../feature/api/lectureApi";
import { Card, CardContent, CardTitle, CardDescription } from "../../../components/ui/card.jsx";

const CourseLectures = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetLecturesByCourseIdQuery(id);
  const [deleteLecture, { isLoading: deleteLoading }] = useDeleteLectureMutation();

  const lectures = data?.lectures || [];

  if (isLoading) return <h2 className="text-center text-primary">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500">Error loading lectures!</h2>;
  if (!lectures.length) return <h2 className="text-center text-gray-400">No lectures available.</h2>;

  // ✅ Handle Delete
  const handleDelete = async (lectureId) => {
    if (!window.confirm("Are you sure you want to delete this lecture?")) return;

    try {
      await deleteLecture(lectureId);
      refetch(); // Refresh lectures after deletion
    } catch (err) {
      console.error("Error deleting lecture:", err);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center 
      bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] 
      py-10 px-4 sm:px-8 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wider text-primary glow-text">
        📚 Course Lectures
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {lectures.map((lecture) => (
          <Card
            key={lecture._id} // ✅ Fixed Missing Key Issue
            className="relative bg-white/10 backdrop-blur-lg border border-primary/50 
              shadow-lg rounded-xl overflow-hidden hover:scale-105 hover:border-pink-500 
              transition-transform duration-300 flex flex-col p-4"
          >
            <CardContent className="flex flex-col">
              <CardTitle className="text-lg font-bold text-primary">{lecture.title}</CardTitle>
              <CardDescription className="text-gray-400">{lecture.description}</CardDescription>
              <p className="text-sm text-gray-500 mt-2">⏳ Duration: {lecture.duration} mins</p>

              <div className="flex-grow"></div>

              <div className="flex justify-between items-center mt-4">
                {/* 🎥 Watch Button */}
                <Link
                  to={`/lecture/${lecture._id}`}
                  className="text-pink-400 hover:text-pink-300 transition 
                    text-center bg-[#3c096c] px-4 py-2 rounded-md font-medium hover:bg-[#e1e1eb] 
                    hover:text-[#3c096c] transition-colors duration-300"
                >
                  🎥 Watch
                </Link>

                {/* 🗑️ Delete Button */}
                <button
                  onClick={() => handleDelete(lecture._id)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition 
                    disabled:bg-gray-500"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "🗑️ Delete"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseLectures;
