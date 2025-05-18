import { Skeleton } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MockDailyChartResponse } from "../Dashboard.type";

interface DailyTaskChartProps {
  data: MockDailyChartResponse | null;
  loading: boolean;
}

const DailyTaskChart: React.FC<DailyTaskChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        height={350}
        animation="wave"
        className="bg-slate-700 rounded-lg w-full"
      />
    );
  }

  if (!data || data.totalTask === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] rounded-lg">
        <p className="text-lg text-slate-400 text-center">
          No task data available for this period.
        </p>
      </div>
    );
  }

  const chartData = data.taskChart.map((task) => ({
    status: task.statusInfo.engName,
    count: task.total,
    color: task.statusInfo.color,
  }));

  return (
    <div className="w-full h-[300px] rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
        >
          <XAxis
            dataKey="status"
            label={{
              value: "Task Status",
              position: "bottom",
              fill: "#e2e8f0",
              dy: 20,
            }}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            stroke="#64748b"
          />
          <YAxis
            label={{
              value: "Total Tasks",
              angle: -90,
              position: "insideLeft",
              fill: "#e2e8f0",
              dx: -10,
            }}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            stroke="#64748b"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "0.375rem",
            }}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#cbd5e1" }}
          />
          <Bar dataKey="count" name="Total Tasks" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyTaskChart;
