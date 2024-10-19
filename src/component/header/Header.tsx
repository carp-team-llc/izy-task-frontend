import React, {useEffect, useState} from "react";
import {Bell, ChevronDown, Search,} from "lucide-react";
import {useAuth} from "../../services/authContext";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



type headerAppProps = {
  broken: boolean,
  toggled: boolean,
  setToggled: (value: boolean) => void,
}

const Header = (props: headerAppProps) => {

  const {broken, setToggled, toggled} = props;

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
      <div className=" top-0 left-0 w-full h-20 z-50 flex justify-between items-center p-4 md:p-6 bg-[#0F0F35]">
        <div>
          {broken && (
              <button className="sb-button flex items-center mr-2" onClick={() => setToggled(!toggled)}>
                <FontAwesomeIcon icon={faBars} />
              </button>
          )}
        </div>
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
            <Bell size={20}/>
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
              <ChevronDown size={16} className="text-gray-400"/>
            </button>
          </div>
        </div>
      </div>
  );
};

export default Header;
