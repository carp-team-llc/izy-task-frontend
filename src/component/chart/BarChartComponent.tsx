import * as React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Late", total: 35 },
  { name: "Doing", total: 23 },
  { name: "Pending", total: 34 },
  { name: "New", total: 67 },
];

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6"];
const LEGENDS = ["Late", "Doing", "Pending", "New"];

export default function ChartsOverviewDemo() {
  
  return (
    <div className="flex">
      {/* Bar Chart Column */}
      <div className="flex-3">
        <BarChart width={600} height={350} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="total"
            label={({ value }) => (
              <text x={0} y={0} dy={-10} fill="#000" textAnchor="middle">
                {value}
              </text>
            )}
            barSize={70}
            radius={[5, 5, 0, 0]} // Bo tròn các góc của các cột
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Legend Column */}
      <div className="flex-1 mt-[90px] ml-16 space-y-6 ">
        {COLORS.map((color, index) => (
          <div
            key={index}
            className="flex items-center mb-2"
          >
            <div style={{ backgroundColor: color }} className="w-6 h-6 mr-2 rounded-sm" />
            <span>{LEGENDS[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
