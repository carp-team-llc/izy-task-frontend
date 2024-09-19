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
  const totalCompleted = loadRoundData?.find((task: any) => task.name === "COMPLETED");
  const totalLate = loadRoundData?.find((task: any) => task.name === "LATE");
  
  useEffect(() => {
    setRouChartData(statusRoundData);
    setRoundFromdate(RoundFromDateData);
    setRoundTodate(RoundToDateData);
  }, []);

  return (
    <div>
      <RoundChart 
        total={data?.totalTask} 
        late={totalLate?.total} 
        lateName={totalLate?.statusInfo?.engName}
        lateColor={totalLate?.statusInfo?.color} 
        completed={totalCompleted?.total}
        completedColor={totalCompleted?.statusInfo?.color} 
        completedName={totalCompleted?.statusInfo?.engName} 
      />
    </div>
  );
};

export default UsingRoundChart;
