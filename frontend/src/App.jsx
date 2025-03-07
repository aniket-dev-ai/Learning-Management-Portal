import React from "react";
import AuthPage from "./Page/AuthPage";
import NavBar from "./components/ui/NavBar";
import HeroSection from "./Page/Student/HeroSection";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./Page/CoursePage";
import EditProfile from "./Page/EditProfile";
import MyLearningPage from "./Page/MyLearningPage";

function App() {
  return (
    <div>
      <NavBar />
      {/* <HeroSection/> */}
      {/* <AuthPage/> */}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <HeroSection /> <CoursePage />
            </div>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/EditProfile" element={<EditProfile/>} />
        <Route path="/mycourse" element={<MyLearningPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
