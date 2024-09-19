import React, { useEffect, useState } from "react";
import useWeeklyChart from "../../../hook/Api/task/Chart/useWeeklyChart";
import { colors } from "@mui/material";

interface RoundVariables {
  status: any;
  fromDate: string;
  toDate: string;
}
export default function UsingRoundChart() {
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
  const RoundFromDateData = "2024-09-19T10:46:09.964Z";
  const RoundToDateData = "2024-09-15T15:05:37.627Z";

  const loadRoundData = data?.taskChart;
  const totalRoundData = loadRoundData?.map((task: any) => {
    return {
      name: task?.statusInfo?.name,
      total: task?.total,
    };
  });
  const colorRoundData = loadRoundData?.map((color: any) => {
    return color?.statusInfo?.color;
  });
  useEffect(() => {
    setRouChartData(statusRoundData);
    setRoundFromdate(RoundFromDate);
    setRoundTodate(RoundToDate);
  }, []);
  return <div>UsingRoundChart</div>;
}
