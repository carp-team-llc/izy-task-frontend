import React from 'react';
import { FiMoreVertical } from 'react-icons/fi'; 
import { NavLink } from 'react-router-dom'; // Import NavLink

type TaskListProps = {
  title: string;  
  tasks: {
    icon: React.ReactNode;
    name: string;
    status: string;
    lastModified: string;
    deadline?: string;
  }[];
  showAll?: boolean; 
};

const TaskList: React.FC<TaskListProps> = ({ title, tasks, showAll = false }) => (
  <div className="bg-[#1a1f37] rounded-lg p-4 mb-3">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      {showAll && (
        <NavLink to="/tasklist"> 
          <button className="text-purple-500 text-sm">Show All</button>
        </NavLink>
      )}
    </div>
    <table className="w-full">
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "5%" }} />
      </colgroup>
      <thead>
        <tr className="text-gray-400 text-xs">
          <th className="text-left pb-2 font-normal">Name</th>
          <th className="text-left pb-2 font-normal">Status</th>
          <th className="text-left pb-2 font-normal">Last Modified</th>
          <th className="text-left pb-2 font-normal">Deadline</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="text-white text-sm">
            <td className="py-2 flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-lg">
                {task.icon}
              </div>
              {task.name}
            </td>
            <td
              className={`py-2 ${
                task.status === 'Pending'
                  ? 'text-yellow-500'
                  : task.status === 'Doing'
                  ? 'text-green-500'
                  : task.status === 'Late'
                  ? 'text-red-500'
                  : task.status === 'Ready'
                  ? 'text-blue-500'
                  : task.status === 'Cancel'
                  ? 'text-red-500'
                  : task.status === 'Completed'
                  ? 'text-green-500'
                  : ''
              }`}
            >
              {task.status}
            </td>
            <td className="py-2 text-gray-400">{task.lastModified}</td>
            <td className="py-2 text-gray-400">{task.deadline || '-'}</td>
            <td className="py-2">
              <FiMoreVertical size={18} className="text-gray-400" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskList;
