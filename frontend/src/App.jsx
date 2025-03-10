import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import HeroSection from "./Page/Student/HeroSection";
import CoursePage from "./Page/CoursePage";
import AuthPage from "./Page/AuthPage";
import EditProfile from "./Page/EditProfile";
import MyLearningPage from "./Page/MyLearningPage";
import Sidebar from "./Page/Admin/SideBar";
import AdminDashboard from "./Page/Admin/Dashboard";
import CreateCourse from "./Page/Admin/CreateCoures";
import AdminCourses from "./Page/Admin/TeacherCourses";
import UpdateCourse from "./Page/Admin/UpdateCourse";
import { UmbrellaOff } from "lucide-react";
import CreateLecture from "./Page/Admin/Lecture/CreateLecture";
import LecturePlayer from "./Page/Admin/Lecture/LecturePlayer";
import CourseLectures from "./Page/Admin/Lecture/Courselecture";
import UpdateLecture from "./Page/Admin/Lecture/UpdateLecture";
import CourseDetail from "./Page/Admin/CourseDetails";
import Checkout from "./Page/BuyNowPage";
import RazorpayCheckout from "./Page/Gateway";

// ✅ Admin Panel Imports
// import AdminDashboard from "./Page/Admin/AdminDashboard";
// import AdminCourses from "./Page/Admin/AdminCourses";
// import CreateCourse from "./Page/Admin/CreateCourse";
// import Sidebar from "./components/admin/Sidebar";

function App() {
  return (
    <div className="flex">
      {/* ✅ Sidebar only for admin routes */}
      <Routes>
        <Route path="/admin/*" element={<Sidebar />} />
      </Routes>

      <div className="flex-1">
        <NavBar />
        <Routes>
          {/* 🌟 Public Routes */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <CoursePage />
              </>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/mycourse" element={<MyLearningPage />} />

          {/* 🔥 Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route
            path="/admin/updatecourse/:courseId"
            element={<UpdateCourse />}
          />
          <Route
            path="/admin/createlecture/:courseId"
            element={<CreateLecture />}
          />
          <Route path="/course/:id/lectures" element={<CourseLectures />} />
          <Route path="/lecture/:id" element={<LecturePlayer />} />
          <Route path="/admin/updatelecture/:lectureId" element={<UpdateLecture />} />
          <Route path="/admin/courseDetails/:courseId" element={<CourseDetail />} />
          <Route path="/admin/course/:courseId/checkout" element={<Checkout />} />
          <Route path="/RazorpayCheckout/:courseId" element={<RazorpayCheckout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
