import React from 'react'
const WeeklyTaskProgress = () => (
    <div className="bg-[#1a1f37] rounded-lg p-4 mb-4">
      <h3 className="text-white text-lg font-semibold mb-4">Weekly Task</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
              85%
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-purple-600">
              10 / 12 Task
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
          <div
            style={{ width: "85%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
          ></div>
        </div>
      </div>
      {["Task 1", "Task 2", "Task 3", "Task 4"].map((task, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded mr-2"></div>
            <span className="text-white text-sm">{task}</span>
          </div>
          <div className="w-20 bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${[80, 25, 70, 15][index]}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
export default  WeeklyTaskProgress;
