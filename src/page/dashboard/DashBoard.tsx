import React, { useEffect, useState } from "react";
import Menu from "../../component/menu/Menu";
import Header from "../../component/header/Header";
import BarChartComponents from "../../component/chart/BarChartComponent";
import RoundChart from "../../component/chart/RoundChart";
import UseDailyChart from "../../hook/Api/task/Chart/useDailyChart";

interface TopStatProps {
  title: string;
  subtitle: string;
  value: string;
  bgColor: string;
}

interface NotificationProps {
  name: string;
  action: string;
  time: string;
  avatar: string;
}

interface Variables {
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

const Notification: React.FC<NotificationProps> = ({
  name,
  action,
  time,
  avatar,
}) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg">
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
    <div>
      <p className="text-sm text-white">
        <span className="font-semibold">{name}</span> {action}
      </p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [chartData, setChartData] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState("");

  const body: Variables = {
    status: chartData,
    createdAt: createdAt,
  };

  const { data } = UseDailyChart(body);

  const statusData = ["LATE", "DOING", "CANCEL", "PENDING", "COMPLETED", "NEW"];
  const pickDate = "2024-09-19T10:46:01.538Z";

  const loadData = data?.taskChart;
  const totalData = loadData?.map((task: any) => {
    return {
      name: task?.statusInfo?.name,
      total: task?.total,
    };
  });
  const colorData = loadData?.map((color: any) => {
    return color?.statusInfo?.color;
  });
  const legendData = loadData?.map((legend: any) => {
    return legend?.statusInfo?.name;
  });

  useEffect(() => {
    setChartData(statusData);
    setCreatedAt(pickDate);
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
              <h2 className="text-lg font-semibold mb-4">Total Task: {data?.totalTask}</h2>
            </div>

            <div>
              <BarChartComponents
                data={totalData}
                colors={colorData}
                legends={legendData}
              />
            </div>
          </div>

          {/* Employees */}
          <div className="bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Task</h2>
            <RoundChart></RoundChart>
          </div>

          {/* Project Deliveries */}
          <div className="col-span-2 bg-[#1a1f37] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Project Deliveries</h2>
            <div className="h-40 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 opacity-50 rounded"></div>
            <div className="flex justify-between mt-4 text-xs text-gray-400">
              <span>Oct 2021</span>
              <span>Nov 2021</span>
              <span>Dec 2021</span>
              <span>Jan 2022</span>
              <span>Feb 2022</span>
              <span>Mar 2022</span>
            </div>
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
            <div className="bg-[#1a1f37] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <a href="#" className="text-purple-500 text-sm">
                  View All
                </a>
              </div>
              <div className="space-y-2">
                <Notification
                  name="Ellie"
                  action="joined team developers"
                  time="2 mins ago"
                  avatar="/placeholder.svg?height=40&width=40"
                />
                <Notification
                  name="Jenny"
                  action="joined team HR"
                  time="1 hour ago"
                  avatar="/placeholder.svg?height=40&width=40"
                />
                <Notification
                  name="Adam"
                  action="got employee of the month"
                  time="2 hours ago"
                  avatar="/placeholder.svg?height=40&width=40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
