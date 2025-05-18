import React from "react";
import { Task } from "../Dashboard.type";
import { motion } from "framer-motion";
import { AlertCircle, Zap, CheckSquare, Clock, XSquare } from "lucide-react";
import Helper from "../../../constant/Helper";

interface TaskListProps {
  tasks: Task[];
  title: string;
  loading: boolean;
  icon?: React.ReactNode; // Optional icon for the list title
}

const getStatusPill = (status: Task["status"]) => {
  switch (status) {
    case "LATE":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-600 text-red-100 flex items-center">
          <AlertCircle size={12} className="mr-1" /> Late
        </span>
      );
    case "DOING":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-600 text-blue-100 flex items-center">
          <Zap size={12} className="mr-1" /> Doing
        </span>
      );
    case "PENDING":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-500 text-yellow-900 flex items-center">
          <Clock size={12} className="mr-1" /> Pending
        </span>
      );
    case "COMPLETED":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-600 text-green-100 flex items-center">
          <CheckSquare size={12} className="mr-1" /> Done
        </span>
      );
    case "CANCEL":
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-600 text-slate-100 flex items-center">
          <XSquare size={12} className="mr-1" /> Cancelled
        </span>
      );
    default:
      return (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-500 text-slate-100">
          {status}
        </span>
      );
  }
};

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <motion.li
      className="flex justify-between items-center p-3 bg-[#252c48] rounded-md hover:bg-[#313a5f] transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <p className="text-sm font-medium text-slate-100">{task.name}</p>
        {task?.project && (
          <p className="text-xs text-slate-400">{task?.project?.name}</p>
        )}
      </div>
      <div className="flex flex-col items-end sm:flex-row sm:items-center gap-2">
        {getStatusPill(task.status)}
        <span className="text-xs text-slate-400">
          Due: {Helper.formatDate(task.expirationDate)}
        </span>
      </div>
    </motion.li>
  );
};

const TaskList: React.FC<TaskListProps> = ({ tasks, title, loading, icon }) => {
  if (loading) {
    return (
      <div>
        <div className="flex items-center mb-3">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className="text-md font-semibold text-slate-300">{title}</h3>
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-3 bg-[#252c48] rounded-md mb-2 h-[60px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center mb-3">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="text-md font-semibold text-slate-300">{title}</h3>
      </div>
      {tasks.length === 0 ? (
        <p className="text-slate-400 text-center py-4">
          No tasks in this list.
        </p>
      ) : (
        <ul
          className="space-y-2 max-h-[250px] overflow-y-auto pr-1
                      scrollbar-thin scrollbar-thumb-[#3e4a6e] scrollbar-track-[#252c48]"
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
