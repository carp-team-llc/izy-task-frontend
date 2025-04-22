import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import useTaskDetail from "../../../../hook/Api/task/TaskManager/useTaskDetail";

interface DetailTaskProps {
  task: {
    id: string;
    description?: string;
  };
  isUpdate: boolean;
  onChangeDescription: (description: string) => void;
}

const Description: React.FC<DetailTaskProps> = ({ task, isUpdate, onChangeDescription }) => {
  const { data } = useTaskDetail({ id: task.id });
  const [description, setDescription] = useState<string>("");
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  // Initialize Quill
  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: "snow",
        readOnly: !isUpdate,
        modules: {
          toolbar: isUpdate
            ? [
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
              ]
            : false,
        },
      });

      // Handle change from editor
      quillInstanceRef.current.on("text-change", () => {
        const html = quillInstanceRef.current!.root.innerHTML;
        setDescription(html);
        onChangeDescription(html);
      });
    }
  }, [isUpdate]);

  // Update Quill content when data is fetched
  useEffect(() => {
    if (data?.body && quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = data.body;
      setDescription(data.body);
    }
  }, [data]);

  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">Description</h2>
      <div className="w-full">
        <div
          ref={quillRef}
          className="w-full bg-[#1a1438] text-white rounded-md"
          style={{ minHeight: "150px" }}
        />
      </div>
    </div>
  );
};

export default Description;
