import React from "react";
import {
  LayoutDashboard,
  Users,
  User,
  FolderOpen,
  Calendar,
  CheckSquare,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Menu({ className = "" }) {
  return (
    <div
      className={`w-60 h-full p-4 bg-[ #05051F]
]  ${className}`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
        <span className="text-xl font-bold text-white">Teamify</span>
      </div>

      {/* Menu items */}
      {[
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/dashboard",
        },
        { icon: <Users size={20} />, label: "Teams", path: "/teams" },
        { icon: <User size={20} />, label: "TimeLine", path: "/timeline" },
        {
          icon: <FolderOpen size={20} />,
          label: "Projects",
          path: "/projects",
        },
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
                : "hover:bg-gray-700 text-gray-400"
            }`
          }
        >
          {item.icon}
          <span className="text-sm">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
