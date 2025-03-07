import React from "react";

const myCourses = [
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
    img: "https://upload.wikimedia.org/wikipedia/commons/5/58/Datacience.png",
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
  {
    id: 5,
    name: "Artificial Intelligence Basics",
    teacher: "Dr. Neha Kapoor",
    level: "Beginner",
    price: "₹5,499",
    img: "https://i.imgur.com/oPjl7H4.png",
  },
];

function MyLearningPage() {
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-darkText py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center mb-8 glow-text">📚 My Learning Dashboard 🚀</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {myCourses.map((course) => (
          <div
            key={course.id}
            className="relative bg-white/10 backdrop-blur-lg border border-purple-500 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={course.img}
              alt={course.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold text-white">{course.name}</h3>
              <p className="text-sm text-purple-300">
                👩‍🏫 Instructor: <span className="font-medium">{course.teacher}</span>
              </p>
              <p className="text-sm text-purple-300">
                📚 Level: <span className="font-medium">{course.level}</span>
              </p>
              <p className="text-lg font-semibold text-green-400">
                💸 {course.price}
              </p>
              <button className="mt-3 w-full py-2 bg-primary text-darkText rounded-md hover:bg-secondary transition-all duration-300">
                🚀 Start Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearningPage;
