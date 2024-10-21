import React from "react";
import { Plus, Upload, MoreVertical, Grid } from "lucide-react";

interface Project {
  id: number;
  name: string;
  lastModified: string;
  deadline: string;
}

interface Task {
  id: number;
  name: string;
  status: "Doing" | "Completed" | "Late";
  project: string;
  date: string;
}

const projects: Project[] = [
  { id: 1, name: "Project 1", lastModified: "Feb 25,2022", deadline: "Feb 25,2022" },
  { id: 2, name: "Project 2", lastModified: "Feb 25,2022", deadline: "Feb 25,2022" },
  { id: 3, name: "Project 3", lastModified: "Feb 25,2022", deadline: "Feb 25,2022" },
  { id: 4, name: "Project 4", lastModified: "Feb 25,2022", deadline: "Feb 25,2022" },
];

const tasks: Task[] = [
  { id: 1, name: "Task an com roi di ngu", status: "Doing", project: "Project 1", date: "04 April, 2021 04:00 PM" },
  { id: 2, name: "Task an com roi di ngu", status: "Completed", project: "Project 2", date: "04 April, 2021 04:00 PM" },
  { id: 3, name: "Task an com roi di ngu", status: "Late", project: "Project 3", date: "04 April, 2021 04:00 PM" },
];

const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="space-y-2">
    <div className="flex items-center text-gray-400 text-sm mb-2 px-4">
      <span className="flex-grow">Name</span>
      <span className="w-32 text-right">Last Modified</span>
      <span className="w-32 text-right">Deadline</span>
      <span className="w-8"></span>
    </div>
    {projects.map((project) => (
      <div key={project.id} className="flex items-center py-2 px-4 rounded-lg bg-indigo-900/30">
        <div className="flex items-center space-x-3 flex-grow">
          <div className="bg-yellow-500/20 p-2 rounded">
            <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <span className="text-white font-medium">{project.name}</span>
        </div>
        <span className="w-32 text-right text-gray-400 text-sm">{project.lastModified}</span>
        <span className="w-32 text-right text-gray-400 text-sm">{project.deadline}</span>
        <MoreVertical size={16} className="w-8 text-gray-400" />
      </div>
    ))}
  </div>
);

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <div className="space-y-2">
    {tasks.map((task) => (
      <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg bg-[#1e1a3a]">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-xs text-white">AN</span>
        </div>
        <div className="flex-grow">
          <h4 className="text-white text-sm font-medium">{task.name}</h4>
          <p className="text-gray-400 text-xs">{task.project}</p>
          <p className="text-gray-400 text-xs">{task.date}</p>
        </div>
        <span className={`text-xs font-medium ${
          task.status === "Doing" ? "text-blue-400" :
          task.status === "Completed" ? "text-green-400" :
          "text-red-400"
        }`}>
          {task.status}
        </span>
      </div>
    ))}
  </div>
);

export default function ProjectDashboard() {
  return (
    <div className="min-h-screen text-white ">
      <div className="flex items-center p-2  ">
        <div className="flex items-center space-x-4 flex-grow ">
          <h1 className="text-2xl font-bold text-indigo-400 ml-5">Project</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center text-sm">
            <Plus size={16} className="mr-2" />
            Create New Project
          </button>
          <button className="bg-indigo-600/20 hover:bg-indigo-600/30 px-4 py-2 rounded-lg flex items-center text-sm">
            <Upload size={16} className="mr-2" />
            Import
          </button>
          <button className="bg-indigo-600/20 hover:bg-indigo-600/30 p-2 rounded-lg">
            <Grid size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-8 flex space-x-8">
        <main className="flex-grow bg-[#05051F] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All project</h2>
          </div>
          <ProjectList projects={projects} />
        </main>
        
        <aside className="w-80 space-y-6">
          <section className="bg-[#05051F] rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 bg-[#6c5dd3] text-white">Activate</h3>
            <div className="p-4 space-y-2">
              <TaskList tasks={tasks} />
            </div>
          </section>
          
          <section className="bg-[#05051F] rounded-lg overflow-hidden">
            <h3 className="text-lg font-semibold p-4 bg-[#6c5dd3] text-white">Information</h3>
            <div className="p-4 space-y-1 text-sm">
              <p className="flex justify-between"><span>Total project:</span> <span>4</span></p>
              <p className="flex justify-between"><span>Total task:</span> <span>20</span></p>
              <p className="flex justify-between"><span>Total completed:</span> <span>10</span></p>
              <p className="flex justify-between"><span>Total pending:</span> <span>5</span></p>
              <p className="flex justify-between"><span>Total doing:</span> <span>5</span></p>
              <p className="flex justify-between"><span>Total late:</span> <span>1</span></p>
              <p className="flex justify-between"><span>Total cancel:</span> <span>0</span></p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}