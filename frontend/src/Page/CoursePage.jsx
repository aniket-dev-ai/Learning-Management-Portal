import React from "react";

const courses = [
  {
    id: 1,
    name: "Full Stack Web Development",
    teacher: "Aniket Srivastava",
    level: "Intermediate",
    price: "₹5,999",
    img: "https://miro.medium.com/v2/resize:fit:1200/1*W-3cVs_qNNSWHI9xtqCvrA.png",
  },
  {
    id: 2,
    name: "Data Science with Python",
    teacher: "Priya Sharma",
    level: "Advanced",
    price: "₹7,499",
    img: "https://www.simplilearn.com/ice9/course_images/160x160/EC2_AIML_DS_T.png",
  },
  {
    id: 3,
    name: "UI/UX Design Masterclass",
    teacher: "Rohit Verma",
    level: "Beginner",
    price: "₹4,999",
    img: "https://www.interaction-design.org/app/uploads/2021/01/what-ux-designers-do.png",
  },
  {
    id: 4,
    name: "Cyber Security Essentials",
    teacher: "Meena Gupta",
    level: "Intermediate",
    price: "₹6,999",
    img: "https://www.eccouncil.org/cybersecurity-exchange/wp-content/uploads/sites/3/2021/07/Cybersecurity-Fundamentals-Training.jpg",
  },
];

function CosmicCoursePage() {
  return (
    <div
      className=" w-full flex flex-col items-center 
        bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] 
        py-10 px-4 sm:px-8 text-darkText"
    >
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wider text-primary glow-text">
        🚀 Explore Courses ✨
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl">
        {courses.map((course) => (
          <div
            key={course.id}
            className="relative bg-darkBg/70 backdrop-blur-lg border border-primary/50 
              shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:border-pink-500 
              transition-transform duration-300 flex flex-col"
          >
            <img
              src={course.img}
              alt={course.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-darkText">{course.name}</h3>
              <p className="text-sm text-muted-foreground">
                👩‍🏫 Instructor: <span className="font-medium">{course.teacher}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                📚 Level: <span className="font-medium">{course.level}</span>
              </p>
              <p className="text-lg font-semibold text-green-400 mt-2">
                {course.price}
              </p>

              {/* Spacer to push button to bottom */}
              <div className="flex-grow" />

              {/* Buy Now Button - Visible & Centered */}
              <button
                className="mt-4 bg-[#3c096c] text-darkText py-2 px-4 rounded-md font-medium 
                  hover:bg-[#e1e1eb] hover:text-[#3c096c] transition-colors duration-300 w-full"
              >
                🛒 Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CosmicCoursePage;
