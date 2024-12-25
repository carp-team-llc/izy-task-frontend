import { Calendar, Clock, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import CustomDropList from "../../../../component/DropList/CustomDropList";
import {
  notifyError,
  notifySuccess,
} from "../../../../component/toastify/Toastify";
import Single from "../../../../component/upload/SingleUpload";
import useCreateProject from "../../../../hook/Api/project/useCreateProject";
import useChooseTaskList from "../../../../hook/Api/task/TaskManager/useChooseTaskList";
interface CreateNewTaskModalProps {
  onClose: () => void;
  taskListId?: string;
  projectId?: string;
}

const CreateProject: React.FC<CreateNewTaskModalProps> = ({
  onClose,
  taskListId,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [estimate, setEstimate] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [taskList, setTaskList] = useState<string>("");
  const [timeWorking, setTimeWorking] = useState("0");

  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const success = useNavigate();

  const { onCreate, isError, error } = useCreateProject();
  const { data: choose } = useChooseTaskList();

  const handleUploadComplete = (urls: string) => {
    setAvatar(urls);
  };

  const calculateEstimate = () => {
    if (startTime && deadline) {
      const duration = deadline.getTime() - startTime.getTime();
      const hours = Math.floor(duration / (1000 * 60 * 60));
      setEstimate(`${hours} giờ`);
    } else {
      setEstimate("");
    }
  };

  useEffect(() => {
    calculateEstimate();
  }, [startTime, deadline]);

  const handleEndTimeChange = (date: Date | null) => {
    if (date && startTime && date < startTime) {
      notifyError("Thời gian kết thúc không thể trước thời gian bắt đầu.");
      return;
    }
    setDeadline(date);
    setEndDatePickerOpen(false);
  };

  const handleSelect = (id: string | number) => {
    setTaskList(id.toString());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!projectName || !projectDescription || !deadline) {
        notifyError("Vui lòng điền đầy đủ thông tin Project.");
        return;
      }

      const formData = {
        name: projectName,
        description: projectDescription,
        avatar: avatar,
        startTime: startTime ? startTime.toISOString() : "",
        deadline: deadline ? deadline.toISOString() : "",
        permission: "",
        member: [],
        tasks: null,
        timeworking: Number(timeWorking),
      };
      const response = await onCreate(formData);
      if (response) {
        notifySuccess(response.message);
        onClose();
        if (taskListId) {
          success("/projectboard");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if ((err as any).response && (err as any).response.data) {
          notifyError(`${(err as any).response.data.message}`);
        } else {
          notifyError(`Lỗi: ${err.message}`);
        }
      } else {
        notifyError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  const handleSubmitWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit(event as any);
  };

  const handleFileLoding = (isLoding: boolean) => {
    setIsUploadLoading(isLoding);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div
        className="bg-[#1E2139] rounded-lg w-full scrollbar-hide p-3"
        style={{ maxWidth: "800px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-3 space-y-3">
          <div className="mb-5">
            <label className="block text-sm font-medium mb-3 text-white">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold mb-2">Description</h2>
            <div className="w-full">
              <ReactQuill
                theme="snow"
                value={projectDescription}
                onChange={setProjectDescription}
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
          <div className="mb-5">
            <label className="block text-sm font-medium mb-3 text-white">
              Time Working
            </label>
            <input
              type="text"
              value={timeWorking}
              onChange={(e) => setTimeWorking(e.target.value)}
              placeholder="Time Working"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400"
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
                    minDate={today}
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
                  value={deadline ? deadline.toLocaleString() : ""}
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
                    selected={deadline}
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
              Add Team
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                {taskListId ? (
                  <input
                    type="text"
                    value={taskListId}
                    placeholder="Add Team"
                    className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-gray-400 pr-10 cursor-pointer"
                    disabled
                  />
                ) : (
                  <CustomDropList
                    options={choose}
                    onSelect={handleSelect}
                    placeholder="Select a Team"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 pt-2">
            <label className="block text-sm font-medium mb-3 text-white">
              Add Member
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                {taskListId ? (
                  <input
                    type="text"
                    value={taskListId}
                    placeholder="Add Member"
                    className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-gray-400 pr-10 cursor-pointer"
                    disabled
                  />
                ) : (
                  <CustomDropList
                    options={choose}
                    onSelect={handleSelect}
                    placeholder="Select a menber"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <Single
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
          >
            {isUploadLoading ? "Waiting..." : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
