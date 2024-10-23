import React from "react";
import { NavLink, useParams } from "react-router-dom";
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
import { FiFileText } from "react-icons/fi";
import useDetailTask from "../../hook/Api/task/TaskManager/useDetailTask";
import Helper from "../../constant/Helper";

const DetailTaskList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

  const {
    data: taskDetails,
    isLoading,
    isError,
  } = useDetailTask({ id });

  return (
    <div className="text-white p-6 min-h-screen ">
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
                className="border-t border-gray-700 hover:bg-gray-700 cursor-pointer" // Add hover effect
              >
                <td className="py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-lg">
                   <FiFileText size={25} className="text-gray-400" />
                   </div>
                  <span>{task.name}</span>
                </td>
                <td className="py-3" style={{color: task.statusColor, fontWeight: 600}} >{task.status}</td>
                <td className="py-3 text-gray-400">{Helper.formatEngDate(task.updatedAt)}</td>
                <td className="py-3 text-gray-400">{Helper.formatEngDate(task.expirationDate)}</td>
                <td className="py-3 text-right">
                  <button className="text-gray-400 hover:text-white">
                    <ChevronUp size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading task details.</p>}
      </div>
    </div>
  );
};

export default DetailTaskList;
