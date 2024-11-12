import React, { useState } from "react";
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Helper from "../../constant/Helper";
import DetailTask from "../../page/Task/DetailTask/DetailTask";
import useRecentTask from "../../hook/Api/task/TaskManager/useRecentTask";

type TaskListProps = {
  title: string;
  showAll?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ title, showAll = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const {
    isLoading,
    isError,
    data: tasks,
    error,
  } = useRecentTask({ where: {}, skip: 0, take: 100 });

  const totalTasks = tasks?.[0]?.tasks?.length || 0;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const recentTasks =
    tasks?.[0]?.recentTask?.slice(
      (currentPage - 1) * tasksPerPage,
      currentPage * tasksPerPage
    ) || [];

    console.log("=====>", JSON.stringify(tasks, null, 2))

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error loading tasks: {error?.message}</div>;

  return (
    <div className="bg-[#1a1f37] rounded-lg p-4 mb-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        {showAll && (
          <NavLink to="/tasklist">
            <button className="text-purple-500 text-sm">Show All</button>
          </NavLink>
        )}
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-col">
          <div className="flex text-gray-400 text-xs">
            <div className="flex-[30] text-left pb-2 font-normal mr-5">
              Name
            </div>
            <div className="flex-[15] text-left pb-2 font-normal">Status</div>
            <div className="flex-[25] text-left pb-2 font-normal">
              Last Modified
            </div>
            <div className="flex-[25] text-left pb-2 font-normal">Deadline</div>
            <div className="flex-[5]"></div>
          </div>
          {recentTasks.map((task: any, index: number) => (
            <div
              key={index}
              className="flex text-white text-sm py-2 cursor-pointer hover:bg-gray-700 hover:text-gray-200 transition duration-200"
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex-[30] flex items-center mr-5">
                <div className="w-8 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-lg">
                  <FiFileText size={18} className="text-gray-400" />
                </div>
                <div className="flex-grow max-w-[70%] overflow-hidden">
                  <span className="block break-all">{task?.task?.name}</span>
                </div>
              </div>
              <div className="flex-[15]">
                <p style={{ color: task?.task?.statusColor }}>{task?.task?.status}</p>
              </div>
              <div className="flex-[25] text-gray-400">
                {Helper.formatEngDate(task?.task?.updatedAt)}
              </div>
              <div className="flex-[25] text-gray-400">
                {Helper.formatEngDate(task?.task?.expirationDate) || ""}
              </div>
              <div className="flex-[5] flex justify-center">
                <FiMoreVertical size={18} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalTasks > 10 && (
        <div className="mt-4 bg-[#2a2f47] p-3 rounded-lg flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple-500 text-sm"
          >
            Previous
          </button>
          <span className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-purple-500 text-sm"
          >
            Next
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-[#0f0a2a] rounded-lg max-w-5xl p-4 w-full transition-transform transform scale-100 duration-300 ease-in-out">
            <DetailTask task={selectedTask} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
