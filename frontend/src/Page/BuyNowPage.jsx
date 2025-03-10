import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailsQuery, useGenerateCourseBuyReasonWithAiQuery } from "../feature/api/CourseApi";
import { Button } from "../components/ui/button";
import { Loader } from "lucide-react";
import { useShowProfileQuery } from "../feature/api/authApi";

const Checkout = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  const { data: profileData, isLoading: profileIsFetching } = useShowProfileQuery();
  const Navigate = useNavigate();

  const course = data?.course || {};
  const user = profileData || {}; // User's profile details

  // ✅ Fetch AI-generated reason
  const { data: aiReasonData, isFetching: aiLoading } = useGenerateCourseBuyReasonWithAiQuery(course.courseTitle);
  console.log("AI Reason Data: ", aiReasonData);

  if (isLoading || profileIsFetching || aiLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-darkText text-xl">
        <Loader className="animate-spin" /> Loading Checkout Details...
      </div>
    );
  }


  const handlePayment = () => {
    Navigate(`/RazorpayCheckout/${courseId}`)
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] py-10 px-4 sm:px-8 text-darkText">
      <div className="max-w-4xl w-full bg-darkBg/70 backdrop-blur-lg border border-primary/50 shadow-xl rounded-lg p-6">
        
        {/* Checkout Header */}
        <h1 className="text-3xl font-bold text-primary text-center">🛒 Checkout</h1>
        
        {/* Course Details */}
        <div className="mt-6 flex flex-col lg:flex-row items-center gap-6">
          <img 
            src={course?.img || "https://via.placeholder.com/400"} 
            alt={course?.courseTitle || "Course Image"} 
            className="w-72 h-40 object-cover rounded-md shadow-md"
          />

          <div className="text-left w-full">
            <h2 className="text-2xl font-semibold">{course.courseTitle}</h2>
            <p className="text-muted-foreground">{course.subTitle}</p>
            <p className="text-green-400 text-xl font-bold mt-2">₹{course.coursePrice}</p>
          </div>
        </div>

        {/* AI Reason to Buy */}
        {aiReasonData && (
          <div className="mt-6 p-4 bg-[#3c096c]/50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-300">✨ Why Buy This Course?</h3>
            <p className="text-sm text-gray-200 mt-2">{aiReasonData.reason}</p>
          </div>
        )}

        {/* Instructor Details */}
        <div className="mt-6 p-4 bg-darkBg/80 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">👨‍🏫 Instructor Details</h3>
          <p><strong>Name:</strong> {course?.creator?.name || "Unknown"}</p>
          <p><strong>Email:</strong> {course?.creator?.email || "N/A"}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 p-4 bg-darkBg/80 rounded-lg shadow-md flex items-center gap-4">
          <img 
            src={user.imageUrl || "https://via.placeholder.com/100"} 
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border border-primary"
          />
          <div>
            <h3 className="text-xl font-semibold">👤 Your Details</h3>
            <p><strong>Name:</strong> {user.name || "User"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-500 text-darkText py-3 px-6 rounded-md font-medium hover:bg-green-600 transition-colors duration-300"
        >
          💳 Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
