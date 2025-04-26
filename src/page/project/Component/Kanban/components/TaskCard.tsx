// src/components/Kanban/component/TaskCard.tsx
import React from "react";
import { Task } from "./data";

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  isPreview?: boolean;
  handleDragStart?: (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging,
  isPreview = false,
  handleDragStart,
}) => {
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
    >
      <div className="flex flex-col space-y-2">
        {/* Title nằm trên */}
        <span className="text-md font-medium text-gray-200">{task.title}</span>

        {/* Deadline + number nằm dưới cùng hàng */}
        <div className="flex justify-between items-center text-gray-400 text-xs">
          <span className="font-semibold text-gray-300">Deadline:</span>
          <span className="ml-2">#{task.number}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
