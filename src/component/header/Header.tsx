import React, { useEffect, useState } from "react";
import { Bell, ChevronDown, Search, User, LogIn, LogOut, } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../services/authContext";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      setIsDropdownOpen(false);
    }
  }, [token]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center p-4 md:p-6 bg-[#1a1f37]">
      {/* Logo or Title Section */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-white">Good Morning Anima</h1>
      </div>

      {/* Search and Notifications Section */}
      <div className={`flex items-center space-x-2 md:space-x-4 ${isMobileMenuOpen ? "hidden" : "flex"}`}>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#13172b] text-white rounded-full pl-10 pr-4 py-1 md:py-2 w-32 md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button className="text-white hover:text-black">
          <Bell size={20} />
        </button>

        {/* User Avatar and Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#13172b] ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
                    My Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                  >
                    <LogIn className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Login
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#1a1f37] p-4 md:hidden">
          <div className="flex flex-col">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
                  My Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
