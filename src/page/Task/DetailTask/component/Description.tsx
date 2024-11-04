import ReactQuill from "react-quill";
import React, { useEffect, useState } from "react";
import useTaskDetail from "../../../../hook/Api/task/TaskManager/useTaskDetail";

interface DetailTaskProps {
  task: {
    id: string;
    description?: string;
  };
  isUpdate: boolean;
}

const Description: React.FC<DetailTaskProps> = ({ task, isUpdate }) => {
  const { data } = useTaskDetail({
    id: task.id,
  });
  const [description, setDescription] = useState<string>(data?.body || "");

  useEffect(() => {
    if (data) {
      setDescription(data.body || "");
    }
  }, [data]);
  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">Description</h2>
      <div className="w-full">
        <ReactQuill
          readOnly={isUpdate}
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
  );
};
export default Description;
