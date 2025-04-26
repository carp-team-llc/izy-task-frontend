import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import Column from "./components/coulumn";
import TaskCard from "./components/TaskCard";
import { Task, Column as ColumnType, StatusId } from "./components/data";
import useGetProjectTasks from "../../../../hook/Api/project/useGetProjectTasks";

// const initialTasks: Task[] = [
//   // ... (same task data as before)
//   { id: "task-1", title: "Task 1", status: "new", number: 21 },
//   { id: "task-3", title: "Task 3", status: "new", number: 18 },
//   { id: "task-4", title: "Task 4", status: "new", number: 17 },
//   { id: "task-8", title: "Task 8", status: "doing", number: 11 },
//   { id: "task-7", title: "Task 7", status: "doing", number: 12 },
//   { id: "task-2", title: "Task 2", status: "review", number: 20 },
//   { id: "task-6", title: "Task 6", status: "review", number: 13 },
//   { id: "task-5", title: "Task 5", status: "pending", number: 14 },
//   { id: "task-9", title: "Task 9", status: "pending", number: 10 },
//   { id: "task-10", title: "Task 10", status: "completed", number: 9 },
// ];

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

const KanBan = ({ projectId }: KanbanProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedTaskData, setDraggedTaskData] = useState<Task | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const kanbanRef = useRef<HTMLDivElement>(null);

  const { data } = useGetProjectTasks({ projectId });

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
        // Update preview position continuously with current mouse coords
        setPreviewPosition({ x: e.clientX, y: e.clientY });
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
    const result: Record<StatusId, Task[]> = {
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
      if (result[task.status]) {
        result[task.status].push(task);
      }
    });

    return result;
  }, [tasks]);

  useEffect(() => {
    if (data) {
      const normalizedData = data.map((task: any) => ({
        ...task,
        status: task.status.toLowerCase() as StatusId,
      }));
      console.log("Normalized tasks:", normalizedData); 
      setTasks(normalizedData);
    }
  }, [data]);

  return (
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
      {draggedTaskData && previewPosition && (
        <div
          style={{
            position: "fixed",
            // Position top-left corner directly at the mouse coordinates
            top: previewPosition.y - 250,
            left: previewPosition.x - 350,
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
    </div>
  );
};

export default KanBan;
