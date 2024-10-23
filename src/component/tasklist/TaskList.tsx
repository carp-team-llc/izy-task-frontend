import React, { useEffect } from "react";
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import usePersonalTaskList from "../../hook/Api/task/TaskManager/usePersonalTask"; // Import your hook here
import Helper from "../../constant/Helper";

type TaskListProps = {
  title: string;
  showAll?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ title, showAll = false }) => {
  const {
    isLoading,
    isError,
    data: tasks,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePersonalTaskList({ skip: 0, take: 10 });
  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }
  if (isError) {
    return <div>Error loading tasks: {error?.message}</div>;
  }

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
          <div>
            {tasks[0].tasks.map((task: any, index: number) => (
              <div key={index} className="flex text-white text-sm py-2">
                <div className="flex-[30] flex items-center mr-5">
                  <div className="w-8 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-lg">
                    <FiFileText size={18} className="text-gray-400" />
                  </div>
                  <div className="flex-grow max-w-[70%] overflow-hidden">
                    <span className="block break-all">{task.name}</span>
                  </div>
                </div>
                <div className="flex-[15]">
                  <p style={{ color: task.statusColor }}>{task.status}</p>
                </div>
                <div className="flex-[25] text-gray-400">
                  {Helper.formatEngDate(task.updatedAt)}
                </div>
                <div className="flex-[25] text-gray-400">
                  {Helper.formatEngDate(task.expirationDate) || ""}
                </div>
                <div className="flex-[5] flex justify-center">
                  <FiMoreVertical size={18} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isFetchingNextPage && <div>Loading more tasks...</div>}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="text-purple-500 text-sm mt-4"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default TaskList;
