import ActivityChart from "../../component/chart/ActivityChart";
import Header2 from "../../component/header/Header2";
import TaskList from "../../component/tasklist/TaskList";
import WeeklyTaskProgress from "../../component/tasklist/WeeklyTaskProgress";

export default function Task() {
  return (
    <div className="flex min-h-screen text-white">
      <div className="flex-1 p-6">
        <Header2></Header2>
        <div className="flex space-x-4">
          <div className="flex-1">
            <TaskList title="Personal Task" showAll />
            <TaskList title="Recent Task" />
          </div>
          <div className="w-72">
            <WeeklyTaskProgress />
            <ActivityChart />
          </div>
        </div>
      </div>
    </div>
  );
}
