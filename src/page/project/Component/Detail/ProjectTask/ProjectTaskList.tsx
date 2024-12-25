"use client";

import { Filter, Plus, RefreshCcw, Search, Settings } from "lucide-react";
import { useParams } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  actionRequired?: boolean;
  schedule?: string;
  priority: "Normal" | "High" | "Low";
  status?: "New" | "In Progress" | "Done";
  isExpanded?: boolean;
}

export default function Component() {
  const { id } = useParams();
  const tasks: Task[] = [
    { id: 1, title: "Task sửa chữa", priority: "Normal", actionRequired: true },
    {
      id: 10,
      title: "Testtttttt",
      priority: "Normal",
      status: "New",
      actionRequired: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F35] text-gray-200">
      {/* Task Table */}
      <div className="min-h-screen bg-[#2d2d3d] text-gray-300 p-4 rounded-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-[#1a1940] rounded">
              <RefreshCcw className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-[#1a1940] rounded">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-[#1a1940] rounded">
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-[#1a1940] rounded">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Status:</span>
            <button className="px-2 py-1 bg-[#111111] rounded text-xs text-gray-300">
              All <span className="ml-1">▼</span>
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs text-gray-400 bg-[#1e1f2b]">
              <th className="py-2 px-2 border border-[#3b3d4f] w-8 "></th>
              <th className="py-2 px-2 border border-[#3b3d4f]">TITLE</th>
              <th className="py-2 px-2 border border-[#3b3d4f] w-32">
                ACTION REQUIRED
              </th>
              <th className="py-2 px-2 border border-[#3b3d4f] w-32">
                SCHEDULE
              </th>
              <th className="py-2 px-2 border border-[#3b3d4f] w-32">
                PRIORITY
              </th>
              <th className="py-2 px-2 border border-[#3b3d4f] w-32">STATUS</th>
              <th className="py-2 px-2 border border-[#3b3d4f] w-8 text-center">
                <button className="hover:bg-[#1a1940] p-1 rounded">
                  <Plus className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-[#1a1940] transition-colors"
              >
                <td className="py-2 px-2 text-gray-400 text-sm border border-[#3b3d4f]">
                  {task.id}
                </td>
                <td className="py-2 px-2 border border-[#3b3d4f]">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 text-xs">▶</button>
                    <span className="text-sm">{task.title}</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-center border border-[#3b3d4f]">
                  {task.actionRequired && (
                    <div className="w-4 h-4 rounded-full bg-[#4646a4]" />
                  )}
                </td>
                <td className="py-2 px-2 text-sm text-center border border-[#3b3d4f]">
                  {task.schedule}
                </td>
                <td className="py-2 px-2 text-center border border-[#3b3d4f]">
                  <div className="flex items-center justify-center gap-1 text-gray-400">
                    <span className="text-xs">◆</span>
                    <span className="text-sm">{task.priority}</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-center border border-[#3b3d4f]">
                  {task.status && (
                    <span className="px-2 py-0.5 text-xs bg-[#1a3f5e] text-[#38bdf8] rounded">
                      {task.status}
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 border border-[#3b3d4f]"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full h-px bg-gray-300"></div>

        <div className="flex items-center gap-2 mt-4 text-sm">
          <button className="text-[#38bdf8] hover:text-[#60c9fa] transition-colors flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>New task</span>
          </button>
          <span className="text-gray-600">•</span>
          <button className="text-[#38bdf8] hover:text-[#60c9fa] transition-colors">
            Folder
          </button>
        </div>
      </div>
    </div>
  );
}
