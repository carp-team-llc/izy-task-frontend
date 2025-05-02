import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  notifyError,
  notifySuccess,
} from "../../../../component/toastify/Toastify";
import Helper from "../../../../constant/Helper";
import UseChangeStatusProject from "../../../../hook/Api/project/useChangeStatusProject";
import useGetProjectTasks from "../../../../hook/Api/project/useGetProjectTasks";
import Column from "./components/coulumn";
import {
  Column as ColumnType,
  StatusId,
  type TaskResponse,
} from "./components/data";
import type { FilterState, SortKey } from "./components/header/type";
import KanbanHeader from "./components/kanbanHeader";
import TaskCard from "./components/TaskCard";

const columnsData: ColumnType[] = [
  // ... (same column data as before)
  { id: "new", title: "New", color: "bg-[#06a2c9]" },
  { id: "doing", title: "Doing", color: "bg-[#ff5482]" },
  { id: "completed", title: "Completed", color: "bg-[#0eb53b]" },
  { id: "review", title: "Review", color: "bg-[#FF6900]" },
  { id: "pending", title: "Pending", color: "bg-[#c99506]" },
  { id: "late", title: "Late", color: "bg-[#d92a02]" },
  { id: "cancel", title: "Cancelled", color: "bg-[#7d7d7d]" },
];

type KanbanProps = {
  projectId: string;
};

interface PreviewPosition {
  x: number;
  y: number;
}

const KanBan = ({ projectId }: KanbanProps) => {
  const [filters, setFilters] = useState<FilterState>({
    users: [],
    author: null,
    statuses: [],
    isExpiration: false,
    startTime: null,
    expirationDate: null,
  });
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedTaskData, setDraggedTaskData] = useState<TaskResponse | null>(
    null
  );
  const [previewPosition, setPreviewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const kanbanRef = useRef<HTMLDivElement>(null);

  const { data } = useGetProjectTasks({
    projectId,
    ...(filters.users && { employeeId: filters.users }),
    ...(filters.author && { authorId: filters.author }),
    ...(filters.statuses && { status: filters.statuses }),
    ...(filters.isExpiration && { isExpiration: filters.isExpiration }),
    ...(filters.startTime && { startTime: filters.startTime }),
    ...(filters.expirationDate && { expirationDate: filters.expirationDate }),
  });
  const { onChangeStatus } = UseChangeStatusProject();

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
      const taskToDrag = tasks.find((t) => t.id === taskId);
      if (!taskToDrag) return;

      setDraggedTask(taskId);
      setDraggedTaskData(taskToDrag);
      setPreviewPosition({ x: e.clientX, y: e.clientY }); // Initial position is just the mouse coords

      // Hide default ghost image
      const img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      e.dataTransfer.setDragImage(img, 0, 0);

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("taskId", taskId);
    },
    [tasks]
  ); // Dependency on tasks

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (draggedTask) {
        const adjustedX = e.clientX;
        const adjustedY = e.clientY;

        setPreviewPosition({ x: adjustedX, y: adjustedY });
      }
    },
    [draggedTask]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetStatus: StatusId) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("taskId");
      if (!taskId || taskId !== draggedTask) return;

      const task = tasks.find((t) => t.id === taskId);
      if (!task || task.status === targetStatus) return;

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
      );

      try {
        onChangeStatus({
          id: taskId,
          projectId: projectId,
          statusKey: Helper.capitalize(targetStatus),
        });
        notifySuccess(
          `Move task from status: ${task.status} to status: ${targetStatus}`
        );
      } catch (err) {
        notifyError("Something went wrong!");
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, status: task!.status } : t
          )
        );
      }
      // Reset drag state after successful drop
      setDraggedTask(null);
      setDraggedTaskData(null);
      setPreviewPosition(null);

      try {
      } catch (error) {}
    },
    [draggedTask]
  );

  const handleDragEnd = useCallback(() => {
    // Always cleanup drag state
    setDraggedTask(null);
    setDraggedTaskData(null);
    setPreviewPosition(null);
  }, []);

  const tasksByStatus = useMemo(() => {
    // record Utility Type
    const result: Record<StatusId, TaskResponse[]> = {
      new: [],
      doing: [],
      pending: [],
      late: [],
      review: [],
      completed: [],
      cancel: [],
    };

    // lặp lấy task và phân loại task theo status
    tasks.forEach((task) => {
      if (result[task.status as StatusId]) {
        result[task.status as StatusId].push(task);
      }
    });

    return result;
  }, [tasks]);

  const handleFiltersSelect = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSort: SortKey) => {
    setSortKey(newSort);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    if (data) {
      const normalizedData = data.map((task: any) => ({
        ...task,
        status: task.status.toLowerCase() as StatusId,
      }));
      setTasks(normalizedData);
    }
  }, [data]);

  return (
    <>
      <KanbanHeader
        onFilterChange={handleFiltersSelect}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <div
        ref={kanbanRef}
        className="flex space-x-6 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 h-[calc(100vh-200px)] relative"
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columnsData?.map((column, index) => (
          <>
            <Column
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []} // 👈 lấy task theo id
              draggedTask={draggedTask}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
            {index < columnsData.length - 1 && <div className="border-2" />}
          </>
        ))}
      </div>
      {draggedTaskData && previewPosition && (
        <div
          style={{
            position: "fixed",
            top: previewPosition.y - (kanbanRef.current?.getBoundingClientRect().top || 0), // duck this shit
            left: previewPosition.x - (kanbanRef.current?.getBoundingClientRect().left || 0), // duck this shit
            pointerEvents: "none",
            zIndex: 50,
            width:
              kanbanRef.current?.querySelector(`[draggable="true"]`)
                ?.clientWidth || 280, // Attempt to match width
            transform: "translate(-0%, -0%)", // Ensure top-left aligns perfectly (default, but good to be explicit)
          }}
        >
          <TaskCard
            task={draggedTaskData}
            isDragging={false}
            isPreview={true}
          />
        </div>
      )}
    </>
  );
};

export default KanBan;