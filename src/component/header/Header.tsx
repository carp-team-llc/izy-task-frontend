import React, { useState } from 'react'
import { Bell, ChevronDown, Search, User, LogIn, LogOut,  } from 'lucide-react'
import CreateProfile from "../../page/profile/CreateProfile"

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
  }
  const handleMyProfile = () => {
    console.log("My profile")
    setIsDropdownOpen(false)
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-[17%] w-[83.8%] h-20 z-50 flex justify-between items-center p-6 bg-[#1a1f37]">
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
        <button className="text-white hover:text-black">
          <Bell size={20} />
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-8 h-8 rounded-full " />
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#13172b] ring-1 ring-black ring-opacity-5 focus:outline-none ">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleOpenModal}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left "
                  >
                    <User className="mr-3 h-5 w-5 text-white" aria-hidden="true" />
                    My Profile
                  </button>
                  {isModalOpen && <CreateProfile onClose={handleCloseModal} />}
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
                  <button
                    onClick={handleLogin}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-800 w-full text-left"
                  >
                    <LogIn className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Login
                  </button>
                  
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header