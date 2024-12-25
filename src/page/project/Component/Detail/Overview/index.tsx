import { useParams } from "react-router-dom";
import ActivityStream from "../Overview/ActivityStream";
import Metric from "../Overview/Metric";
import ProjectWorkload from "../Overview/ProjectWorkload";
import TodayTask from "../Overview/TodayTask";
import TotalTask from "../Overview/TotalTask";

const OverviewTab = () => {
  const { id } = useParams();
  return (
    <div>
      <Metric projectId={id} />
      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Left Column - Today Task */}
        <TodayTask />

        {/* Right Column - Project Workload */}
        <ProjectWorkload />

        {/* Bottom Left - Activity Stream */}
        <ActivityStream />

        {/* Bottom Right - Total Task */}
        <TotalTask />
      </div>
    </div>
  );
};
export default OverviewTab;
