import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { useGetAllAdminCoursesQuery } from "../../feature/api/courseApi";

const AdminCourses = () => {
  const [Courses, setCourses] = useState([]);

  // ✅ Correct Destructuring
  const { data, isLoading, error } = useGetAllAdminCoursesQuery();
  // ✅ Use Effect to Update State
  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
      console.log(data.courses, "data");
    }
  }, [data]);

  // ✅ Handle Loading & Error States
  if (isLoading) return <h1 className="text-white text-center">Loading Courses...</h1>;
  if (error) return <h1 className="text-red-500 text-center">Error loading Courses</h1>;

  return (
    <div
      className="w-full flex flex-col items-center 
      bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] 
      py-10 px-4 sm:px-8 text-darkText min-h-screen"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between w-full max-w-7xl mb-8">
        <h1 className="text-4xl font-bold tracking-wider text-primary glow-text">
          🎓 Manage Courses
        </h1>
        <Link to="/admin/create-course">
          <Button className="bg-primary hover:bg-purple-700 transition duration-300 shadow-lg">
            + Create New Course
          </Button>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
        {Courses.length > 0 ? (
          Courses.map((course) => (
            <div
              key={course.id}
              className="relative bg-darkBg/70 backdrop-blur-lg border border-primary/50 
              shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:border-pink-500 
              transition-transform duration-300 flex flex-col"
            >
              {/* Course Image */}
              <Link to={`/course/${course._id}/lectures`}>
              <img
                src={course.img}
                alt={course.courseTitle}
                className="w-full h-40 object-cover"
              />
              </Link>
              <div className="p-4 flex flex-col flex-grow">
                {/* Course Details */}
                <h3 className="text-lg font-bold text-darkText">
                  {course.courseTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  📚 Category: <span className="font-medium">{course.category}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  🎯 Level: <span className="font-medium">{course.courseLevel}</span>
                </p>
                <p className="text-md font-semibold text-green-400 mt-2">
                  {course.price} | 🧑‍🎓 {course.enrolledStudents} students enrolled
                </p>

                {/* Spacer to push button down */}
                <div className="flex-grow" />

                {/* Edit Course Button */}
                <Link to={`/admin/updatecourse/${course._id}`}>
                  <Button
                    variant="outline"
                    className="mt-4 bg-darkBg text-darkText py-2 px-4 rounded-md font-medium 
                      hover:bg-[#e1e1eb] hover:text-[#3c096c] transition-colors duration-300 w-full"
                  >
                    ✏️ Edit Course
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-white text-center">No Courses Available</h1>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
