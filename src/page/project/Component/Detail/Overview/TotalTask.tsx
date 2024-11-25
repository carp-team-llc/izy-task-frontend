import React from "react";

interface TotalTask {
    status: string;
    value: number;
    color: string;
  }
  const totalTasks: TotalTask[] = [
    { status: "Pending", value: 1, color: "bg-orange-500" },
    { status: "Late", value: 6, color: "bg-red-500" },
    { status: "Cancel", value: 3, color: "bg-blue-400" },
    { status: "Doing", value: 10, color: "bg-green-500" },
  ];

  export default function Component() {
    return (
        <div className="bg-[#130b3b] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Total Task</h2>
            <div className="flex justify-between items-end h-32">
              {totalTasks.map((task, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 ${task.color} rounded-sm`}
                    style={{ height: `${task.value * 10}%` }}
                  ></div>
                  <span className="text-xs mt-2">{task.value}</span>
                  <span className="text-xs text-gray-400">{task.status}</span>
                </div>
              ))}
            </div>
          </div>
    )
  }