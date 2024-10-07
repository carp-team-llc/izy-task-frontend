import { Calendar, Clock, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Upload from "../../component/upload/Upload";
import useCreateTask from "../../hook/Api/task/TaskManager/useCreateTask"; // Import hook useCreateTask

interface CreateNewTaskModalProps {
  onClose: () => void;
}

const CreateTask: React.FC<CreateNewTaskModalProps> = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [estimate, setEstimate] = useState("");
  const [project, setProject] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const { onCreate, isError, error } = useCreateTask(); // Sử dụng hook useCreateTask

  const handleUploadComplete = (urls: string[]) => {
    setImageUrls(urls);
  };

  const calculateEstimate = () => {
    if (startTime && endTime) {
      const duration = endTime.getTime() - startTime.getTime();
      const hours = Math.floor(duration / (1000 * 60 * 60));
      setEstimate(`${hours} giờ`);
    } else {
      setEstimate("");
    }
  };

  useEffect(() => {
    calculateEstimate();
  }, [startTime, endTime]);

  const handleEndTimeChange = (date: Date | null) => {
    if (date && startTime && date < startTime) {
      alert("Thời gian kết thúc không thể trước thời gian bắt đầu.");
      return;
    }
    setEndTime(date);
    setEndDatePickerOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!taskName || !taskDescription || !endTime) {
        alert("Vui lòng điền đầy đủ thông tin task.");
        return;
      }
      
      const formData = {
        name: taskName,
        body: taskDescription,
        images: imageUrls,
        expirationDate: endTime ? endTime.toISOString() : "",
      };

      const response = await onCreate(formData);
      if (response && response.task) {
        alert(response.message);
        onClose();
      }
    } catch (err) {
      console.error("Lỗi khi tạo task:", err);

      if (err instanceof Error) {
        if ((err as any).response && (err as any).response.data) {
          alert(`Lỗi từ API: ${(err as any).response.data.message}`);
        } else {
          alert(`Lỗi: ${err.message}`);
        }
      } else {
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  const handleSubmitWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút bấm
    handleSubmit(event as any); // Gọi hàm handleSubmit với đối số kiểu bất kỳ
  };

  const handleFileLoding = (isLoding: boolean) => {
    setIsUploadLoading(isLoding)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div
        className="bg-[#1E2139] rounded-lg w-full scrollbar-hide p-3"
        style={{ maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-3 space-y-3">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-3 text-white">
              Task Name
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
              Task Description:
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description:"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400 h-12 resize-none"
            />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-3 text-white">
                Time Start
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={startTime ? startTime.toLocaleString() : ""}
                  readOnly
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10 cursor-pointer"
                  onClick={() => setStartDatePickerOpen(true)}
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() => setStartDatePickerOpen(true)}
                />
                {startDatePickerOpen && (
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => {
                      setStartTime(date);
                      setStartDatePickerOpen(false);
                    }}
                    onClickOutside={() => setStartDatePickerOpen(false)}
                    inline
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-3 text-white">
                End Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={endTime ? endTime.toLocaleString() : ""}
                  readOnly
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10 cursor-pointer"
                  onClick={() => setEndDatePickerOpen(true)}
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={20}
                  onClick={() => setEndDatePickerOpen(true)}
                />
                {endDatePickerOpen && (
                  <DatePicker
                    selected={endTime}
                    onChange={handleEndTimeChange}
                    onClickOutside={() => setEndDatePickerOpen(false)}
                    inline
                  />
                )}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-3 text-white">
                Estimate
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={estimate}
                  readOnly
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10"
                />
                <Clock
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 pt-2">
            <label className="block text-sm font-medium mb-3 text-white">
              Add Task List
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Add Task List"
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white"
                />
              </div>
            </div>
          </div>
          <div>
            <Upload onUploadComplete={handleUploadComplete} uploadLoading={handleFileLoding} />
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
          >
            { isUploadLoading ? "Waiting..." : "Create task" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
