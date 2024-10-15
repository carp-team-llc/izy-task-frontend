import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Upload,
  Calendar,
  LayoutGrid,
  BarChart3,
  MoreVertical,
  ChevronUp,
} from "lucide-react";
import useDetailTask from "../../hook/Api/task/TaskManager/useDetailTask";

const TaskListp: React.FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const {
    data: taskDetails,
    isLoading,
    isError,
  } = useDetailTask({
    id: "670d4fff0d8a4c7267de4ce7",
    // id: selectedTaskId ? selectedTaskId.toString() : undefined,
  });

  const handleTaskClick = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div className="text-white p-6 min-h-screen mt-24">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <NavLink to="/tasklist" className="text-indigo-500 flex items-center">
            <ArrowLeft />
          </NavLink>
          <h1 className="text-xl font-semibold">Task</h1>
          <button className="bg-indigo-600 text-white rounded-md px-3 py-1.5 text-sm flex items-center space-x-1">
            <Plus size={16} />
            <span>Create New Task</span>
          </button>
          <button className="bg-[#2D2D3D] text-white rounded-md px-3 py-1.5 text-sm flex items-center space-x-1">
            <Upload size={16} />
            <span>Import</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar size={20} className="text-gray-400" />
          <LayoutGrid size={20} className="text-gray-400" />
          <BarChart3 size={20} className="text-gray-400" />
        </div>
      </header>

      <div className="bg-[#1E1E2D] rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{taskDetails?.name}</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-3 font-medium">
                Name <ChevronUp size={14} className="inline ml-1" />
              </th>
              <th className="pb-3 font-medium">
                Status <ChevronUp size={14} className="inline ml-1" />
              </th>
              <th className="pb-3 font-medium">
                Last Modified <ChevronUp size={14} className="inline ml-1" />
              </th>
              <th className="pb-3 font-medium">
                Deadline <ChevronUp size={14} className="inline ml-1" />
              </th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {taskDetails?.tasks.map((task: any) => (
              <tr
                key={task.id}
                className="border-t border-gray-700"
                onClick={() => handleTaskClick(task.id)}
              >
                <td className="py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <span>{task.name}</span>
                </td>
                <td className="py-3">
                  <p style={{ color: task.statusColor }}>{task.status}</p>
                </td>
                <td className="py-3 text-gray-400">{task.updatedAt}</td>
                <td className="py-3 text-gray-400">{task.expirationDate}</td>
                <td className="py-3 text-right">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display Task Details */}
        {selectedTaskId && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Task Details</h3>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading task details.</p>}
            {taskDetails && taskDetails.length > 0 && (
              <div>
                {/* Render your task details here */}
                <p>Name: {taskDetails[0].name}</p>
                <p>Status: {taskDetails[0].status}</p>
                <p>Updated At: {taskDetails[0].updatedAt}</p>
                <p>Deadline: {taskDetails[0].deadline}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListp;
