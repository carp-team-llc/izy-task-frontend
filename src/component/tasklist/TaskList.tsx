import React, { useEffect } from "react";
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import usePersonalTaskList from "../../hook/Api/task/TaskManager/usePersonalTask"; // Import your hook here

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
  console.log("====>", tasks[0].tasks);

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
          {tasks[0].tasks.map((task: any, index: number) => (
            <tr key={index} className="text-white text-sm">
              <td className="py-2 flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded mr-2 flex items-center justify-center text-lg">
                  <FiFileText size={18} className="text-gray-400" />
                </div>
                {task.name}
              </td>
              <td className={`py-2`}>
                <p style={{ color: task.statusColor }}>{task.status}</p>
              </td>
              <td className="py-2 text-gray-400">{task.updatedAt}</td>
              <td className="py-2 text-gray-400">
                {task.estimatetime || "null"}
              </td>
              <td className="py-2">
                <FiMoreVertical size={18} className="text-gray-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
