import React from "react";

const workloadData: number[] = [10, 5, 5, 5, 5, 5, 5, 5, 5];

export default function Component() {
  return (
    <div className="bg-[#130b3b] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Project workload</h2>
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-xs px-3 py-1 rounded flex items-center gap-1">
            Status <span className="text-[10px]">▼</span>
          </button>
          <button className="bg-indigo-600 text-xs px-3 py-1 rounded flex items-center gap-1">
            Last 3 days <span className="text-[10px]">▼</span>
          </button>
        </div>
      </div>
      <div className="h-[250px] sm:h-[200px] md:h-[300px] flex items-end justify-between gap-2">
        {workloadData.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-indigo-600 rounded-sm transition-all duration-300"
              style={{ height: `${value * 10}%` }}
            />
            <span className="text-xs sm:text-[10px] text-gray-400">Sem</span>
          </div>
        ))}
      </div>
    </div>
  );
}
