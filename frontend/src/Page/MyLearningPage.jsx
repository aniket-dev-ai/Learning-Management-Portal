import { useShowProfileQuery } from "../feature/api/authApi";
import React, { useEffect, useState } from "react";

function MyLearningPage() {
  const { data, error, isLoading } = useShowProfileQuery();
  const [myCourses, setMyCourses] = useState([]);

  // ✅ Correct way to update state when data changes
  useEffect(() => {
    if (data?.user?.enrolledCourses) {
      setMyCourses(data.user.enrolledCourses);
    }
  }, [data]);

  // ✅ Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-white">
        <p className="text-xl font-semibold animate-pulse">
          ⏳ Loading profile...
        </p>
      </div>
    );
  }

  // ✅ Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-red-400">
        <p className="text-xl font-semibold">
          ❌ Error fetching courses: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-white py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center mb-8 glow-text">
        📚 My Learning Dashboard 🚀
      </h1>

      {myCourses.length === 0 ? (
        <p className="text-center text-lg text-gray-300">
          😕 You haven't enrolled in any courses yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {myCourses.map((course) => (
            <div
              key={course._id} // ✅ _id MongoDB ke liye correct hai
              className="relative bg-white/10 backdrop-blur-lg border border-purple-500 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={course.img || "https://via.placeholder.com/300"} // ✅ Default image if missing
                alt={course.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-white">{course.name}</h3>
                <p className="text-sm text-purple-300">
                  👩‍🏫 Instructor:{" "}
                  <span className="font-medium">{course.teacher}</span>
                </p>
                <p className="text-sm text-purple-300">
                  📚 Level: <span className="font-medium">{course.level}</span>
                </p>
                <p className="text-lg font-semibold text-green-400">
                  💸 {course.price}
                </p>
                <button className="mt-3 w-full py-2 bg-purple-500 text-white rounded-md hover:bg-pink-500 transition-all duration-300">
                  🚀 Start Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearningPage;
