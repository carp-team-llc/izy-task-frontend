"use client"

import type React from "react"
import { useState } from "react"
import { FiFileText, FiMoreVertical, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { NavLink } from "react-router-dom"
import Helper from "../../constant/Helper"
import DetailTask from "../../page/Task/DetailTask/DetailTask"
import useRecentTask from "../../hook/Api/task/TaskManager/useRecentTask"
import { motion, AnimatePresence } from "framer-motion"

type TaskListProps = {
  title: string
  showAll?: boolean
}

const RecentTask: React.FC<TaskListProps> = ({ title, showAll = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 10

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const { isLoading, isError, data: tasks, error } = useRecentTask({ where: {}, skip: 0, take: 100 })

  const totalTasks = tasks?.[0]?.recentTask?.length || 0
  const totalPages = Math.ceil(totalTasks / tasksPerPage)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const recentTasks = tasks?.[0]?.recentTask?.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage) || []

  if (isLoading)
    return (
      <div className="bg-[#1a1f37] rounded-lg p-4 mb-3 min-h-[200px] flex items-center justify-center">
        <div className="animate-pulse text-white">Loading tasks...</div>
      </div>
    )

  if (isError)
    return (
      <div className="bg-[#1a1f37] rounded-lg p-4 mb-3 min-h-[200px] flex items-center justify-center">
        <div className="text-red-400">Error loading tasks: {error?.message}</div>
      </div>
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-[#1a1f37] rounded-lg p-4 mb-3 shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        {showAll && (
          <NavLink to="/tasklist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-500 text-sm hover:text-purple-400 transition-colors duration-200"
            >
              Show All
            </motion.button>
          </NavLink>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-12 text-gray-400 text-xs border-b border-gray-700 pb-2">
            <div className="col-span-5 text-left font-medium px-2">Name</div>
            <div className="col-span-2 text-left font-medium px-2">Status</div>
            <div className="col-span-2 text-left font-medium px-2">Last Modified</div>
            <div className="col-span-2 text-left font-medium px-2">Deadline</div>
            <div className="col-span-1 text-right font-medium px-2">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-800">
            {recentTasks.length > 0 ? (
              recentTasks.map((task: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="grid grid-cols-12 text-white text-sm py-3 cursor-pointer hover:bg-[#252a45] rounded-md transition-all duration-200"
                  onClick={() => handleTaskClick(task)}
                >
                  {/* Name */}
                  <div className="col-span-5 flex items-center px-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-md mr-3 flex items-center justify-center text-lg flex-shrink-0">
                      <FiFileText size={16} className="text-gray-400" />
                    </div>
                    <div className="truncate">
                      <span className="block truncate">{task?.task?.name}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center px-2">
                    <div
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${task?.task?.statusColor}20`,
                        color: task?.task?.statusColor,
                      }}
                    >
                      {task?.task?.status}
                    </div>
                  </div>

                  {/* Last Modified */}
                  <div className="col-span-2 flex items-center text-gray-400 px-2 truncate">
                    {Helper.formatEngDate(task?.task?.updatedAt)}
                  </div>

                  {/* Deadline */}
                  <div className="col-span-2 flex items-center text-gray-400 px-2 truncate">
                    {Helper.formatEngDate(task?.task?.expirationDate) || "—"}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-end items-center px-2">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 rounded-full hover:bg-gray-700"
                    >
                      <FiMoreVertical size={16} className="text-gray-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">No recent tasks available</div>
            )}
          </div>
        </div>
      </div>

      {totalTasks > tasksPerPage && (
        <div className="mt-4 bg-[#2a2f47] p-3 rounded-lg flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 text-sm ${
              currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-purple-500 hover:text-purple-400"
            } transition-colors duration-200`}
          >
            <FiChevronLeft size={16} />
            <span>Previous</span>
          </motion.button>

          <span className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 text-sm ${
              currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-purple-500 hover:text-purple-400"
            } transition-colors duration-200`}
          >
            <span>Next</span>
            <FiChevronRight size={16} />
          </motion.button>
        </div>
      )}

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
              <DetailTask task={selectedTask} onClose={closeModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default RecentTask
