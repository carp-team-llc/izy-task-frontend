import {
    Calendar,
    Clock,
    Flag
} from "lucide-react";
import React from "react";


const StatusDetailTask: React.FC = () => {


    return (
        <div className="bg-[#0f0a2a] p-6 space-y-4 flex-grow">
        <div className="flex justify-between items-center">
          <span>Status</span>
          <span className="px-2 py-1 bg-green-500 text-white rounded text-sm mr-24">
            Completed
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-24">Author</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <span className="text-xs">C</span>
            </div>
            <span>Calangtrang</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-24">Assigned to</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <span className="text-xs">C</span>
            </div>
            <span>Calangtrang</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-24">Task List</span>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <span className="text-xs">1</span>
            </div>
            <span>Task list 1</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="w-24">Team</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex items-center">
          <span className="w-24">Project</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          <span>Start time</span>
          <span className="ml-auto">20/10/2024 - 11:42:32</span>
        </div>
        <div className="flex items-center">
          <Flag size={16} className="mr-2" />
          <span>End time</span>
          <span className="ml-auto">20/10/2024 - 11:42:32</span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>Estimate</span>
          <span className="ml-auto">240 Hour - 1(0 Day)</span>
        </div>
      </div>
    );
};
export default StatusDetailTask;