import React from "react";
interface Task {
    id: number;
    name: string;
    status: "Doing" | "Completed" | "Late";
    project: string;
    date: string;
  }
  const tasks1: Task[] = [
    {
      id: 1,
      name: "Task an com roi di ngu",
      status: "Doing",
      project: "Project 1",
      date: "04 April, 2021 04:00 PM",
    },
    {
      id: 2,
      name: "Task an com roi di ngu",
      status: "Completed",
      project: "Project 2",
      date: "04 April, 2021 04:00 PM",
    },
    {
      id: 3,
      name: "Task an com roi di ngu",
      status: "Late",
      project: "Project 3",
      date: "04 April, 2021 04:00 PM",
    },
  ];

const Activate: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center space-x-3 p-3 rounded-lg bg-[#1e1a3a]"
        >
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs text-white">AN</span>
          </div>
          <div className="flex-grow">
            <h4 className="text-white text-sm font-medium">{task.name}</h4>
            <p className="text-gray-400 text-xs">{task.project}</p>
            <p className="text-gray-400 text-xs">{task.date}</p>
          </div>
          <span
            className={`text-xs font-medium ${
              task.status === "Doing"
                ? "text-blue-400"
                : task.status === "Completed"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
export default function ProjectDashboard() {
  return(
    <section className="bg-[#05051F] rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 bg-[#6c5dd3] text-white">
              Activate
            </h3>
            <div className="p-4 space-y-2">
              <Activate tasks={tasks1} />
            </div>
          </section>
  )
}