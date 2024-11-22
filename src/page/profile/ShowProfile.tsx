import React from 'react'
import { Facebook, Twitter, Instagram } from 'lucide-react'

interface ProfileProps {
  name?: string
  email?: string
  bio?: string
  joinDate?: string
  gender?: string
  followers?: number
  posts?: number
  avatar?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
}

const ShowProfile: React.FC<ProfileProps> = ({
  name = "Anima",
  email = "Anima@gmail.com",
  bio = "Đây là bio của người dùng. Nó dài dài như thế này thôi nghe",
  joinDate = "20/03/2003",
  gender = "He / him",
  followers = 4,
  posts = 4,
  avatar = "https://tft.edu.vn/public/upload/2024/09/jack-meme-32.webp",
  socialLinks = {
    facebook: "#",
    twitter: "#",
    instagram: "#"
  }
}) => {
  return (
    <div className='w-full bg-[#0a061f] rounded-sm '>
    <div className="w-1/4 bg-[#0a061f] min-h-screen border-r border-gray-800 rounded-sm">
      <div className="flex flex-col items-center px-6 pt-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-white">
          <img
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            src={avatar}
          />
        </div>

        {/* Name and Email */}
        <h2 className="text-xl font-semibold text-white mb-1">{name}</h2>
        <p className="text-sm text-gray-500 mb-4">{email}</p>

        {/* Bio */}
        <div className="w-full bg-[#13113C] rounded-lg p-3 mb-4">
          <p className="text-sm text-white leading-relaxed">{bio}</p>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full bg-[#7B3AED] hover:bg-[#6D28D9] text-white rounded-md py-2 mb-6 text-sm font-medium transition-colors">
          Edit profile
        </button>

        {/* User Info */}
        <div className="w-full flex flex-col gap-3 mb-6">
        <div className='flex row '>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {joinDate}
          </div>
          <div className='mr-5 ml-5'>|</div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {gender}
          </div>
        </div>
        </div>

        {/* Stats */}
        
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {followers} Follower
          </div>
          <div className='flex ml-3'>|</div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {posts} Post
          </div>
        </div>

        {/* Social Links */}
        <div className="w-full flex flex-col gap-2">
          <a
            href={socialLinks.facebook}
            className="flex items-center gap-3 text-[#4267B2] hover:opacity-80 transition-opacity text-sm"
          >
            <Facebook className="w-4 h-4" />
            <span>Anima</span>
          </a>
          <a
            href={socialLinks.twitter}
            className="flex items-center gap-3 text-[#1DA1F2] hover:opacity-80 transition-opacity text-sm"
          >
            <Twitter className="w-4 h-4" />
            <span>Anima</span>
          </a>
          <a
            href={socialLinks.instagram}
            className="flex items-center gap-3 text-[#E4405F] hover:opacity-80 transition-opacity text-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>Anima</span>
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ShowProfile