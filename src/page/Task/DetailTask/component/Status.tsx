import {
  Calendar,
  ChartLine,
  CircleUser,
  Clock,
  Flag,
  FolderOpenDot,
  LayoutList,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DropList from "../../../../component/DropList/DropList";
import Helper from "../../../../constant/Helper";
import useTaskDetail from "../../../../hook/Api/task/TaskManager/useTaskDetail";
interface DetailTaskProps {
  task: {
    id: string;
    name: string;
    status: string;
    updatedAt: string;
    expirationDate: string;
    description?: string;
  };
  isUpdate: boolean;
  onChangeStatus: (status: string) => void;
}

const Status: React.FC<DetailTaskProps> = ({
  task,
  isUpdate,
  onChangeStatus,
}) => {
  const { data } = useTaskDetail({
    id: task.id,
  });
  const [status, setStatus] = useState<string | null>(null);
  const statuses = [
    { status: "NEW", statusName: "New", statusColor: "#06a2c9" },
    { status: "DOING", statusName: "Doing", statusColor: "#ff5482" },
    { status: "COMPLETED", statusName: "Completed", statusColor: "#0eb53b" },
    { status: "PENDING", statusName: "Pending", statusColor: "#c99506" },
    { status: "LATE", statusName: "Late", statusColor: "#d92a02" },
    { status: "REVIEW", statusName: "Review", statusColor: "#FF6900" },
    { status: "CANCEL", statusName: "Cancel", statusColor: "#7d7d7d" },
  ];
  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);
  const handleChangeStatus = (newStatus: string) => {
    setStatus(newStatus);
    onChangeStatus(newStatus);
  };

  return (
    <div className="bg-[#0f0a2a] p-6 space-y-6 text-white">
      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <ChartLine size={14} className="mr-2" />
            <span className="w-20 text-sm">Status</span>
          </div>
          <DropList
            defaultStatus={{
              status: status || "",
              statusName: Helper.capitalize(status || "") || "",
              statusColor:
                statuses.find((s) => s.status === (status || "").toUpperCase())
                  ?.statusColor || "",
            }}
            isDisable={isUpdate}
            statuses={statuses}
            onStatusChange={handleChangeStatus}
          />
        </div>

        {/* Author */}
        <div className="flex items-center jjustify-start">
          <div className="flex items-center">
            <CircleUser size={14} className="mr-2" />
            <span className="w-20 text-sm">Author</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2">
              <img
                src={data?.author?.profile?.avatar}
                alt="Author Avatar"
                className="w-5 h-5 rounded-full"
              />
            </div>
            <span className="text-sm">{data?.author.username}</span>
          </div>
        </div>

        {/* Assigned to */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <CircleUser size={14} className="mr-2" />
            <span className="w-20 text-sm">Assigned to</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2">
              <img
                src={data?.employee?.profile?.avatar}
                alt="Employee Avatar"
                className="w-5 h-5 rounded-full"
              />
            </div>
            <span className="text-sm">{data?.employee.username}</span>
          </div>
        </div>

        {/* Task List */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <LayoutList size={14} className="mr-2" />
            <span className="w-20 text-sm">Task List</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-2">
              <span className="text-[12px]">1</span>
            </div>
            <span className="text-sm">{data?.taskList?.name}</span>
          </div>
        </div>

        {/* Team */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <Users size={14} className="mr-2" />
            <span className="w-20 text-sm">Team</span>
          </div>
          <span className="text-xs text-gray-400">{data?.team || "None"}</span>
        </div>

        {/* Project */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <FolderOpenDot size={14} className="mr-2" />
            <span className="w-20 text-sm">Project</span>
          </div>
          <span className="text-xs text-gray-400">
            {data?.project ? data?.project?.name : "None"}
          </span>
        </div>

        {/* Start Time */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <Clock size={14} className="mr-2" />
            <span className="w-20 text-sm">Start time</span>
          </div>
          <span className="text-sm">
            {Helper.formatEngDate(data?.startTime)}
          </span>
        </div>

        {/* End Time */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <Flag size={14} className="mr-2" />
            <span className="w-20 text-sm">End time</span>
          </div>
          <span className="text-sm">
            {Helper.formatEngDate(data?.expirationDate)}
          </span>
        </div>

        {/* Estimate */}
        <div className="flex items-center justify-start">
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span className="w-20 text-sm">Estimate</span>
          </div>
          <span className="text-sm">{data?.estimatetime}</span>
        </div>
      </div>
    </div>
  );
};
export default Status;
