import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  Flag,
  Image,
  Trash2,
  X,
  ChartLine,
  CircleUser,
  LayoutList,
  Users,
  FolderOpenDot,
} from "lucide-react";
import CommentDetailTask from "../../component/interactions/CommentDetailTask";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useTaskDetail from "../../hook/Api/task/TaskManager/useTaskDetail";
import Helper from "../../constant/Helper";

interface Attachment {
  name: string;
  type: "pdf" | "image";
  url?: string;
}

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
  const [attachments, setAttachments] = useState<Attachment[]>([
    { name: "Tai lieu nghiep vu task.pdf", type: "pdf" },
    {
      name: "image1.jpg",
      type: "image",
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7bCG0QR00TvLp9T9RmCtn7g25QlPVn.png",
    },
  ]);

  const activities: ActivityItem[] = [
    { action: "Create task", date: "10 days ago" },
    { action: "Update task", date: "5 days ago" },
    { action: "Update status to: Doing", date: "5 days ago" },
    { action: "Update status to: Completed", date: "2 days ago" },
  ];

  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const { data } = useTaskDetail({
    id: task.id,
  });

  return (
    <div className="text-white max-w-4xl mx-auto">
      <div className="bg-[#0f0a2a] rounded-lg overflow-hidden  flex flex-col h-[80vh]">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <div>
            <h1 className="text-lg font-semibold text-blue-400">
              {data?.name || "Di ngu luc 4h sang let gau"}
            </h1>
            <p className="text-sm text-gray-400">calangtrang</p>
          </div>
          <p className="text-sm text-gray-400">
            Created at: {Helper.formatEngDate(data?.createdAt)}
          </p>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            <div className="flex-grow p-2 space-y-4 border-r border-gray-700 w-3/4">
              <div>
                <h2 className="text-sm font-semibold mb-2">Description</h2>
                <div className="w-full">
                  <ReactQuill
                    theme="snow"
                    value={data?.body}
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
                  Attachments ({attachments.length})
                </h2>
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-500 text-white rounded p-1.5 text-sm"
                    >
                      {attachment.type === "pdf" ? (
                        <FileText size={16} className="mr-2" />
                      ) : (
                        <Image size={16} className="mr-2" />
                      )}
                      <span>{attachment.name}</span>
                      {attachment.type === "image" && attachment.url && (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="ml-2 w-6 h-6 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
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
              </div>
            </div>

            <div className="w-1/4 flex flex-col">
              <div className="bg-[#0f0a2a] p-3 space-y-4">
                <div className="flex justify-between items-center">
                <ChartLine size={14} className="inline " />
                  <span className="ml-[-42px]">Status</span>
                  <span className="px-2 py-1 bg-green-500 text-white rounded text-sm ">
                    
                    Completed
                  </span>
                </div>

                <div className="flex items-center">
                <CircleUser size={14} className="mr-2" />
                  <span className="w-20 text-sm mr-2">Author</span>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-1">
                      <span className="text-[12px]">C</span>
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
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center mr-1">
                      <span className="text-[12px]">C</span>
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
                    <span className="text-sm mr-2">{data?.taskList.name}</span>
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
              <CommentDetailTask onConmments={data?.comments} />
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default DetailTask;
