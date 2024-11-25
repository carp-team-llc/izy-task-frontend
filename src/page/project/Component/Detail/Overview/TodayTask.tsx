import React from "react";

interface Task {
  title: string;
  time: string;
  priority: string;
  status: string;
}
const tasks: Task[] = [
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
  {
    title: "Làm minh hình chi tiết khi nhấn vào xem task",
    time: "2024-11-05 | 14:30",
    priority: "High",
    status: "Doing",
  },
];

export default function Component() {
  return (
    <div className="col-span-2 bg-[#130b3b] rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Today Task</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["All", "High", "Medium", "Normal", "Low"].map((filter) => (
          <button
            key={filter}
            className={`text-sm px-3 py-1 rounded whitespace-nowrap ${
              filter === "All" ? "bg-indigo-600" : "bg-[#1f1655] text-gray-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-[#1a1147] p-3 rounded"
          >
            <div>
              <h3 className="text-sm mb-1">{task.title}</h3>
              <span className="text-xs text-gray-400">{task.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded">
                {task.priority}
              </span>
              <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
                {task.status}
              </span>
              <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                C
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
