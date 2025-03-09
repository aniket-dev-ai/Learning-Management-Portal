import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChalkboardTeacher, FaBook, FaArrowLeft } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-5 left-5 text-white z-50 p-2 bg-darkCard rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed h-screen w-60 bg-darkCard text-white p-6 transition-all z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary">
              <FaChalkboardTeacher />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/courses" className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary">
              <FaBook />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center space-x-3 p-2 rounded-md hover:bg-primary">
              <FaArrowLeft />
              <span>Go Back</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
