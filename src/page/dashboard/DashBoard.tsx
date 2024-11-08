import React, { useEffect, useState } from "react";
import BarChartComponents from "../../component/chart/BarChartComponent";
import SimpleLineChart from "../../component/chart/SimpleLineChart";
import UseDailyChart from "../../hook/Api/task/Chart/useDailyChart";
import UsingNotification from "./component/UsingNotifications";
import UsingRoundChart from "./component/UsingRoundChart";

interface TopStatProps {
  title: string;
  subtitle: string;
  value: string;
  bgColor: string;
}
interface BarVariables {
  status: any;
  createdAt: string;
}

const TopStat: React.FC<TopStatProps> = ({
  title,
  subtitle,
  value,
  bgColor,
}) => (
  <div className={`p-4 rounded-lg ${bgColor}`}>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{subtitle}</p>
    <p className="text-xs mt-2 text-gray-500">{value}</p>
  </div>
);

export default function Dashboard() {
  const [BarChartData, setBarChartData] = useState<string[]>([]);
  const [BarCreatedAt, setBarCreatedAt] = useState("");
  const pickBarDate = new Date().toISOString();
  const body: BarVariables = {
    status: BarChartData,
    createdAt: BarCreatedAt,
  };

  const { data } = UseDailyChart(body);

  const statusBarData = [
    "LATE",
    "DOING",
    "CANCEL",
    "PENDING",
    "COMPLETED",
    "NEW",
  ];

  const loadBarData = data?.taskChart;
  const totalBarData = loadBarData?.map((task: any) => {
    return {
      name: task?.statusInfo?.engName,
      total: task?.total,
    };
  });
  const colorBarData = loadBarData?.map((color: any) => {
    return color?.statusInfo?.color;
  });
  const legendBarData = loadBarData?.map((legend: any) => {
    return legend?.statusInfo?.engName;
  });

  useEffect(() => {
    setBarChartData(statusBarData);
    setBarCreatedAt(pickBarDate);
  }, []);

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      {/* You can add your Sidebar component here */}

      {/* Main content */}
      <div className="flex-grow p-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Teams Strength */}
          <div className="col-span-2 bg-[#1a1f37] rounded-lg p-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-4">Daily Chart</h2>
              <h2 className="text-lg font-semibold mb-4">
                Total Task: {data?.totalTask}
              </h2>
            </div>
            {data?.totalTask === 0 ? (
              <div className="flex items-center justify-center h-[calc(100%-64px)]">
                <p className="text-lg text-gray-400 text-center">
                  No task available for this day
                </p>
              </div>
            ) : (
              <BarChartComponents
                data={totalBarData}
                colors={colorBarData}
                legends={legendBarData}
              />
            )}
          </div>

          {/* Employees */}
          <div className="bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Task</h2>
            <UsingRoundChart />
          </div>

          {/* Project Deliveries */}
          <div className="col-span-2 bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Project Deliveries</h2>
            <SimpleLineChart />
          </div>

          {/* Top 10 and Notifications */}
          <div className="space-y-6">
            <TopStat
              title="Top 10"
              subtitle="Position in Dribble"
              value="24% increase from last week"
              bgColor="bg-orange-100"
            />
            <TopStat
              title="26"
              subtitle="New Employees Onboarded"
              value="15% increase from last month"
              bgColor="bg-blue-100"
            />
            <TopStat
              title="500"
              subtitle="New Clients Approached"
              value="5% increase from last week"
              bgColor="bg-blue-100"
            />
            <UsingNotification />
          </div>
        </div>
      </div>
    </div>
  );
}
