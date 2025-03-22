import { useEffect, useState } from "react";
import BarChartComponents from "../../component/chart/BarChartComponent";
import UseDailyChart from "../../hook/Api/task/Chart/useDailyChart";
import UsingNotification from "./component/UsingNotifications";
import UsingRoundChart from "./component/UsingRoundChart";

interface BarVariables {
  status: any;
  createdAt: string;
}

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
          <div className="col-span-3 flex justify-end">
            <UsingNotification />
          </div>
        </div>
      </div>
    </div>
  );
}
