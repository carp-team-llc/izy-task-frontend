import React from "react";
import useMetric from "../../../../../hook/Api/project/useMetric"; 
import { format } from "date-fns"; 


interface Metric {
  icon: string;
  title: string;
  value: string | number;
  subtext: string;
  change?: string;
}


interface MetricComponentProps {
  projectId: string | undefined;
}

const MetricComponent: React.FC<MetricComponentProps> = ({ projectId }) => {
  const { data, isLoading, isError, error } = useMetric({ projectId });
  const metrics: Metric[] = data
    ? [
        {
          icon: "⏱️",
          title: "Time Spent",
          value: data.timeSpent ? `${data.timeSpent} mins` : "N/A",
          subtext: "Total hours spent on the project",
        },
        {
          icon: "📊",
          title: "Task Spent",
          value: data.taskSpent || "N/A",
          subtext: "Total tasks completed",
        },
        {
          icon: "⌛",
          title: "Total Late",
          value: data.totalLateTask || 0,
          subtext: "Tasks finished late",
          change: "+0% increase today",
        },
        {
          icon: "❌",
          title: "Total Cancel",
          value: data.totalCancelTask || 0,
          subtext: "Tasks canceled",
          change: "+0% increase today",
        },
        {
          icon: "📅",
          title: "Deadline",
          value: data.projectDeadline
            ? format(new Date(data.projectDeadline), "dd/MM/yyyy · hh:mm a")
            : "N/A",
          subtext: "Project deadline",
        },
        {
          icon: "📈",
          title: "Task Estimator",
          value: data.totalTask || "N/A",
          subtext: "Estimated tasks for completion",
        },
      ]
    : [];
// console.log("====>", data)
  return (
    <div>
      {isLoading && <p>Loading metrics...</p>}
      {isError && <p>Error loading metrics: {(error as Error)?.message}</p>}
      {!isLoading && !isError && (
        <div className="grid grid-cols-6 gap-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-[#130b3b] p-3 rounded-lg">
              <div className="flex items-start justify-between mb-1">
                <span className="text-xl">{metric.icon}</span>
                <span className="text-xs text-gray-400">{metric.title}</span>
              </div>
              <div className="text-xl font-bold mb-0.5">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.subtext}</div>
              {metric.change && (
                <div
                  className={`text-xs ${
                    metric.change.includes("+")
                      ? "text-green-400"
                      : "text-red-400"
                  } mt-1`}
                >
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricComponent;
