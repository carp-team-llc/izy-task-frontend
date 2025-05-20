import { Filter, Plus, RefreshCcw, Search } from "lucide-react";
import { useParams } from "react-router-dom";

import { useCallback, useEffect, useRef, useState } from "react";
import Helper from "../../../../../constant/Helper";
import useGetProjectTasks from "../../../../../hook/Api/project/useGetProjectTasks";
import {
  mockStatuses,
  mockUsers,
  type FilterState,
  type SortKey,
} from "../../Kanban/components/header/type";
import FilterDropList from "../../Kanban/components/header/FilterDropList";
import { AnimatePresence } from "framer-motion";
import { priorityColorMap, statusColorMap } from "./list.type";

interface Task {
  id: string;
  name: string;
  employeeName: string;
  startTime: string;
  expirationDate: string;
  priority: string;
  status: string;
}

export default function Component() {
  const [filters, setFilters] = useState<FilterState>({
    users: [],
    author: null,
    statuses: [],
    isExpiration: false,
    startTime: null,
    expirationDate: null,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const { data, refetch, isFetching } = useGetProjectTasks({
    projectId: id || "",
    ...(filters.users && { employeeId: filters.users }),
    ...(filters.author && { authorId: filters.author }),
    ...(filters.statuses && { status: filters.statuses }),
    ...(filters.isExpiration && { isExpiration: filters.isExpiration }),
    ...(filters.startTime && { startTime: filters.startTime }),
    ...(filters.expirationDate && { expirationDate: filters.expirationDate }),
  });

  const handleUserSelect = useCallback((userId: string) => {
    setFilters((prev) => ({
      ...prev,
      users: prev.users.includes(userId)
        ? prev.users.filter((id) => id !== userId)
        : [...prev.users, userId],
    }));
  }, []);

  const handleAuthorSelect = useCallback((userId: string | null) => {
    setFilters((prev) => ({ ...prev, author: userId }));
  }, []);

  const handleStatusSelect = useCallback((statusId: string) => {
    const upperCaseStatusId = statusId.toUpperCase();
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(upperCaseStatusId)
        ? prev.statuses.filter((id) => id !== upperCaseStatusId)
        : [...prev.statuses, upperCaseStatusId],
    }));
  }, []);

  const handleExpirationToggle = useCallback((isChecked: boolean) => {
    setFilters((prev) => ({ ...prev, isExpiration: isChecked }));
  }, []);

  // Search Handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRefreshData = () => {
    refetch();
  };

  const handleDateChange = useCallback(
    (field: "startTime" | "expirationDate", date: String | null) => {
      setFilters((prev) => ({
        ...prev,
        [field]: date,
      }));
    },
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFilterOpen((prev) => !prev);
  };

  // State for column widths
  const [columnWidths, setColumnWidths] = useState({
    id: 50,
    title: 200,
    action: 120,
    schedule: 120,
    priority: 120,
    status: 120,
    actions: 50,
  });

  type ColumnKey = keyof typeof columnWidths;

  // Track resizing state
  const resizingRef = useRef<ColumnKey | null>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Start resizing
  const handleMouseDown = (key: ColumnKey) => (e: React.MouseEvent) => {
    resizingRef.current = key;
    startXRef.current = e.clientX;
    startWidthRef.current = columnWidths[key];
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle resizing
  const handleMouseMove = (e: any) => {
    if (resizingRef.current) {
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(30, startWidthRef.current + delta); // Minimum width 30px
      const key = resizingRef.current as keyof typeof columnWidths;
      setColumnWidths((prev) => ({
        ...prev,
        [key]: newWidth,
      }));
    }
  };

  // Stop resizing
  const handleMouseUp = () => {
    resizingRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  function getStatusColor(status: string): string {
    return statusColorMap[status.toUpperCase()] || "#38bdf8";
  }

  function getPriorityColor(priority: string): string {
    return priorityColorMap[priority.toUpperCase()] || "#38bdf8";
  }

  return (
    <div className="min-h-screen bg-[#0F0F35] text-gray-200">
      {/* Task Table */}
      <div className="min-h-screen bg-[#0F0F35] text-gray-300 p-4 rounded-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="p-1 hover:bg-[#1a1940] rounded"
              onClick={handleRefreshData}
              disabled={isFetching}
            >
              <RefreshCcw
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isFetching ? "animate-spin" : ""
                }`}
              />
            </button>
            <button className="p-1 hover:bg-[#1a1940] rounded">
              <Search className="w-4 h-4 text-gray-400" />
            </button>
            <div className="relative mr-6" ref={filterRef}>
              <button
                className="p-1 hover:bg-[#1a1940] rounded"
                onClick={toggleFilter}
                aria-haspopup="true"
                aria-expanded={isFilterOpen}
              >
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <FilterDropList
                    filters={filters}
                    users={mockUsers}
                    statuses={mockStatuses}
                    onClose={() => setIsFilterOpen(false)}
                    onUserSelect={handleUserSelect}
                    onAuthorSelect={handleAuthorSelect}
                    onStatusSelect={handleStatusSelect}
                    onExpirationToggle={handleExpirationToggle}
                    onDateChange={handleDateChange}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Status:</span>
            <button className="px-2 py-1 bg-[#111111] rounded text-xs text-gray-300">
              All <span className="ml-1">▼</span>
            </button>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-xs text-gray-400 bg-[#0A061F]">
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.id }}
                >
                  ID
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("id")}
                  />
                </th>
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.title }}
                >
                  TITLE
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("title")}
                  />
                </th>
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.action }}
                >
                  ASSIGNED
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("action")}
                  />
                </th>
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.schedule }}
                >
                  DEADLINE
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("schedule")}
                  />
                </th>
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.priority }}
                >
                  PRIORITY
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("priority")}
                  />
                </th>
                <th
                  className="py-2 px-2 border border-[#3b3d4f] relative"
                  style={{ width: columnWidths.status }}
                >
                  STATUS
                  <div
                    className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-[#60c9fa]"
                    onMouseDown={handleMouseDown("status")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((task: Task) => (
                <tr
                  key={task.id}
                  className="hover:bg-[#1a1940] transition-colors"
                >
                  <td
                    className="py-2 px-2 text-gray-400 text-sm border border-[#3b3d4f]"
                    style={{ width: columnWidths.id }}
                  >
                    {task.id}
                  </td>
                  <td
                    className="py-2 px-2 border border-[#3b3d4f]"
                    style={{ width: columnWidths.title }}
                  >
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 text-xs">▶</button>
                      <span className="text-sm">{task.name}</span>
                    </div>
                  </td>
                  <td
                    className="py-2 px-2 text-center border border-[#3b3d4f]"
                    style={{ width: columnWidths.action }}
                  >
                    {/* {task.actionRequired && (
                      <div className="w-4 h-4 rounded-full bg-[#4646a4]" />
                    )} */}
                    {task.employeeName}
                  </td>
                  <td
                    className="py-2 px-2 text-sm text-center border border-[#3b3d4f]"
                    style={{ width: columnWidths.schedule }}
                  >
                    {Helper.formatDateTime(task.expirationDate)}
                  </td>
                  <td
                    className="py-2 px-2 text-center border border-[#3b3d4f]"
                    style={{ width: columnWidths.priority }}
                  >
                    <div className="flex items-center justify-center gap-1 text-gray-400">
                      <span className="text-xs">◆</span>
                      <span
                        className="px-2 py-0.5 text-xs rounded"
                        style={{
                          backgroundColor: getPriorityColor(task.priority),
                          color: "#ffffff",
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </td>
                  <td
                    className="py-2 px-2 text-center border border-[#3b3d4f]"
                    style={{ width: columnWidths.status }}
                  >
                    {task.status && (
                      <span
                        className="px-2 py-0.5 text-xs rounded"
                        style={{
                          backgroundColor: getStatusColor(task.status),
                          color: "#ffffff",
                        }}
                      >
                        {task.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <button className="text-[#38bdf8] hover:text-[#60c9fa] transition-colors flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>New task</span>
          </button>
        </div>
      </div>
    </div>
  );
}
