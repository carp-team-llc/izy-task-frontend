// src/components/Kanban/component/Column.tsx
import React, { useState } from "react";
import { Task, Column as ColumnType, StatusId } from "./data";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  draggedTask: string | null;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    targetStatus: StatusId
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  draggedTask,
  handleDragStart,
  handleDrop,
}) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (
      e.relatedTarget &&
      (e.currentTarget as Node).contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setIsOver(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDrop(e, column.id);
    setIsOver(false);
  };

  const getBackgroundColor = (status: string): string => {
    switch (status) {
      case "new":
        return "bg-[#06a2c9]";
      case "doing":
        return "bg-[#ff5482]";
      case "review":
        return "bg-[#FF6900]";
      case "pending":
        return "bg-[#c99506]";
      case "completed":
        return "bg-[#0eb53b]";
      case "late":
        return "bg-[#d92a02]";
      default:
        return "bg-[#7d7d7d]";
    }
  };

  return (
    <div
      className={`
        flex flex-col flex-shrink-0 w-72 md:w-80
        transition-colors duration-200
        ${isOver && draggedTask ? "bg-gray-700/30 rounded-lg" : ""} 
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div
        className={`
        flex justify-center items-center mb-4 px-3 py-2 rounded-md
        ${getBackgroundColor(column.id)}
        `}
      >
        <p className="font-semibold text-md text-white">{column.title}</p>
      </div>

      {/* Task Cards */}
      <div className="flex-grow min-h-[100px] px-1">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggedTask === task.id}
            handleDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
