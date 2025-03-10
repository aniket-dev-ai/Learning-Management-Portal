import { Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "../feature/api/CourseApi";
import React from "react";

function CosmicCoursePage() {
  const { data, isLoading } = useGetAllCoursesQuery();
  const courses = data?.courses || [];
  console.log("Courses: ", courses);
  console.log(courses?._id)

  if (isLoading)
    return (
      <h1 className="text-white text-center text-2xl py-10">
        Loading Courses...
      </h1>
    );

  return (
    <div
      className="w-full flex flex-col items-center 
        bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] 
        py-10 px-4 sm:px-8 text-darkText"
    >
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wider text-primary glow-text">
        🚀 Explore Courses ✨
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
        {courses.map((course) => (
          <Link
            to={`/admin/courseDetails/${course?._id}`}
            key={course?._id || Math.random()}
          >
            <div
              className="relative bg-darkBg/70 backdrop-blur-lg border border-primary/50 
              shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:border-pink-500 
              transition-transform duration-300 flex flex-col"
            >
              {/* Placeholder Image */}
              <img
                src={course?.img || "https://via.placeholder.com/400"}
                alt={course?.courseTitle || "N/A"}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-darkText">
                  {course?.courseTitle || "N/A"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  🎓 Category:{" "}
                  <span className="font-medium">
                    {course?.category || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  👨‍🏫 Instructor:{" "}
                  <span className="font-medium">
                    {course?.creator?.name || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  📚 Level:{" "}
                  <span className="font-medium">
                    {course?.courseLevel || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  📅 Created On:{" "}
                  <span className="font-medium">
                    {course?.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  🔄 Last Updated:{" "}
                  <span className="font-medium">
                    {course?.updatedAt
                      ? new Date(course.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  🎥 Lectures:{" "}
                  <span className="font-medium">
                    {course?.lectures?.length ?? "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  📝 Subtitle:{" "}
                  <span className="font-medium">
                    {course?.subTitle || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  📝 Description:{" "}
                  <span className="font-medium">
                    {course?.description
                      ? course.description.slice(0, 50) + "..."
                      : "N/A"}
                  </span>
                </p>
                <p className="text-lg font-semibold text-green-400 mt-2">
                  ₹{course?.coursePrice ?? "N/A"}
                </p>

                <div className="flex-grow" />

                {/* Buy Now Button */}
                <button
                  className="mt-4 bg-[#3c096c] text-darkText py-2 px-4 rounded-md font-medium 
                  hover:bg-[#e1e1eb] hover:text-[#3c096c] transition-colors duration-300 w-full"
                >
                  🛒 Buy Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CosmicCoursePage;
