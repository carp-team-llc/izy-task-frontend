"use client";

import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Metric from "../project/Component/Detail/Overview/Metric";
import TodayTask from "../project/Component/Detail/Overview/TodayTask";
import ProjectWorkload from "../project/Component/Detail/Overview/ProjectWorkload";
import ActivityStream from "../project/Component/Detail/Overview/ActivityStream";
import TotalTask from "../project/Component/Detail/Overview/TotalTask";

const ProjectDetail = () => {
  const { id } = useParams(); // Lấy id từ URL

  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-4">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold"> {id}</h1>
            <div className="flex gap-2">
              <button className="bg-gray-700/50 rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
              <button className="bg-gray-700/50 rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-indigo-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
              + Invite
            </button>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0a061f]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 border-b border-gray-800 pb-2">
          {["Overview", "Board", "List", "Timeline", "Member"].map((item) => (
            <button
              key={item}
              className={`text-sm ${
                item === "Overview" ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <Metric projectId = {id} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Today Task */}
          <TodayTask />

          {/* Right Column - Project Workload */}
          <ProjectWorkload />

          {/* Bottom Left - Activity Stream */}
          <ActivityStream />

          {/* Bottom Right - Total Task */}
          <TotalTask />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
