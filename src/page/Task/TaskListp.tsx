import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Plus, Upload, Calendar, LayoutGrid, BarChart3, MoreVertical, ChevronUp } from 'lucide-react';
import CreateTaskList from './CreateTaskList';
import usePersonalTaskList from '../../hook/Api/task/TaskManager/useTaskListPagination'; // Import the hook
import Helper from '../../constant/Helper';

const TaskListp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const variables = {
    where: {}, 
    skip: 0,
    take: 10, 
  };

  
  const {
    data: tasks,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePersonalTaskList(variables);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mapDataToTasks = tasks.map((task) => {
    return task.data
  })

  const dataFlatmap = mapDataToTasks.flatMap((task) => {
    return task.taskList[0]
  })

  if (isLoading) {
    return <div className="text-white p-6 min-h-screen mt-24">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="text-white p-6 min-h-screen mt-24">Error loading tasks</div>;
  }
  return (
    <div className="text-white p-6 min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <NavLink to="/tasks" className="text-indigo-500 flex items-center">
            <ArrowLeft />
          </NavLink>
          <h1 className="text-xl font-semibold">Task</h1>
          <button 
            onClick={handleOpenModal} 
            className="bg-indigo-600 text-white rounded-md px-3 py-1.5 text-sm flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>Create New Task List</span>
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
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-3 font-medium">
                Name <ChevronUp size={14} className="inline ml-1" />
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
            {dataFlatmap.map((task: any) => (
              <tr key={task.id} className="border-t border-gray-700">
                <td className="py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <span>{task.name}</span>
                </td>
                <td className="py-3 text-gray-400">{Helper.formatDate(task.updatedAt)}</td>
                <td className="py-3 text-gray-400">{Helper.formatDate(task.createdAt)}</td>
                <td className="py-3 text-right">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Load more button */}
        {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      {isModalOpen && <CreateTaskList onClose={handleCloseModal} />}
    </div>
  );
};

export default TaskListp;
