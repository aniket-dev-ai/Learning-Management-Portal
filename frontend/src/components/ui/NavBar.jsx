import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button"; // assuming you are using shadcn buttons
import { Link } from "react-router-dom";
import {  useLogoutUserMutation } from "../../feature/api/authApi";
import { toast } from "sonner";
// import profileImage from "https://i.pinimg.com/736x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg";

const NavBar = (props) => {
  const { user, setuser } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  useEffect(() => {
    if (isSuccess) {
      props.setuser(false);
      localStorage.removeItem("user");
      toast.success("Logout successful");
    }
  }, [isSuccess]);

  return (
    <header className="bg-darkBg text-darkText shadow-lg">
      <div className="container mx-auto flex items-center  justify-between p-4">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-3 ">
          <div className="flex items-center space-x-3 rounded-full hover:bg-gray-600">
            <img
              src="https://i.pinimg.com/736x/c1/42/cf/c142cffc8244e47601ccfc9e943ee42c.jpg" // apna logo path lagao
              alt="Gurukul Logo"
              className="h-12 w-12 object-cover rounded-full"
            />
            <span className="text-xl font-bold">Aniket Ka Gurukul</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Courses</Button>
          {user && <Button variant="ghost">Dashboard</Button>}
        </nav>

        {/* Profile Image + Dropdown */}
        {user ? (
          <div className="relative">
            <img
              src={
                "https://i.pinimg.com/736x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg"
              } // apna profile image path lagao
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer border border-gray-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <ul className="py-1 text-gray-700">
                  <Link to="/EditProfile">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Edit Profile
                    </li>
                  </Link>
                  <Link to="/mycourse">
                  <li className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">
                    My Learning
                  </li>
                  </Link>
                  <li onClick={handleLogout} className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer">
                    Log Out
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Dashboard
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost">Signup</Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-darkBg text-darkText border-t border-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
