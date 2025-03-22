import Header2 from "../../component/header/Header2";
import RecentTask from "../../component/tasklist/RecentTask";
import TaskList from "../../component/tasklist/TaskList";

export default function Task() {
  return (
    <div className="flex min-h-screen text-white">
      <div className="flex-1 p-6">
        <Header2></Header2>
        <div className="flex space-x-4">
          <div className="w-full flex flex-col space-y-4">
            <TaskList title="Personal Task" showAll />
            <RecentTask title="Recent Task" />
          </div>
        </div>
      </div>
    </div>
  );
}
