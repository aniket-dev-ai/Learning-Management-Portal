import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "Full Stack Web Development",
        category: "Web Development",
        courseLevel: "Advanced",
        price: "₹4,999",
        enrolledStudents: 150,
        img: "https://miro.medium.com/v2/resize:fit:1200/1*W-3cVs_qNNSWHI9xtqCvrA.png",
      },
      {
        id: 2,
        title: "Machine Learning with Python",
        category: "Data Science",
        courseLevel: "Intermediate",
        price: "₹5,999",
        enrolledStudents: 200,
        img: "https://www.simplilearn.com/ice9/course_images/160x160/EC2_AIML_DS_T.png",
      },
      {
        id: 3,
        title: "UI/UX Design Mastery",
        category: "Design",
        courseLevel: "Beginner",
        price: "₹2,999",
        enrolledStudents: 80,
        img: "https://www.interaction-design.org/app/uploads/2021/01/what-ux-designers-do.png",
      },
    ]);
  }, []);

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
        {courses.map((course) => (
          <div
            key={course.id}
            className="relative bg-darkBg/70 backdrop-blur-lg border border-primary/50 
            shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:border-pink-500 
            transition-transform duration-300 flex flex-col"
          >
            {/* Course Image */}
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              {/* Course Details */}
              <h3 className="text-lg font-bold text-darkText">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                📚 Category:{" "}
                <span className="font-medium">{course.category}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                🎯 Level:{" "}
                <span className="font-medium">{course.courseLevel}</span>
              </p>
              <p className="text-md font-semibold text-green-400 mt-2">
                {course.price} | 🧑‍🎓 {course.enrolledStudents} students enrolled
              </p>

              {/* Spacer to push button down */}
              <div className="flex-grow" />

              {/* Edit Course Button */}
              <Button
                variant="outline"
                className="mt-4 bg-darkBg text-darkText py-2 px-4 rounded-md font-medium 
                  hover:bg-[#e1e1eb] hover:text-[#3c096c] transition-colors duration-300 w-full"
              >
                ✏️ Edit Course
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
