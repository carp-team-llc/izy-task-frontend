"use client"

import React from 'react'

interface Metric {
  icon: string
  title: string
  value: string
  subtext: string
  change?: string
}

interface Task {
  title: string
  time: string
  priority: string
  status: string
}

interface ActivityItem {
  user: string
  action: string
  details?: string
}

interface TotalTask {
  status: string
  value: number
  color: string
}

const metrics: Metric[] = [
  { icon: "⏱️", title: "Time Spent", value: "102", subtext: "ISO Hrs", change: "+8% increase today" },
  { icon: "📊", title: "Task Spent", value: "102", subtext: "ISO Task", change: "-2% increase today" },
  { icon: "⌛", title: "Total Late", value: "10", subtext: "", change: "+8% increase today" },
  { icon: "❌", title: "Total Cancel", value: "10", subtext: "", change: "+9% increase today" },
  { icon: "📅", title: "Deadline", value: "05/12/2024 · 12:00 AM", subtext: "", change: "" },
  { icon: "📈", title: "Task Estimator", value: "5", subtext: "", change: "" },
]

const tasks: Task[] = [
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
  { title: "Làm minh hình chi tiết khi nhấn vào xem task", time: "2024-11-05 | 14:30", priority: "High", status: "Doing" },
]

const workloadData: number[] = [10, 5, 5, 5, 5, 5, 5, 5, 5]

const activityStream: ActivityItem[] = [
  { user: "Calangthang", action: "changed the status to Doing on Làm minh hình chi tiết khi nhấn vào xem task" },
  { user: "Calangthang", action: "update description on Làm minh hình chi tiết khi nhấn vào xem task", details: "Làm minh hình chi tiết khi nhấn vào xem chi tiết task\n• Khi nhấn vào xem task sẽ hiện ra modal chi tiết task\n• Trong modal task sẽ hiện thị các thông tin chi tiết của task gồm:\ntrạng thái\n• November 05 at 16:08" },
]

const totalTasks: TotalTask[] = [
  { status: "Pending", value: 1, color: "bg-orange-500" },
  { status: "Late", value: 6, color: "bg-red-500" },
  { status: "Cancel", value: 3, color: "bg-blue-400" },
  { status: "Doing", value: 10, color: "bg-green-500" },
]

export default function Component() {
  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-4">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Task Nè 11</h1>
            <div className="flex gap-2">
              <button className="bg-gray-700/50 rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
              <button className="bg-gray-700/50 rounded-full p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-indigo-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
              + Invite
            </button>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0a061f]" />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 border-b border-gray-800 pb-2">
          {["Overview", "Board", "List", "Timeline", "Member"].map((item) => (
            <button
              key={item}
              className={`text-sm ${item === "Overview" ? "text-indigo-400" : "text-gray-400"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-6 gap-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-[#130b3b] p-3 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <span className="text-xl">{metric.icon}</span>
                <span className="text-xs text-gray-400">{metric.title}</span>
              </div>
              <div className="text-xl font-bold mb-0.5">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.subtext}</div>
              {metric.change && (
                <div className={`text-xs ${metric.change.includes('+') ? 'text-green-400' : 'text-red-400'} mt-1`}>
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column - Today Task */}
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
                <div key={i} className="flex items-center justify-between bg-[#1a1147] p-3 rounded">
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

          {/* Right Column - Project Workload */}
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
            <div className="h-[300px] flex items-end justify-between gap-2">
              {workloadData.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-indigo-600 rounded-sm"
                    style={{ height: `${value * 10}%` }}
                  />
                  <span className="text-xs text-gray-400">Sem</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left - Activity Stream */}
          <div className="col-span-2 bg-[#130b3b] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Activity Stream</h2>
            {activityStream.map((activity, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                    C
                  </div>
                  <span className="text-blue-400">{activity.user}</span>
                  <span className="text-sm">{activity.action}</span>
                </div>
                {activity.details && (
                  <div className="ml-10 text-sm text-gray-400 whitespace-pre-line">
                    {activity.details}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Right - Total Task */}
          <div className="bg-[#130b3b] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Total Task</h2>
            <div className="flex justify-between items-end h-32">
              {totalTasks.map((task, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 ${task.color} rounded-sm`} style={{ height: `${task.value * 10}%` }}></div>
                  <span className="text-xs mt-2">{task.value}</span>
                  <span className="text-xs text-gray-400">{task.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}