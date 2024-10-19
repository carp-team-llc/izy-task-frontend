import { X } from "lucide-react";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useCreateTaskList from "../../hook/Api/task/TaskManager/useCreateTaskList"; 
import { notifyError, notifySuccess } from "../../component/toastify/Toastify";
import SingleUpload from "../../component/upload/SingleUpload";

interface CreateNewTaskModalProps {
  onClose: () => void;
}

const CreateTaskList: React.FC<CreateNewTaskModalProps> = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string>(""); // Single image URL
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const { onCreate, isError, error } = useCreateTaskList(); // Sử dụng hook useCreateTask

  // Handle a single image URL from the Upload component
  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!taskName || !taskDescription) {
        notifyError("Vui lòng điền đầy đủ thông tin task.");
        return;
      }

      const formData = {
        name: taskName,
        description: taskDescription,
        avatar: imageUrl, // Use single image
      };

      const response = await onCreate(formData);
      if (response) {
        notifySuccess(response.message);
        onClose();
      }
    } catch (err) {
      console.error("Lỗi khi tạo task:", err);

      if (err instanceof Error) {
        if ((err as any).response && (err as any).response.data) {
          notifyError(`Lỗi từ API: ${(err as any).response.data.message}`);
        } else {
          notifyError(`Lỗi: ${err.message}`);
        }
      } else {
        notifyError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  const handleSubmitWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút bấm
    handleSubmit(event as any); // Gọi hàm handleSubmit với đối số kiểu bất kỳ
  };

  const handleFileLoding = (isLoding: boolean) => {
    setIsUploadLoading(isLoding);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div
        className="bg-[#1E2139] rounded-lg w-full scrollbar-hide p-3"
        style={{ maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">New Task List</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-3 space-y-3">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-3 text-white">
              Name Task List
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-white">
              Description:
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description:"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400 h-12 resize-none"
            />
          </div>
          <div>
            <SingleUpload
              onUploadComplete={handleUploadComplete}
              uploadLoading={handleFileLoding}
            />
          </div>

          {isError && <div className="text-red-500">{error?.message}</div>}
        </div>

        <div className="p-3 flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitWrapper}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            disabled={isUploadLoading} // Disable if still uploading
          >
            {isUploadLoading ? "Waiting..." : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskList;
