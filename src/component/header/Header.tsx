import React from 'react'
import { Bell, ChevronDown, Search } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-[272px] w-[83%]  h-20 z-50 flex justify-between items-center p-6 bg-[#1a1f37]">
      <div>
        <h1 className="text-2xl font-bold text-white">Good Morning Anima</h1>
        <p className="text-sm text-gray-400">Hope you have a good day</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#13172b] text-white rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full" />
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default Header
