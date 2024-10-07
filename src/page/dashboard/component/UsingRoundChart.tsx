import React, { useEffect, useState } from "react";
import useWeeklyChart from "../../../hook/Api/task/Chart/useWeeklyChart";
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
  const [completedData, setCompletedData] = useState();
  const [lateData, setLateData] = useState();
  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Monday
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6)); // Sunday

    const fromDate = firstDayOfWeek.toISOString(); 
    const toDate = lastDayOfWeek.toISOString(); 

    return { fromDate, toDate };
  };

  const { fromDate, toDate } = getCurrentWeekDates();

  const body: RoundVariables = {
    status: RoundChartData,
    fromDate: RoundFromDate,
    toDate: RoundToDate,
  };

  const { data } = useWeeklyChart(body);
  const statusRoundData = ["LATE", "COMPLETED"];

  const loadRoundData = data?.taskChart;
  const totalCompleted: any = completedData || [];
  const totalLate: any = lateData || [];

  useEffect(() => {
    setRouChartData(statusRoundData);
    setRoundFromdate(fromDate); 
    setRoundTodate(toDate); 

    if (data) {
      const getCompletedData = loadRoundData?.find(
        (task: any) => task.name === "COMPLETED"
      );
      const getLateData = loadRoundData?.find(
        (task: any) => task.name === "LATE"
      );
      setCompletedData(getCompletedData);
      setLateData(getLateData);
    }
  }, [data, fromDate, toDate]);

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
