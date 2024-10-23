import { Edit, Trash2 } from "lucide-react";
import React from "react";

interface Comment {
  author: string;
  text: string;
  date: string;
}
const CommentDetailTask: React.FC = () => {
  const comments: Comment[] = [
    {
      author: "Calangtrang",
      text: "Đây là comment của người dùng",
      date: "2 days ago",
    },
  ];
  return (
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
                  <p className="text-sm font-semibold">{comment.author}</p>
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
  );
};
export default CommentDetailTask;
