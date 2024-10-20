import {
  Calendar,
  CheckSquare,
  X as CloseIcon,
  FolderOpen,
  LayoutDashboard,
  Menu as MenuIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menu({ className = "" }) {
  const [isOpen, setIsOpen] = useState(true); 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => setIsOpen(!isOpen); 

  const handleResize = () => {
    
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth >= 768) {
      setIsOpen(true); 
    } else {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize); 
    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full  p-4 ${className} transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
      style={{ width: isOpen ? "16rem" : "4rem" }} // Adjust width dynamically
    >
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
          {isOpen && <span className="text-xl font-bold text-white">Teamify</span>}
        </div>
        {isMobile && (
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        )}
      </div>

      {/* Menu items */}
      <div className={`${isOpen ? "block" : "hidden"} transition-opacity duration-300`}>
        {[
          { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
          { icon: <Users size={20} />, label: "Teams", path: "/teams" },
          { icon: <User size={20} />, label: "TimeLine", path: "/timeline" },
          { icon: <FolderOpen size={20} />, label: "Projects", path: "/projects" },
          { icon: <Calendar size={20} />, label: "Meetings", path: "/meetings" },
          { icon: <CheckSquare size={20} />, label: "Tasks", path: "/task" },
          { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg mb-2 transition-colors duration-300 ease-in-out ${
                isActive
                  ? "bg-purple-600 text-white"
                  : isMobile
                  ? "text-gray-400"
                  : "hover:bg-gray-700 text-gray-400"
              }`
            }
          >
            {item.icon}
            {isOpen && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
