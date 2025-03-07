import { useState } from "react";

const SignupForm = () => {
  const [role, setRole] = useState("student");

  return (
    <form className="space-y-4 text-darkText">
      <div>
        <label className="block mb-1">Email</label>
        <input type="email" className="w-full p-2 rounded bg-darkBg border border-gray-600" />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input type="password" className="w-full p-2 rounded bg-darkBg border border-gray-600" />
      </div>
      <div>
        <label className="block mb-1">Profile Image</label>
        <input type="file" className="w-full p-2 rounded bg-darkBg border border-gray-600" />
      </div>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input type="radio" name="role" value="student" checked={role === "student"} onChange={() => setRole("student")} />
          <span>Student</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="role" value="instructor" checked={role === "instructor"} onChange={() => setRole("instructor")} />
          <span>Instructor</span>
        </label>
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded">Signup</button>
    </form>
  );
};

export default SignupForm;
