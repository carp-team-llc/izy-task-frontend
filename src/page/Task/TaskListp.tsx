import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeft, Plus, Upload, Calendar, LayoutGrid, BarChart3, MoreVertical, ChevronUp } from 'lucide-react'

const TaskListp: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task ngày thứ ba', lastModified: 'Feb 25,2022', deadline: 'Feb 25,2022' },
    { id: 2, name: 'Task ngày 22/09', lastModified: 'Feb 25,2022', deadline: 'Feb 25,2022' },
    { id: 3, name: 'Làm trang web quản lý Task', lastModified: 'Feb 25,2022', deadline: 'Feb 25,2022' },
    { id: 4, name: 'Làm task ngày 4', lastModified: 'Feb 25,2022', deadline: 'Feb 25,2022' },
  ]

  return (
    <div className="bg-[#0F0F1A] text-white p-6 min-h-screen mt-28">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <NavLink to="/task" className="text-indigo-500 flex items-center">
            <ArrowLeft />
          </NavLink>
          <h1 className="text-xl font-semibold">Task</h1>
          <button className="bg-indigo-600 text-white rounded-md px-3 py-1.5 text-sm flex items-center space-x-1">
            <Plus size={16} />
            <span>Create New Task</span>
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
              <th className="pb-3 font-medium">Name <ChevronUp size={14} className="inline ml-1" /></th>
              <th className="pb-3 font-medium">Last Modified <ChevronUp size={14} className="inline ml-1" /></th>
              <th className="pb-3 font-medium">Deadline <ChevronUp size={14} className="inline ml-1" /></th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t border-gray-700">
                <td className="py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <span>{task.name}</span>
                </td>
                <td className="py-3 text-gray-400">{task.lastModified}</td>
                <td className="py-3 text-gray-400">{task.deadline}</td>
                <td className="py-3 text-right">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaskListp
