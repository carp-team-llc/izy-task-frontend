import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, MessageCircle, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  image: string;
  date: string;
  users: string[];
  comments?: number;
  timeEstimate?: string;
  isHidden?: boolean;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const TaskCard: React.FC<{ task: Task; isDragging?: boolean }> = ({
  task,
  isDragging = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 w-40 h-80 cursor-move  ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="relative mb-2">
        <img
          src={task.image}
          alt={task.title}
          className="w-full h-32 object-cover rounded-md"
        />
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded text-white ${
            task.status === "New"
              ? "bg-blue-500"
              : task.status === "Pending"
              ? "bg-yellow-500"
              : task.status === "Late"
              ? "bg-red-500"
              : task.status === "Cancel"
              ? "bg-gray-500"
              : task.status === "Doing"
              ? "bg-orange-500"
              : "bg-green-500"
          }`}
        >
          {task.status}
        </span>
      </div>
      <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
      <p className="text-indigo-600 text-xs mb-2">
        Create content for personal App
      </p>
      <p className="text-gray-500 text-xs mb-2">{task.date}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.users.map((user, index) => (
            <img
              key={index}
              src={user}
              alt="User Avatar"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <div className="flex items-center space-x-2 text-gray-400 text-xs">
          {task.comments && (
            <div className="flex items-center">
              <MessageCircle size={12} className="mr-1" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.timeEstimate && (
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              <span>{task.timeEstimate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ColumnContainer: React.FC<{ column: Column; tasks: Task[] }> = ({
  column,
  tasks,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg w-44  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-sm">{column.title}</h2>
        <button
          className={`w-6 h-6 rounded-full text-white flex items-center justify-center ${column.color}`}
        >
          <Plus size={16} />
        </button>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    
    {
      id: "new",
      title: "New",
      color: "bg-blue-500",
      tasks: [
        {
          id: "new-hidden",
          title: "Hidden New Task",
          status: "New",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "1",
          title: "Create UI foundation",
          status: "New",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 3,
        },
        {
          id: "2",
          title: "Copywriting Content",
          status: "New",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 2,
        },
      ],
    },
    {
      id: "pending",
      title: "Pending",
      color: "bg-yellow-500",
      tasks: [
        {
          id: "pending-hidden",
          title: "Hidden Pending Task",
          status: "Pending",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "3",
          title: "Create UI foundation",
          status: "Pending",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 1,
        },
        {
          id: "4",
          title: "Copywriting Content",
          status: "Pending",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 4,
        },
      ],
    },
    {
      id: "late",
      title: "Late",
      color: "bg-red-500",
      tasks: [
        {
          id: "late-hidden",
          title: "Hidden Late Task",
          status: "Late",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "5",
          title: "Building information architecture",
          status: "Late",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 2,
        },
        {
          id: "6",
          title: "Update support documentation",
          status: "Late",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 1,
        },
      ],
    },
    {
      id: "cancel",
      title: "Cancel",
      color: "bg-gray-500",
      tasks: [
        {
          id: "cancel-hidden",
          title: "Hidden Cancel Task",
          status: "Cancel",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "7",
          title: "Listing deliverables checklist",
          status: "Cancel",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Sep 20, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 2,
          timeEstimate: "1:15h",
        },
        {
          id: "8",
          title: "Copywriting Content",
          status: "Cancel",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 3,
        },
      ],
    },
    {
      id: "doing",
      title: "Doing",
      color: "bg-orange-500",
      tasks: [
        {
          id: "doing-hidden",
          title: "Hidden Doing Task",
          status: "Doing",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "9",
          title: "Design System",
          status: "Doing",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 16, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 1,
        },
        {
          id: "10",
          title: "High fidelity UI Desktop",
          status: "Doing",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: [
            "/placeholder.svg?height=32&width=32",
            "/placeholder.svg?height=32&width=32",
          ],
          comments: 4,
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-green-500",
      tasks: [
        {
          id: "completed-hidden",
          title: "Hidden Completed Task",
          status: "Completed",
          image: "/placeholder.svg?height=32&width=32",
          date: "",
          users: [],
          isHidden: true,
        },
        {
          id: "11",
          title: "Design System",
          status: "Completed",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 16, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 2,
        },
        {
          id: "12",
          title: "High fidelity UI Desktop",
          status: "Completed",
          image:
            "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/351/meme-meo-1.jpg",
          date: "Aug 20, 2021",
          users: ["/placeholder.svg?height=32&width=32"],
          comments: 3,
        },
      ],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    if (activeColumn) {
      const task = activeColumn.tasks.find((t) => t.id === active.id);
      if (task && !task.isHidden) {
        setActiveTask(task);
      }
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const overColumnId = columns.findIndex(
      (col) =>
        col.id === over.id || col.tasks.some((task) => task.id === over.id)
    );

    if (activeColumnId !== overColumnId) {
      setColumns((prevColumns) => {
        const activeColumn = prevColumns[activeColumnId];
        const overColumn = prevColumns[overColumnId];

        const activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id  === active.id
        );
        const [removedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);

        removedTask.status = overColumn.title;
        const hiddenTaskIndex = overColumn.tasks.findIndex((task) => task.isHidden);
        overColumn.tasks.splice(hiddenTaskIndex + 1, 0, removedTask);

        return [...prevColumns];
      });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const overColumnId = columns.findIndex(
      (col) =>
        col.id === over.id || col.tasks.some((task) => task.id === over.id)
    );

    if (activeColumnId !== overColumnId) {
      setColumns((prevColumns) => {
        const activeColumn = prevColumns[activeColumnId];
        const overColumn = prevColumns[overColumnId];

        const activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === active.id
        );
        const [removedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);

        removedTask.status = overColumn.title;
        const hiddenTaskIndex = overColumn.tasks.findIndex((task) => task.isHidden);
        overColumn.tasks.splice(hiddenTaskIndex + 1, 0, removedTask);

        return [...prevColumns];
      });
    }

    setActiveTask(null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return (
    <div>
      <div className="p-8 bg-gray-100 min-h-screen mt-20">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Task Management Board
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <button className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              Today
            </button>
            <span className="text-gray-400">June, 20,2022</span>
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex overflow-x-auto pb-8">
            {columns.map((column, index) => (
              <React.Fragment key={column.id}>
                {index > 0 && (
                  <div className="w-px bg-gray-300 self-stretch mx-4"></div>
                )}
                <ColumnContainer column={column} tasks={column.tasks} />
              </React.Fragment>
            ))}
          </div>
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default TaskBoard;
