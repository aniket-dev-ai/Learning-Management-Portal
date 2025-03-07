import React, { useState } from "react";
import { cn } from "../../lib/utils"; // ye shadcn utility hai

const AuthToggle = ({ setIsLogin }) => {
  const [mode, setMode] = useState("login");

  const handleToggle = () => {
    const newMode = mode === "login" ? "signup" : "login";
    setMode(newMode);
    setIsLogin(newMode === "login");
  };

  return (
    <div className="flex items-center justify-center space-x-4 my-6">
      <button
        className={cn("px-4 py-2 rounded", mode === "login" ? "bg-primary text-white" : "bg-gray-800 text-gray-300")}
        onClick={handleToggle}
      >
        Login
      </button>
      <button
        className={cn("px-4 py-2 rounded", mode === "signup" ? "bg-primary text-white" : "bg-gray-800 text-gray-300")}
        onClick={handleToggle}
      >
        Signup
      </button>
    </div>
  );
};

export default AuthToggle;
