import { LinearProgress } from "@mui/material"; // Sử dụng LinearProgress của MUI
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { Project } from "../Dashboard.type";

interface ProjectProgressListProps {
  projects: Project[];
  loading: boolean;
}

const getStatusStyle = (status: Project["status"]) => {
  switch (status) {
    case "ON_TRACK":
      return {
        icon: <TrendingUp size={18} className="text-green-500" />,
        text: "On Track",
        color: "bg-green-500",
      };
    case "AT_RISK":
      return {
        icon: <Activity size={18} className="text-yellow-500" />,
        text: "At Risk",
        color: "bg-yellow-500",
      };
    case "OFF_TRACK":
      return {
        icon: <AlertTriangle size={18} className="text-red-500" />,
        text: "Off Track",
        color: "bg-red-500",
      };
    case "COMPLETED":
      return {
        icon: <CheckCircle2 size={18} className="text-blue-500" />,
        text: "Completed",
        color: "bg-blue-500",
      };
    default:
      return {
        icon: <Activity size={18} className="text-slate-400" />,
        text: "Unknown",
        color: "bg-slate-400",
      };
  }
};

const ProjectProgressItem: React.FC<{ project: Project }> = ({ project }) => {
  const statusStyle = getStatusStyle(project.status);
  const isOverdue =
    new Date(project.deadline) < new Date() && project.status !== "COMPLETED";

  return (
    <motion.li
      className="p-4 bg-[#252c48] rounded-lg mb-3 last:mb-0 hover:bg-[#313a5f] transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-slate-100">{project.name}</h4>
      </div>
      <div className="mb-1">
        <LinearProgress
          variant="determinate"
          value={Number((project.progress * 100).toFixed(2))}
          sx={{
            height: 8,
            borderRadius: 5,
            [`& .MuiLinearProgress-bar`]: {
              backgroundColor: statusStyle.color.replace("bg-", ""), // Extract color for MUI
            },
            backgroundColor: "#3e4a6e", // Softer background for progress
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{(project.progress * 100).toFixed(2)}% Complete</span>
        <span className={`${isOverdue ? "text-red-400 font-semibold" : ""}`}>
          Deadline: {new Date(project.deadline).toLocaleDateString()}
          {isOverdue && " (Overdue)"}
        </span>
      </div>
    </motion.li>
  );
};

const ProjectProgressList: React.FC<ProjectProgressListProps> = ({
  projects,
  loading,
}) => {
  if (loading) {
    return (
      <div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-[#252c48] rounded-lg mb-3 h-[90px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <p className="text-slate-400 text-center py-4">No projects to display.</p>
    );
  }

  return (
    <ul
      className="space-y-3 max-h-[400px] overflow-y-auto pr-2
                  custom-scrollbar"
    >
      {projects.map((project) => (
        <ProjectProgressItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectProgressList;
