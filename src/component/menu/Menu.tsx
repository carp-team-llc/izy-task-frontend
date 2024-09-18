import React from 'react'
import {LayoutDashboard, Users, FolderOpen, Calendar, CheckSquare, Settings } from 'lucide-react'

export default function Menu() {
  return (
    <div className="w-60 h-full p-4 bg-[#1a1f37] rounded-md">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
          <span className="text-xl font-bold">Teamify</span>
        </div>
        {[
          { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { icon: <Users size={20} />, label: 'Teams' },
          { icon: <Users size={20} />, label: 'Employees' },
          { icon: <FolderOpen size={20} />, label: 'Projects' },
          { icon: <Calendar size={20} />, label: 'Meetings' },
          { icon: <CheckSquare size={20} />, label: 'Tasks' },
          { icon: <Settings size={20} />, label: 'Settings' },
        ].map((item, index) => (
          <div key={index} className={`flex items-center space-x-2 p-2 rounded-lg mb-2 ${index === 0 ? 'bg-purple-600' : 'hover:bg-gray-700'}`}>
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
  )
}
