import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Skeleton } from "@mui/material";

interface WeeklyTaskSummaryProps {
  data: { label: string; value: number; color: string }[];
  loading: boolean;
}

const WeeklyTaskSummary: React.FC<WeeklyTaskSummaryProps> = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Skeleton
        variant="circular"
        width={200}
        height={200}
        animation="wave"
        className="bg-slate-700 rounded-full mx-auto"
      />
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px]">
        <p className="text-lg text-slate-400 text-center">No weekly data.</p>
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", height: 250 }}
      className="flex justify-center items-center"
    >
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 270,
            cx: 125, // Adjust to center based on actual component width
            cy: 125, // Adjust to center
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -10, color: "gray" },
          },
        ]}
        slotProps={{
          legend: {
            hidden: true, 
            labelStyle: { fill: "#cbd5e1" },
            position: { vertical: "bottom", horizontal: "middle" },
          },
        }}
        // width={250} // Set fixed width for the chart container
        // height={250} // Set fixed height for the chart container
        sx={{
          "& .MuiChartsLegend-series text": {
            fill: "#cbd5e1 !important", // slate-300
          },
        }}
      />
    </div>
  );
};

export default WeeklyTaskSummary;
