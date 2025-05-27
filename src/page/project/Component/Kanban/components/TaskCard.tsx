// src/components/Kanban/component/TaskCard.tsx
import React from "react";
import type { TaskResponse } from "./data";
import Helper from "../../../../../constant/Helper";
import { AnimatePresence, motion } from "framer-motion";
import DetailTask from "../../../../Task/DetailTask/DetailTask";

interface TaskCardProps {
  task: TaskResponse;
  isDragging: boolean;
  isPreview?: boolean;
  handleDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => void;
}

const setPriorityColor = (priority: string) => {
  switch (priority) {
    case "LOW":
      return "#0eb53b";
    case "NORMAL":
      return "#06a2c9";
    case "MEDIUM":
      return "#c99506";
    case "HIGH":
      return "#c90000";
    default:
      return "#7d7d7d";
  }
};

const isExpired = (expirationDate: string) => {
  const isPast = new Date(expirationDate) < new Date();

  return (
    <p className={`italic ${isPast ? "text-red-500" : "text-gray-300"}`}>
      {Helper.formatDate(expirationDate)}
    </p>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging,
  isPreview = false,
  handleDragStart,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any | null>();

  const handleTaskOpen = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleTaskClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const getBorderColor = (status: string): string => {
    switch (status) {
      case "new":
        return "border-l-[#06a2c9]";
      case "doing":
        return "border-l-[#ff5482]";
      case "review":
        return "border-l-[#FF6900]";
      case "pending":
        return "border-l-[#c99506]";
      case "completed":
        return "border-l-[#0eb53b]";
      case "late":
        return "border-l-[#d92a02]";
      default:
        return "border-l-[#7d7d7d]";
    }
  };

  const cardClasses = `
    bg-[#1e1a31] rounded-md p-3 mb-3 shadow
    border-l-4 ${getBorderColor(task.status)}
    transition-opacity duration-200 ease-in-out
    ${
      isDragging ? "opacity-10" : "opacity-100"
    } // Fade out original card significantly
    ${
      isPreview ? "ring-2 ring-indigo-500 scale-105 shadow-xl" : ""
    } // Style the preview distinctively
  `;

  return (
    <>
      <div
        draggable={!isPreview && handleDragStart ? true : undefined}
        onDragStart={
          !isPreview && handleDragStart
            ? (e) => handleDragStart(e, task.id)
            : undefined
        }
        className={`${cardClasses} ${
          !isPreview ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onClick={() => handleTaskOpen(task)}
      >
        <div className="flex flex-col space-y-2">
          {/* Title nằm trên */}
          <div className="flex items-center">
            <span className="text-md font-medium text-gray-200">
              {task.name}
            </span>
            <span
              className={`ml-2 text-xs bg-[${setPriorityColor(
                task?.priority
              )}] px-2 py-1 rounded-full text-white`}
            >
              {Helper.capitalize(task?.priority)}
            </span>
          </div>

          {/* Deadline + number nằm dưới cùng hàng */}
          <div className="flex justify-between items-center text-gray-400 text-xs">
            <span className="flex font-semibold text-gray-300">
              Deadline:
              <div className="w-1" />{" "}
              <p className="italic">{isExpired(task?.expirationDate)}</p>
            </span>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={
                task?.employeeAvatar || "https://i0.wp.com/catcaresolutions.com/wp-content/uploads/2020/12/cute-cat-with-yellow-headband-on.png?fit=1000%2C1500&ssl=1"
              }
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0f0a2a] rounded-lg max-w-5xl p-4 w-full max-h-[90vh] overflow-auto"
            >
              <DetailTask task={selectedTask} onClose={handleTaskClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TaskCard;
