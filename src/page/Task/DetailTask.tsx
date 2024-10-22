import {
  Calendar,
  Clock,
  Edit,
  FileText,
  Flag,
  Image,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface Attachment {
  name: string;
  type: "pdf" | "image";
  url?: string;
}

interface ActivityItem {
  action: string;
  date: string;
}

interface Comment {
  author: string;
  text: string;
  date: string;
}

const DetailTask: React.FC = () => {
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

  const comments: Comment[] = [
    {
      author: "Calangtrang",
      text: "Đây là comment của người dùng",
      date: "2 days ago",
    },
  ];

  return (
    <div className=" text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-[#0f0a2a] rounded-lg overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold text-blue-400">
              Di ngu luc 4h sang let gau
            </h1>
            <p className="text-sm text-gray-400">
              calangtrang • hbhds324h32jb1321v
            </p>
          </div>
          <p className="text-sm text-gray-400">Created at: 10/20/2024</p>
          <button className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1">
          <div className="flex-grow p-6 space-y-6 border-r border-gray-700">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <div className="bg-[#0f0a2a] rounded p-4 h-32"></div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-lg font-semibold mb-2">
                Attachments ({attachments.length})
              </h2>
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-500 text-white rounded p-2"
                  >
                    {attachment.type === "pdf" ? (
                      <FileText size={20} className="mr-2" />
                    ) : (
                      <Image size={20} className="mr-2" />
                    )}
                    <span>{attachment.name}</span>
                    {attachment.type === "image" && attachment.url && (
                      <img
                        src={attachment.url}
                        alt={attachment.name}
                        className="ml-2 w-8 h-8 object-cover rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-lg font-semibold mb-2">Activity</h2>
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      <span className="text-xs">CT</span>
                    </div>
                    <div>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80 flex flex-col">
            <div className="bg-[#0f0a2a] p-6 space-y-4 flex-grow">
              <div className="flex justify-between items-center">
                <span>Status</span>
                <span className="px-2 py-1 bg-green-500 text-white rounded text-sm mr-24">
                  Completed
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Author</span>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <span className="text-xs">C</span>
                  </div>
                  <span>Calangtrang</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-24">Assigned to</span>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <span className="text-xs">C</span>
                  </div>
                  <span>Calangtrang</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-24">Task List</span>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                    <span className="text-xs">1</span>
                  </div>
                  <span>Task list 1</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-24">Team</span>
                <span className="text-gray-400">None</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Project</span>
                <span className="text-gray-400">None</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Start time</span>
                <span className="ml-auto">20/10/2024 - 11:42:32</span>
              </div>
              <div className="flex items-center">
                <Flag size={16} className="mr-2" />
                <span>End time</span>
                <span className="ml-auto">20/10/2024 - 11:42:32</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Estimate</span>
                <span className="ml-auto">240 Hour - 1(0 Day)</span>
              </div>
            </div>

            <div className="border-t border-gray-700 p-4 bg-[#0f0a2a] flex justify-end space-x-2">
              <button className="p-2 bg-blue-500 rounded">
                <Edit size={16} />
              </button>
              <button className="p-2 bg-red-500 rounded">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="border-t border-gray-700">
              <div className="p-6 bg-[#0f0a2a]">
                <h2 className="text-lg font-semibold mb-2">Comments</h2>
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                        <span className="text-xs">C</span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold">
                            {comment.author}
                          </p>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-white">
                              <Edit size={16} />
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        <p className="text-xs text-gray-400">{comment.date}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      <span className="text-xs">C</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-grow bg-[#1a1438] rounded p-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;
