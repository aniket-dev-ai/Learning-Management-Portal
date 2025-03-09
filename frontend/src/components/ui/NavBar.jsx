import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../../feature/authSlice";
import { Button } from "./button";
import { Link } from "react-router-dom";
import {
  useLogoutUserMutation,
  useShowProfileQuery,
} from "../../feature/api/authApi";
import { toast } from "sonner";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Fetch user profile only if authenticated
  const {
    data: userData,
    error,
    isLoading,
  } = useShowProfileQuery(undefined, { skip: !isAuthenticated });
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedOut());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logout successful");
    }
  }, [isSuccess, dispatch]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <header className="bg-darkBg text-darkText shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://i.pinimg.com/736x/c1/42/cf/c142cffc8244e47601ccfc9e943ee42c.jpg"
            alt="Gurukul Logo"
            className="h-12 w-12 object-cover rounded-full"
          />
          <span className="text-xl font-bold">Aniket Ka Gurukul</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Courses</Button>
          {userData?.user?.role === "instructor" && (
            <Link to="/admin/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          )}
        </nav>

        {/* Profile Section */}
        {isAuthenticated ? (
          <div className="relative">
            <img
              src={userData?.user?.imageUrl || "https://via.placeholder.com/50"}
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
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-400 hover:bg-gray-100 cursor-pointer"
                  >
                    Log Out
                  </li>
                  {userData?.user?.role === "instructor" && (
                    <Link to="/admin/dashboard">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Dashboard
                      </li>
                    </Link>
                  )}
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
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-darkBg text-darkText border-t border-gray-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left"
                onClick={() => setMenuOpen(false)}
              >
                Courses
              </Button>
            </li>
            {userData?.user?.role === "instructor" && (
              <Link to="/admin/dashboard">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full text-left"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Button>
                </li>
              </Link>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
