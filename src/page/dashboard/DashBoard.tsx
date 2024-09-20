import React, { useEffect, useState } from "react";
import Menu from "../../component/menu/Menu";
import Header from "../../component/header/Header";
import BarChartComponents from "../../component/chart/BarChartComponent";
import RoundChart from "../../component/chart/RoundChart";
import UseDailyChart from "../../hook/Api/task/Chart/useDailyChart";
import SimpleLineChart from "../../component/chart/SimpleLineChart";
import UsingRoundChart from "./component/UsingRoundChart";
import NotificationsComponent from "../../component/Notifications/NotificationsComponent";
import UsingNotification from "./component/UsingNotifications";

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
  const pickBarDate = "2024-09-19T10:46:01.538Z";

  const loadBarData = data?.taskChart;
  const totalBarData = loadBarData?.map((task: any) => {
    return {
      name: task?.statusInfo?.name,
      total: task?.total,
    };
  });
  const colorBarData = loadBarData?.map((color: any) => {
    return color?.statusInfo?.color;
  });
  const legendBarData = loadBarData?.map((legend: any) => {
    return legend?.statusInfo?.name;
  });

  useEffect(() => {
    setBarChartData(statusBarData);
    setBarCreatedAt(pickBarDate);
  }, []);

  return (
    <div className="flex bg-[#13172b] min-h-screen text-white ]">
      {/* Sidebar */}
      <div className="mt-[100px]">
        <Menu></Menu>
      </div>

      {/* Main content */}
      <div className="w-full mt-[100px] ml-[20px]">
        {" "}
        <Header></Header>
        <div className="grid grid-cols-3 gap-6 pr-5">
          {/* Teams Strength */}

          <div className="col-span-2 bg-[#1a1f37] rounded-lg p-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-semibold mb-4">Daily Chart</h2>
              <h2 className="text-lg font-semibold mb-4">
                Total Task: {data?.totalTask}
              </h2>
            </div>

            <div>
              <BarChartComponents
                data={totalBarData}
                colors={colorBarData}
                legends={legendBarData}
              />
            </div>
          </div>

          {/* Employees */}
          <div className="bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Task</h2>
            <UsingRoundChart />
          </div>

          {/* Project Deliveries */}
          <div className="col-span-2 bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Project Deliveries</h2>
            <SimpleLineChart></SimpleLineChart>
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
           <UsingNotification></UsingNotification>
          </div>
        </div>
      </div>
    </div>
  );
}
