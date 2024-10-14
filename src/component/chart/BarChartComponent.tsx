import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import Helper from "../../constant/Helper";

type BarChartProps = {
  data?: any,
  colors?: any,
  legends?: any,
}

export default function BarChartComponents({ data, colors, legends }: BarChartProps) {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Bar Chart Column */}
      <div className="flex-1">
        <BarChart
          width={window.innerWidth < 768 ? window.innerWidth - 40 : Helper.normalize(550)}
          height={Helper.normalize(350)} 
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={false} />
          <Bar
            dataKey="total"
            label={({ value }) => (
              <text x={0} y={0} dy={-10} fill="#000" textAnchor="middle">
                {value}
              </text>
            )}
            barSize={50}
            radius={[5, 5, 0, 0]}
          >
            {data?.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors?.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>

      {/* Legend Column */}
      <div className="flex-1 mt-4 md:mt-0 md:ml-4 space-y-4">
        {colors?.map((color: any, index: any) => (
          <div key={index} className="flex items-center mb-2">
            <div style={{ backgroundColor: color }} className="w-6 h-6 mr-2 rounded-sm" />
            <span className="text-sm md:text-base">{legends[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
