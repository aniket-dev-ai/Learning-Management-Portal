import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseDetailsQuery } from "../../feature/api/CourseApi";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  console.log("Course Details: ", data);
  const course = data?.course || {};

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-darkText text-xl">
        <Loader className="animate-spin" /> Loading Course...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] py-10 px-4 sm:px-8 text-darkText">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row bg-darkBg/70 backdrop-blur-lg border border-primary/50 shadow-xl rounded-lg overflow-hidden h-full">
        
        {/* Left Section - Course Details */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-primary">{course?.courseTitle}</h1>
          <p className="text-muted-foreground text-lg mt-2">{course?.subTitle}</p>
          <p className="mt-6 text-lg">{course?.description}</p>
          
          <div className="mt-8 flex flex-wrap gap-4 text-muted-foreground text-lg">
            <p>📚 <strong>Category:</strong> {course?.category}</p>
            <p>👨‍🏫 <strong>Instructor:</strong> {course?.creator?.name || "N/A"}</p>
            <p>🎓 <strong>Level:</strong> {course?.courseLevel}</p>
            <p>📅 <strong>Created On:</strong> {new Date(course?.createdAt).toLocaleDateString()}</p>
            <p>🎥 <strong>Lectures:</strong> {course?.lectures?.length || "N/A"}</p>
          </div>
        </div>

        {/* Right Section - Course Image & Price */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-6">
          <img 
            src={course?.img || "https://via.placeholder.com/400"} 
            alt={course?.courseTitle || "Course Image"} 
            className="w-full max-w-xs sm:max-w-sm h-52 object-cover rounded-md shadow-md"
          />
          <p className="text-2xl font-semibold text-green-400 mt-4">₹{course?.coursePrice}</p>
          
          {/* Buy Now Button */}
          <Link to={`/admin/course/${courseId}/checkout`} className="w-full mt-4">
            <Button className="bg-[#3c096c] text-darkText w-full py-3 px-6 rounded-md font-medium hover:bg-[#e1e1eb] hover:text-[#3c096c] transition-colors duration-300">
              🛒 Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
