import { AnimatePresence } from "framer-motion";
import {
  AlertTriangleIcon,
  Clock,
  FolderKanban,
  ListChecks,
} from "lucide-react";

import DailyTaskChart from "./components/DailyTaskChart";
import ProjectProgressList from "./components/ProjectProgressList";
import Section from "./components/Section";
import StatsCard from "./components/StatsCard";
import TaskList from "./components/TaskList";
import UpcomingDeadlines from "./components/UpcomingDeadlines";

import { UseDashboardCurrent } from "../../hook/Api/dashboard/useDashboardCurrent";
import { UseDashboardInfo } from "../../hook/Api/dashboard/useDashboardInfo";
import { UseProjectProgres } from "../../hook/Api/dashboard/useProjectProgres";
import UseDailyChart from "../../hook/Api/task/Chart/useDailyChart";
import UsingRoundChart from "./components/UsingRoundChart";
import { MockDailyChartResponse } from "./Dashboard.type";
import { UseDashboardUpcomming } from "../../hook/Api/dashboard/useDashboardUpcomming";


export default function Dashboard() {

  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - timezoneOffset);
  const resetTime = new Date(localTime.setHours(0, 0, 0, 0));
  const localISOTime = resetTime.toISOString();

  const dailyChartVariable = {
    status: ["NEW", "LATE", "DOING", "CANCEL", "PENDING", "COMPLETED"],
    createdAt: localISOTime,
  };

  const { data: dailyChartData, isLoading } = UseDailyChart(dailyChartVariable);

  const { data: dashboardInfoData, isLoading: infoLoading } = UseDashboardInfo();

  const { data: dashboardCurrentData, isLoading: currenLoading } = UseDashboardCurrent();

  const { data: projectProgresData, isLoading: progresLoading } = UseProjectProgres();

  const { data: dashboardUpcommingData, isLoading: upcommingLoading } = UseDashboardUpcomming();

  return (
    <div className="flex-grow p-4 sm:p-6 bg-[#05051F] rounded-lg text-slate-100 min-h-screen">
      {" "}
      {/* bg-slate-900 */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <StatsCard
            title="Total Projects"
            value={infoLoading ? "..." : dashboardInfoData?.totalProject}
            icon={FolderKanban}
            iconColor="text-purple-400"
          />
          <StatsCard
            title="Active Tasks"
            value={infoLoading ? "..." : dashboardInfoData?.totalTask}
            icon={ListChecks}
            iconColor="text-sky-400"
          />
          <StatsCard
            title="Tasks Due Soon"
            value={infoLoading ? "..." : dashboardInfoData?.soonExpiredTasksCount}
            icon={Clock}
            iconColor="text-amber-400"
          />
          <StatsCard
            title="Overdue Tasks"
            value={infoLoading ? "..." : dashboardInfoData?.expirationTaskCount}
            icon={AlertTriangleIcon}
            iconColor="text-red-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <Section
            title="Daily Task"
            className="lg:col-span-2"
            actions={
              <div className="text-md text-slate-300">
                Total:{" "}
                {isLoading ? "..." : dailyChartData?.totalTask ?? 0}
              </div>
            }
          >
            <DailyTaskChart
              data={dailyChartData as MockDailyChartResponse | null}
              loading={isLoading}
            />
          </Section>

          <Section title="Weekly Task Summary">
            <UsingRoundChart />
          </Section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <Section title="Project Progress">
            <ProjectProgressList
              projects={projectProgresData?.data}
              loading={progresLoading}
            />
          </Section>

          <Section title="Current Tasks">
            <TaskList
              tasks={dashboardCurrentData?.inProgressTasks || []}
              title="In Progress"
              loading={currenLoading}
              icon={<Clock size={20} className="text-blue-400" />}
            />
            <div className="mt-4">
              {" "}
              {/* Spacer */}
              <TaskList
                tasks={dashboardCurrentData?.lateTasks || []}
                title="Late Tasks"
                loading={currenLoading}
                icon={<AlertTriangleIcon size={20} className="text-red-400" />}
              />
            </div>
          </Section>

          <Section
            title="Upcoming Deadlines"
            className="md:col-span-2 xl:col-span-1"
          >
            <UpcomingDeadlines
              projects={dashboardUpcommingData?.data || []}
              loading={upcommingLoading}
            />
          </Section>
        </div>
      </AnimatePresence>
    </div>
  );
}
