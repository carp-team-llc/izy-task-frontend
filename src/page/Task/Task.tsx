import { motion } from "framer-motion"
import TaskHeader from "../../component/header/Header2"
import RecentTask from "../../component/tasklist/RecentTask"
import TaskList from "../../component/tasklist/TaskList"

export default function Task() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen text-white bg-[#111528]"
    >
      <div className="flex-1 p-4 md:p-6 max-w-full">
        <motion.div variants={itemVariants}>
          <TaskHeader />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 grid grid-cols-1 gap-6">
          <TaskList title="Personal Task" showAll />
          <RecentTask title="Recent Task" />
        </motion.div>
      </div>
    </motion.div>
  )
}
