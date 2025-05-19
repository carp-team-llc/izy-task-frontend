import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Helper from "../../constant/Helper";

interface ProfileProps {
  id: string;
  fullName: string;
  bio: string;
  dateOfBirth: string;
  avatar: string;
  userId: string;
  gender: string;
  socials: [];
  user: {
    email: string;
  };
}

const ShowProfile: React.FC<ProfileProps> = ({
  fullName,
  bio,
  dateOfBirth,
  avatar,
  gender,
  socials,
  user,
}) => {
  return (
    <div className="w-full bg-[#0a061f] rounded-sm ">
      <div className="w-1/4 bg-[#0a061f] min-h-screen border-r border-gray-800 rounded-sm">
        <div className="flex flex-col items-center px-6 pt-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-white">
            <img
              alt={`${fullName}'s avatar`}
              className="w-full h-full object-cover"
              src={
                avatar ||
                "https://i0.wp.com/catcaresolutions.com/wp-content/uploads/2020/12/cute-cat-with-yellow-headband-on.png?fit=1000%2C1500&ssl=1"
              }
            />
          </div>

          {/* Name and Email */}
          <h2 className="text-xl font-semibold text-white mb-1">{fullName}</h2>
          <p className="text-sm text-gray-500 mb-4">{user?.email}</p>

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
            <div className="flex row ">
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
                {Helper.formatDate(dateOfBirth)}
              </div>
              <div className="mr-5 ml-5">|</div>
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
              {/* {followers} Follower */}
            </div>
            <div className="flex ml-3">|</div>
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
              {/* {posts} Post */}
            </div>
          </div>

          {/* Social Links */}
          <div className="w-full flex flex-col gap-2">
            <a
              href={""}
              className="flex items-center gap-3 text-[#4267B2] hover:opacity-80 transition-opacity text-sm"
            >
              <Facebook className="w-4 h-4" />
              <span>{fullName}</span>
            </a>
            <a
              href={""}
              className="flex items-center gap-3 text-[#1DA1F2] hover:opacity-80 transition-opacity text-sm"
            >
              <Twitter className="w-4 h-4" />
              <span>{fullName}</span>
            </a>
            <a
              href={""}
              className="flex items-center gap-3 text-[#E4405F] hover:opacity-80 transition-opacity text-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>{fullName}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
