import React, { useEffect, useState } from "react";
import useWeeklyChart from "../../../hook/Api/task/Chart/useWeeklyChart";
import { colors } from "@mui/material";
import RoundChart from "../../../component/chart/RoundChart";

interface RoundVariables {
  status: any;
  fromDate: string;
  toDate: string;
}
const UsingRoundChart = () => {
  const [RoundChartData, setRouChartData] = useState<string[]>([]);
  const [RoundFromDate, setRoundFromdate] = useState("");
  const [RoundToDate, setRoundTodate] = useState("");

  const body: RoundVariables = {
    status: RoundChartData,
    fromDate: RoundFromDate,
    toDate: RoundToDate,
  };
  const { data } = useWeeklyChart(body);
  const statusRoundData = ["LATE", "COMPLETED"];
  const RoundFromDateData = "2024-09-15T15:05:37.627Z";
  const RoundToDateData = "2024-09-19T10:46:09.964Z";

  const loadRoundData = data?.taskChart;
  const totalRoundData = loadRoundData?.map((task: any) => {
    return {
      name: task?.statusInfo?.name,
      engName: task?.statusInfo?.engName,
      total: task?.total,
      color: task?.statusInfo?.color,
    };
  });

  const totalCompleted = totalRoundData[0]
  const totalLate = totalRoundData[1]
  
  useEffect(() => {
    setRouChartData(statusRoundData);
    setRoundFromdate(RoundFromDateData);
    setRoundTodate(RoundToDateData);
  }, []);

  return (
    <div>
      <RoundChart completedName={totalCompleted?.engName} lateName={totalLate?.engName} total={data?.totalTask} completed={totalCompleted?.total} late={totalLate?.total} completedColor={totalCompleted?.color} lateColor={totalLate?.color} />
    </div>
  );
};

export default UsingRoundChart;
