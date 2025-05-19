import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { Project } from "../Dashboard.type";

interface UpcomingDeadlinesProps {
  projects: Project[];
  loading: boolean;
}

const DeadlineItem: React.FC<{ project: Project }> = ({ project }) => {
  const daysRemaining = Math.ceil(
    (new Date(project.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const isVerySoon = daysRemaining <= 3;

  return (
    <motion.li
      className={`flex items-center justify-between p-3 rounded-md mb-2 last:mb-0 ${
        isVerySoon
          ? "bg-amber-700/30 border border-amber-600"
          : "bg-[#252c48] hover:bg-[#313a5f]"
      } transition-colors`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p
          className={`font-medium ${
            isVerySoon ? "text-amber-200" : "text-slate-100"
          }`}
        >
          {project.name}
        </p>
        <p
          className={`text-xs ${
            isVerySoon ? "text-amber-300" : "text-slate-400"
          }`}
        >
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </p>
      </div>
      <div
        className={`flex items-center text-sm font-semibold ${
          isVerySoon ? "text-amber-300" : "text-slate-300"
        }`}
      >
        {isVerySoon && (
          <AlertTriangle size={16} className="mr-1 text-amber-400" />
        )}
        {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
      </div>
    </motion.li>
  );
};

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  projects,
  loading,
}) => {
  if (loading) {
    return (
      <div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-3 bg-[#252c48] rounded-md mb-2 h-[60px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (projects?.length === 0) {
    return (
      <p className="text-slate-400 text-center py-4">
        No upcoming deadlines in the next 7 days.
      </p>
    );
  }

  return (
    <ul
      className="space-y-2 max-h-[300px] overflow-y-auto pr-1
                  scrollbar-thin scrollbar-thumb-[#3e4a6e] scrollbar-track-[#252c48]"
    >
      {projects?.map((project) => (
        <DeadlineItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default UpcomingDeadlines;
