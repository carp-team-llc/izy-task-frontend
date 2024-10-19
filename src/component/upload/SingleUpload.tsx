import { Plus, X } from "lucide-react"; // Import the X icon
import React, { useEffect, useState } from "react";
import useUpload from "../../hook/Api/upload/useUpload";
import Spacing from "../common/Spacing";
import { notifyError } from "../toastify/Toastify";

type UploadProps = {
  onUploadComplete: (url: string) => void; // Upload a single image URL
  uploadLoading: any;
};

const SingleUpload: React.FC<UploadProps> = ({ onUploadComplete, uploadLoading }) => {
  const [file, setFile] = useState<File | null>(null); // Handle a single file (image only)
  const { onUpload } = useUpload();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  const imageExtensions: string[] = [".jpg", ".jpeg", ".png", ".gif"];

  const isImageFile = (fileName: string) => {
    return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!isImageFile(selectedFile.name)) {
        notifyError("Please upload a valid image file (.jpg, .jpeg, .png, .gif).");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadFile = async () => {
    if (!file) {
      notifyError("Please choose an image file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const response = await onUpload({ file });
      if (response && response.data?.data) {
        const uploadedUrl = response.data.data;
        setUploadedImageUrl(uploadedUrl);
        onUploadComplete(uploadedUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadedImageUrl("");
  };

  useEffect(() => {
    uploadLoading(isUploading);
  }, [isUploading]);

  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-white">
        Upload Image
      </label>
      <div className="bg-[#2A2F4A] rounded p-3 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="file"
            accept="image/*" // Only accept image files
            onChange={handleAddFile}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-[#1E2139] rounded-lg p-2 hover:bg-opacity-80 cursor-pointer"
          >
            <Plus size={24} />
          </label>
          <div className="bg-[#1E2139] rounded-lg p-2 text-sm">Upload Image</div>
        </div>

        {file && (
          <div className="flex justify-between items-center mb-3">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-8 w-8 mr-2"
            />
            <span className="flex-1 truncate">{file.name}</span>
            <button
              onClick={handleRemoveFile}
              className="text-red-500 ml-2"
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {uploadedImageUrl && (
          <div>
            <Spacing height={10} />
            <div className="text-purple-600">Uploaded Image:</div>
            <div className="mt-4">
              <img
                className="w-24 h-24 object-cover border border-white rounded-md"
                src={uploadedImageUrl}
                alt="Uploaded"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleUploadFile}
          className="bg-blue-500 text-white p-2 rounded-lg mt-3"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default SingleUpload;
