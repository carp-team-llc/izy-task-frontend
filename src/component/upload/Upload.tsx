import React, { useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import useUpload from "../../hook/Api/upload/useUpload";
import Spacing from "../common/Spacing";

type UploadProps = {
  onUploadComplete: (urls: string[]) => void;
  uploadLoading: any;
};

const Upload: React.FC<UploadProps> = ({ onUploadComplete, uploadLoading }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { onUpload } = useUpload();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please choose at least one file to upload.");
      return;
    }

    setIsUploading(true);
    const newUploadedImageUrls: string[] = [];

    try {
      for (const file of files) {
        const response = await onUpload({ file });
        if (response) {
          newUploadedImageUrls.push(response.data?.data);
        }
      }
      setUploadedImageUrls(newUploadedImageUrls);
      onUploadComplete(newUploadedImageUrls);
      alert("All files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (isUploading) {
      uploadLoading(true);
    } else {
      uploadLoading(false);
    }
  }, [isUploading])

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

        {uploadedImageUrls.length > 0 && (
          <div>
            <Spacing height={10} />
            <ul className="space-y-2">
              <b className="text-purple-600">Images: </b>
              {uploadedImageUrls.map((file, index) => (
                <li key={index} className="flex justify-between">
                  <img
                    className="flex-none w-24 h-24 object-cover border border-white rounded-md"
                    src={file}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded-lg mt-3"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;