import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";

type BarChartProps = {
  data?: any,
  colors?: any,
  legends?: any,
}

export default function ChartsOverviewDemo({ data, colors, legends }: BarChartProps) {
  
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
            {data?.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors?.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Legend Column */}
      <div className="flex-1 mt-[90px] ml-16 space-y-6 ">
        {colors?.map((color: any, index: any) => (
          <div
            key={index}
            className="flex items-center mb-2"
          >
            <div style={{ backgroundColor: color }} className="w-6 h-6 mr-2 rounded-sm" />
            <span>{legends[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
