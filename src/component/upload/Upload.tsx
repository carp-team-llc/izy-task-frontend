import React, { useState } from "react";
import { Plus, FileText } from "lucide-react";
import useUpload from "../../hook/Api/upload/UseUpload";

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { onUpload } = useUpload();

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles); // Đảm bảo lưu file với kiểu File
      setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Cập nhật danh sách file
    }
  };
  const handleUpload = async () => {
    const formData = new FormData(); // Tạo FormData
    files.forEach((file) => {
      formData.append("file", file); // Thêm từng file vào FormData
    });

    try {
      await onUpload(formData); // Gửi formData qua hàm upload
    } catch (error) {
      console.error("Upload failed", error);
    }
  };


  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-white">
        Upload File
      </label>
      <div className="bg-[#2A2F4A] rounded p-3 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="file"
            onChange={handleAddFile}
            className="hidden"
            id="file-upload"
            multiple
          />
          <label
            htmlFor="file-upload"
            className="bg-[#1E2139] rounded-lg p-2 hover:bg-opacity-80 cursor-pointer"
          >
            <Plus size={24} />
          </label>
          <div className="bg-[#1E2139] rounded-lg p-2 text-sm">More File</div>
        </div>

        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between">
              <FileText size={20} className="mr-2" />
              <span className="flex-1 truncate">{file.name}</span>
              <span>{file.size}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded-lg mt-3"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
