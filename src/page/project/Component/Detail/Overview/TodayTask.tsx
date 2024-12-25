import Helper from "../../../../../constant/Helper";
import useTodayTask from "../../../../../hook/Api/project/useTodayTask";

interface Task {
  id: string;
  name: string;
  startTime: string;
  priority: string;
  statusName: string;
  statusColor: string;
  employee: any;
}
export default function Component() {
  // nhớ sửa nghe cu
  const projectId = "67448f2abee60d40683d398b";
  const today = "2024-11-03T08:05:05.000Z";
  const { data: todayTask, isLoading, isError, } = useTodayTask({projectId, today });
  return (
    <div className="col-span-2 bg-[#130b3b] rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Today Task</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["All", "High", "Medium", "Normal", "Low"].map((filter) => (
          <button
            key={filter}
            className={`text-sm px-3 py-1 rounded whitespace-nowrap ${
              filter === "All" ? "bg-indigo-600" : "bg-[#1f1655] text-gray-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {todayTask?.map((task: Task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-[#1a1147] p-3 rounded"
          >
            <div>
              <h3 className="text-sm mb-1">{task.name}</h3>
              <span className="text-xs text-gray-400">{Helper.formatEngDate(task.startTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded">
                {task.priority}
              </span>
              <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">
                {task.statusName}
              </span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                <img src = {task.employee.profile.avatar} className="rounded-full w-6 h-6 object-cover"></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
