"use client";

import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import OverviewTab from "./Component/Detail/Overview";
import ProjectTaskList from "./Component/Detail/ProjectTask/ProjectTaskList";

const Tabs = {
  Overview: OverviewTab,
  List: ProjectTaskList,
};

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleTabChange = (newTab: string) => {
    const currentIndex = Object.keys(Tabs).indexOf(activeTab);
    const newIndex = Object.keys(Tabs).indexOf(newTab);
    setDirection(newIndex > currentIndex ? 'right' : 'left');
    setActiveTab(newTab);
  };

  const TabContent = Tabs[activeTab];

  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-4">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold">{id}</h1>
            <div className="flex gap-2">
              <button className="bg-gray-700/50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
              <button className="bg-gray-700/50 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
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
        <div className="flex gap-4 overflow-x-auto border-b border-gray-800 pb-2">
          {Object.keys(Tabs).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => handleTabChange(tabKey)}
              className={`text-sm whitespace-nowrap ${
                activeTab === tabKey ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {tabKey}
            </button>
          ))}
        </div>

        {/* Tab Content with Animation */}
        <div className="mt-4 relative overflow-hidden">
          <div
            ref={contentRef}
            className={`w-full transition-all duration-300 ease-in-out ${
              isTransitioning
                ? direction === 'right'
                  ? 'opacity-0 translate-x-full'
                  : 'opacity-0 -translate-x-full'
                : 'opacity-100 translate-x-0'
            }`}
          >
            <TabContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
