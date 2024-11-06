import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import CommentDetailTask from "../../../component/interactions/CommentDetailTask";
import ShowFiles from "../../../component/ShowFiles/ShowFiles";
import Helper from "../../../constant/Helper";
import useTaskDetail from "../../../hook/Api/task/TaskManager/useTaskDetail";
import Activities from "./component/Activities";
import Description from "./component/Description";
import Editt from "./component/Edit";
import Status from "./component/Status";
import useUpdateTask from "../../../hook/Api/task/TaskManager/useUpdateTask";
import {
  notifyError,
  notifySuccess,
} from "../../../component/toastify/Toastify";

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
  const { data } = useTaskDetail({
    id: task.id,
  });

  const [status, setStatus] = useState<string | null>(null);
  const [statusName, setStatusName] = useState<string | null>(null);
  const [statusColor, setStatusColor] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false); // New state for edit mode

  const [description, setDescription] = useState<string>(data?.body || "");

  const statuses = [
    { status: "1", statusName: "Pending", statusColor: "#FFA500" },
    { status: "2", statusName: "Doing", statusColor: "#007BFF" },
    { status: "3", statusName: "Completed", statusColor: "#28A745" },
  ];
  const { onUpdate } = useUpdateTask();

  const handleUpdate = (isUpdate: boolean) => {
    setIsUpdate(isUpdate);
    setIsEditing(true);
  };
  const handleChangeDescription = (newDescription: string) => {
    setDescription(newDescription);
  };
  const handleChangeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = {
        id: task.id,
        body: description,
        status: status,
        // startTime: startTime ? startTime.toISOString() : "",
        // expirationDate: endTime ? endTime.toISOString() : "",
      };

      const response = await onUpdate(formData);
      if (response) {
        notifySuccess(response.message);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Lỗi khi Update task:", err);

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

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setStatusName(data.statusName);
      setStatusColor(data.statusColor);
      setDescription(data.body || "");
    }
  }, [data]);

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
              <Description
                task={task}
                isUpdate={isUpdate}
                onChangeDescription={handleChangeDescription}
              />
              <div className="border-t border-gray-700 pt-4">
                <h2 className="text-sm font-semibold mb-2">
                  Attachments ({data?.images.length})
                </h2>
                <div className="space-y-2">
                  <ShowFiles urls={data?.images} />
                </div>
              </div>

              <Activities />
            </div>

            <div className="w-1/4 flex flex-col">
              <div className="bg-[#0f0a2a] p-2 space-y-2 text-white">
                <Status
                  task={task}
                  isUpdate={isUpdate}
                  onChangeStatus={handleChangeStatus}
                />
              </div>

              <div className="border-t border-gray-700 p-3 bg-[#0f0a2a] flex justify-end space-x-2">
                <Editt onHandleUpdate={handleUpdate} />
                {isEditing && ( // Show Save button only if editing
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleSubmitWrapper}
                  >
                    Save
                  </button>
                )}
              </div>
              <CommentDetailTask onConmments={data?.comments} id={data?.id} />
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
