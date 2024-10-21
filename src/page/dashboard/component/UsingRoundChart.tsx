import { useEffect, useMemo, useState } from "react";
import RoundChart from "../../../component/chart/RoundChart";
import useWeeklyChart from "../../../hook/Api/task/Chart/useWeeklyChart";

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

    currentDate.setHours(0, 0, 0, 0);

    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const fromDate = firstDayOfWeek.toISOString();
    const toDate = lastDayOfWeek.toISOString();

    return { fromDate, toDate };
  };

  const { fromDate, toDate } = useMemo(() => getCurrentWeekDates(), []);

  const body: RoundVariables = {
    status: RoundChartData,
    fromDate: RoundFromDate,
    toDate: RoundToDate,
  };

  const statusRoundData = ["LATE", "COMPLETED"];

  const { data } = useWeeklyChart(body);

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
