"use client";

import type React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Upload,
  Calendar,
  LayoutGrid,
  BarChart3,
  MoreVertical,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTaskList from "./CreateTaskList";
import usePersonalTaskList from "../../hook/Api/task/TaskManager/useTaskListPagination";
import Helper from "../../constant/Helper";

const TaskList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const variables = {
    where: {},
    skip: 0,
    take: 10,
  };

  const {
    data: tasks,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePersonalTaskList(variables);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mapDataToTasks = tasks.map((task) => {
    return task.data;
  });

  const dataFlatmap = mapDataToTasks.flatMap((task) => {
    return task.taskList;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white p-6 min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="text-indigo-500 animate-spin" />
          <p className="text-lg text-gray-300">Loading tasks...</p>
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white p-6 min-h-screen flex items-center justify-center"
      >
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-lg font-medium">
            Error loading tasks
          </p>
          <p className="text-gray-400 mt-2">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-white p-4 md:p-6 min-h-screen"
    >
      <motion.header
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
      >
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <NavLink
              to="/tasks"
              className="text-indigo-500 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              <span className="sr-only">Back to Tasks</span>
            </NavLink>
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <h1 className="text-xl font-semibold">Task Lists</h1>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-1.5 text-sm flex items-center gap-2 transition-colors duration-200 shadow-lg shadow-indigo-900/20"
          >
            <Plus size={16} />
            <span>Create New Task List</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#2D2D3D] hover:bg-[#3D3D4D] text-white rounded-md px-3 py-1.5 text-sm flex items-center gap-2 transition-colors duration-200"
          >
            <Upload size={16} />
            <span>Import</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Calendar, tooltip: "Calendar View" },
            { icon: LayoutGrid, tooltip: "Grid View" },
            { icon: BarChart3, tooltip: "Analytics" },
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors duration-200 group"
            >
              <item.icon
                size={20}
                className="text-gray-400 group-hover:text-white transition-colors duration-200"
              />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.tooltip}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-[#05051F] text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors duration-200">
                  Name <ChevronUp size={14} className="inline" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors duration-200">
                  Last Modified <ChevronUp size={14} className="inline" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors duration-200">
                  Deadline <ChevronUp size={14} className="inline" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {dataFlatmap.map((task, index) => (
                <motion.tr
                  key={task.id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={() => setHoveredRow(task.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-gray-700 transition-colors duration-200 ${
                    hoveredRow === task.id ? "bg-gray-800" : "bg-[#13172B]"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white whitespace-nowrap"
                  >
                    <NavLink
                      to={`/tasklist/${task.id}`}
                      className="flex items-center gap-3 transition-all duration-200 hover:bg-gray-600/30 rounded-lg"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all duration-200"
                      >
                        <img
                          src={task?.avatar || "/placeholder.svg"}
                          alt={task.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <span>{task.name}</span>
                    </NavLink>
                  </th>
                  <td className="px-6 py-4">
                    {Helper.formatEngDate(task.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    {Helper.formatEngDate(task.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <MoreVertical size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {hasNextPage && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={`relative overflow-hidden ${
                isFetchingNextPage
                  ? "bg-gray-700 text-gray-300"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              } rounded-md px-6 py-2 text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-900/20`}
            >
              {isFetchingNextPage ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Loading more...
                </span>
              ) : (
                "Load More"
              )}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.3 }}
                animate={!isFetchingNextPage ? { x: ["100%", "-100%"] } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <CreateTaskList onClose={handleCloseModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
