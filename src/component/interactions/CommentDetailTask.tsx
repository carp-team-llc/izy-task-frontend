import { ArrowUp, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Helper from "../../constant/Helper";
import useComments from "../../hook/Api/comments/useComments"; // Import your hook
import { UseViewAllComments } from "../../hook/Api/comments/useViewAllComments";
import { useDetailProfile } from "../../hook/Api/profile/useDetailProfile";
import { useAuth } from "../../services/authContext";
import { notifyError } from "../toastify/Toastify";

const CommentDetailTask = ({ id }: any) => {
  const { onComment } = useComments();

  const { UserId } = useAuth();
  const { data } = useDetailProfile(UserId || "");
  const [newComment, setNewComment] = useState<string>("");

  const { data: Comments, onLoadComments } = UseViewAllComments();
  const handleLoadComments = async () => {
    if (!id) return;

    try {
      await onLoadComments({ taskId: id });
    } catch (error) {
      notifyError("Failed to load comments");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const taskId = id || "";
    const commentParams = {
      content: newComment,
      taskId,
    };

    try {
      await onComment(commentParams);
      setNewComment("");
    } catch (error) {
    }
  };

  useEffect(() => {
    if (id) {
      handleLoadComments();
    }
  }, [id]);

  return (
    <div className="border-t border-gray-700 overflow-y-auto scrollbar-hide">
      <div className="p-4 bg-[#0f0a2a]">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {Comments?.data?.map((comment: any, index: any) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={
                    comment?.user?.profile?.avatar ||
                    "https://i0.wp.com/catcaresolutions.com/wp-content/uploads/2020/12/cute-cat-with-yellow-headband-on.png?fit=1000%2C1500&ssl=1"
                  }
                  alt="User avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">
                    {comment?.user?.username}
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
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {Helper.formatEngDate(comment?.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div className="relative flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <img
                src={
                  data?.data?.avatar ||
                  "https://i0.wp.com/catcaresolutions.com/wp-content/uploads/2020/12/cute-cat-with-yellow-headband-on.png?fit=1000%2C1500&ssl=1"
                }
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-[#1a1438] rounded-full p-2 text-sm pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="absolute right-5 text-gray-400 hover:text-white"
              onClick={handleCommentSubmit}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetailTask;
