import { useParams } from "react-router-dom";
import { useGetLectureByIdQuery } from "../../../feature/api/LectureApi";
import { Card, CardContent, CardTitle } from "../../../components/ui/card.jsx";

const LecturePlayer = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetLectureByIdQuery(id);

  if (isLoading) return <h2 className="text-center text-primary">Loading...</h2>;
  if (error || !data?.lecture) return <h2 className="text-center text-red-500">Lecture not found!</h2>;

  const { title, description, videoUrl, duration } = data.lecture;

  return (
    <div className="w-full flex justify-center items-center min-h-screen 
      bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] py-10 px-4 sm:px-6">
      <Card className="bg-white/10 border border-primary/60 shadow-xl backdrop-blur-lg 
          p-4 sm:p-6 rounded-2xl w-full max-w-5xl text-white">
        <CardContent className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-4">
            {title}
          </CardTitle>
          <p className="text-gray-300 text-sm sm:text-base mb-4">{description}</p>

          <div className="relative overflow-hidden rounded-xl border border-gray-600 shadow-lg">
            <video controls className="w-full h-[200px] sm:h-[300px] md:h-[400px] bg-black rounded-lg 
                hover:scale-105 transition duration-300">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-400">⏳ Duration: {duration} mins</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturePlayer;
