import {
  Calendar,
  ChartLine,
  CircleUser,
  Clock,
  Edit,
  Flag,
  FolderOpenDot,
  LayoutList,
  Trash2,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommentDetailTask from "../../component/interactions/CommentDetailTask";
import Helper from "../../constant/Helper";
import useTaskDetail from "../../hook/Api/task/TaskManager/useTaskDetail";
import ShowFiles from "../../component/ShowFiles/ShowFiles";

interface ActivityItem {
  action: string;
  date: string;
}

interface DetailTaskProps {
  onClose: () => void;
  task: {
    id: string;
    name: string;
    status: string;
    updatedAt: string;
    expirationDate: string;
    description?: string;
  };
}

const DetailTask: React.FC<DetailTaskProps> = ({ onClose, task }) => {
  const activities: ActivityItem[] = [
    { action: "Create task", date: "10 days ago" },
    { action: "Update task", date: "5 days ago" },
    { action: "Update status to: Doing", date: "5 days ago" },
    { action: "Update status to: Completed", date: "2 days ago" },
  ];

  const { data } = useTaskDetail({
    id: task.id,
  });

  const [description, setDescription] = useState(data?.body || "");

  return (
    <div className="text-white max-w-5xl max-h-max mx-auto px-2 py-1.5">
      <div className="bg-[#0f0a2a] rounded-lg overflow-hidden flex flex-col h-[700px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row px-1 pb-1">
            <p className="text-sm text-gray-400">{data?.author?.username}</p>
            <b className="px-1 text-sm" style={{ color: "red" }}>
              {">"}
            </b>
            <p className="text-sm text-gray-400">{data?.name}</p>
          </div>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center p-1 pb-4 w-full border-b border-gray-700">
          <div className="max-w-4xl">
            <div className="flex flex-row items-center">
              <h1 className="text-lg font-semibold text-blue-400">
                {data?.name}
              </h1>
            </div>
            <p className="text-sm text-gray-400">calangtrang</p>
          </div>
          <p className="text-sm text-gray-400 ml-auto">
            Created at: {Helper.formatEngDate(data?.createdAt)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            <div className="flex-grow p-2 space-y-4 border-r border-gray-700 w-3/4">
              <div>
                <h2 className="text-sm font-semibold mb-2">Description</h2>
                <div className="w-full">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    className="bg-[#1a1438] text-white w-full"
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h2 className="text-sm font-semibold mb-2">
                  Attachments ({data?.images.length})
                </h2>
                <div className="space-y-2">
                  <ShowFiles urls={data?.images} />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h2 className="text-sm font-semibold mb-2">Activity</h2>
                <div className="space-y-2">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                        <span className="text-[12px]">CT</span>
                      </div>
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-[12px] text-gray-400">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            </div>

            <div className="w-1/4 flex flex-col">
              <div className="bg-[#0f0a2a] p-3 space-y-4">
                {/* <DropList options={statuses} onSelect={() => {}} /> */}
                <div className="flex justify-between items-center">
                  <ChartLine size={14} className="inline " />
                  <span className="w-20 text-sm mr-2">Status</span>
                  <span className="px-2 py-1 bg-green-500 text-white rounded text-sm ">
                    Completed
                  </span>
                </div>

                <div className="flex items-center">
                  <CircleUser size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Author</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-1">
                      <img
                        src={data?.author?.profile?.avatar}
                        style={{
                          width: Helper.normalize(18),
                          height: "auto",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <span className="text-sm mr-[-30px]">
                      {data?.author.username}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <CircleUser size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Assigned to</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mr-1">
                      <img
                        src={data?.employee?.profile?.avatar}
                        style={{
                          width: Helper.normalize(18),
                          height: "auto",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <span className="text-sm mr-[-30px]">
                      {data?.employee.username}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <LayoutList size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Task List</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-1">
                      <span className="text-[12px]">1</span>
                    </div>
                    <span className="text-sm mr-2">{data?.taskList?.name}</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Team</span>
                  <span className="text-xs text-gray-400 mr-2">
                    {data?.team || "None"}
                  </span>
                </div>

                <div className="flex items-center">
                  <FolderOpenDot size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Project</span>
                  <span className="text-xs text-gray-400 ">
                    {data?.project || "None"}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock size={14} className="mr-2" />
                  <span className="w-20 mr-2">Start time</span>
                  <span className="ml-1">
                    {Helper.formatEngDate(data?.startTime)}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Flag size={14} className="mr-2" />
                  <span className="w-20 mr-2">End time</span>
                  <span className="ml-1">
                    {Helper.formatEngDate(data?.expirationDate)}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Calendar size={14} className="mr-2" />
                  <span className="w-20 mr-2">Estimate</span>
                  <span className="ml-auto">{data?.estimatetime}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 p-3 bg-[#0f0a2a] flex justify-end space-x-2">
                <button className="p-1.5 bg-blue-500 rounded">
                  <Edit size={14} />
                </button>
                <button className="p-1.5 bg-red-500 rounded">
                  <Trash2 size={14} />
                </button>
              </div>
              <CommentDetailTask onConmments={data?.comments} id={data?.id} />
            </div>
          </div>
        </div>
        <React.Fragment>
          <style jsx global>{`
            * {
              scrollbar-width: none;
            }

            *::-webkit-scrollbar {
              display: none;
            }

            *::-webkit-scrollbar-track {
              background: #2d3748;
            }

            *::-webkit-scrollbar-thumb {
              background-color: #4a5568;
              border-radius: 3px;
            }

            .quill {
              height: 200px;
              width: 100%;
            }
            .ql-container {
              height: calc(100% - 42px);
            }
            .ql-editor {
              min-height: 150px;
              overflow-y: visible;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
            }
            .ql-editor p {
              white-space: pre-wrap;
            }
          `}</style>
        </React.Fragment>
      </div>
    </div>
  );
};

export default DetailTask;
