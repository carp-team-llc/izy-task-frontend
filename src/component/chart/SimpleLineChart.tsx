import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const achievedData = [5, 7, 6, 4, 7, 6];
const targetData = [3, 5, 5, 3, 5, 6];
const xLabels = [
  'Oct 2021',
  'Nov 2021',
  'Dec 2021',
  'Jan 2022',
  'Feb 2022',
  'Mar 2022',
];

export default function SimpleLineChart() {
  const [chartWidth, setChartWidth] = React.useState(580);
  const [chartHeight, setChartHeight] = React.useState(300);

  React.useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(600, window.innerWidth - 40); // 40px for padding
      setChartWidth(width);
      setChartHeight(width * 300 / 600); // Maintain aspect ratio
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="bg-[#0f172a] p-6 rounded-lg w-full max-w-3xl">
      <h2 className="text-white text-xl font-bold mb-4">Project Deliveries</h2>
      <div className="w-full h-[300px]">
        <LineChart
          width={chartWidth}
          height={chartHeight}
          series={[
            { 
              data: achievedData, 
              label: 'Achieved',
              color: '#ed8936',
              curve: 'natural',
              showMark: false,
            },
            { 
              data: targetData, 
              label: 'Target',
              color: '#9f7aea',
              curve: 'natural',
              showMark: false,
            },
          ]}
          xAxis={[{ 
            scaleType: 'point', 
            data: xLabels,
            tickLabelStyle: {
              angle: 0,
              textAnchor: 'middle',
              fill: '#a0aec0',
              fontSize: 12,
            },
          }]}
          yAxis={[{ 
            min: 0,
            max: 12,
            tickNumber: 7,
            tickLabelStyle: {
              fill: '#a0aec0',
              fontSize: 12,
            },
          }]}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 3,
            },
            '.MuiAreaElement-root': {
              fillOpacity: 0.3,
            },
            '& .MuiChartsAxis-line': {
              stroke: '#4a5568',
            },
            '& .MuiChartsAxis-tick': {
              stroke: '#4a5568',
            },
          }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
              labelStyle: {
                fill: '#a0aec0',
                fontSize: 12,
              },
            },
          }}
        />
      </div>
    </div>
  );
}