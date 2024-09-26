import React from "react";
const ActivityChart = () => (
  <div className="bg-[#1a1f37] rounded-lg p-4">
    <h3 className="text-white text-lg font-semibold mb-4">Activity Chart</h3>
    <div className="flex items-end justify-between h-32">
      {[30, 70, 20, 80, 40, 60].map((height, index) => (
        <div
          key={index}
          className="w-8 bg-blue-500 rounded-t"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
    <div className="flex justify-between mt-2 text-gray-400 text-xs">
      <span>Done</span>
      <span>Doing</span>
      <span>Pending</span>
    </div>
  </div>
);
export default ActivityChart;
