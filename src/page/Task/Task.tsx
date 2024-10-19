import React from "react";

import TaskList from "../../component/tasklist/TaskList";
import Header2 from "../../component/header/Header2";
import WeeklyTaskProgress from "../../component/tasklist/WeeklyTaskProgress";
import ActivityChart from "../../component/chart/ActivityChart";

export default function Task() {
  const personalTasks = [
    {
      name: "Proposal.docx",
      status: "Pending",
      lastModified: "Feb 25,2022",
      deadline: "Feb 25,2022",
      icon: "📄",
    },
    {
      name: "Proposal.docx",
      status: "Doing",
      lastModified: "Feb 25,2022",
      deadline: "Feb 25,2022",
      icon: "📄",
    },
    {
      name: "Proposal.docx",
      status: "Late",
      lastModified: "Feb 25,2022",
      deadline: "Feb 25,2022",
      icon: "📄",
    },
    {
      name: "Proposal.docx",
      status: "Ready",
      lastModified: "Feb 25,2022",
      deadline: "Feb 25,2022",
      icon: "📄",
    },
  ];

  const recentTasks = [
    {
      name: "Làm màn hình Task",
      status: "Doing",
      lastModified: "Feb 25,2022",
      icon: "📄",
    },
    {
      name: "Làm api cho sprint",
      status: "Pending",
      lastModified: "Feb 24,2022",
      icon: "📨",
    },
    {
      name: "Gửn api cho thông báo trong ngày",
      status: "Cancel",
      lastModified: "Feb 23,2022",
      icon: "📊",
    },
    {
      name: "Vẽ màn hình mới",
      status: "Completed",
      lastModified: "Feb 20,2022",
      icon: "🎨",
    },
  ];

  return (
    <div className="flex min-h-screen text-white">
    

      <div className="flex-1 p-6">
      <Header2></Header2>
        <div className="flex space-x-4">
          <div className="flex-1">
            <TaskList title="Personal Task" tasks={personalTasks} showAll />
            <TaskList title="Recent Task" tasks={recentTasks} />
          </div>
          <div className="w-72">
            <WeeklyTaskProgress />
            <ActivityChart />
          </div>
        </div>
      </div>
    </div>
  );
}
