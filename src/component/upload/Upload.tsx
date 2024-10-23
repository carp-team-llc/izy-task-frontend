import { FileText, Plus, X } from "lucide-react"; // Import the X icon
import React, { useEffect, useState } from "react";
import useUpload from "../../hook/Api/upload/useUpload";
import Spacing from "../common/Spacing";
import { notifyError } from "../toastify/Toastify";

type UploadProps = {
  onUploadComplete: (urls: string[]) => void;
  uploadLoading: any;
};

const Upload: React.FC<UploadProps> = ({ onUploadComplete, uploadLoading }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { onUpload } = useUpload();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const documentExtensions: string[] = [".pdf", ".txt", ".docx"];
  const imageExtensions: string[] = [".jpg", ".jpeg", ".png", ".gif"];

  const isDocumentFile = (fileName: string) => {
    return documentExtensions.some((ext) =>
      fileName.toLowerCase().endsWith(ext)
    );
  };

  const isImageFile = (fileName: string) => {
    return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const handleAddFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);

      const hasValidFiles = newFiles.some(
        (file) => isDocumentFile(file.name) || isImageFile(file.name)
      );

      if (!hasValidFiles) {
        notifyError(
          "Please upload valid document (.pdf, .txt) or image files."
        );
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      setIsUploading(true);
      const newUploadedFiles: string[] = [];

      try {
        for (const file of newFiles) {
          const response = await onUpload({ file });
          if (response) {
            newUploadedFiles.push(response.data?.data);
          }
        }

        setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
        onUploadComplete([...uploadedFiles, ...newUploadedFiles]);
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleRemoveUploadedFile = (index: number) => {
    const removedUrl = uploadedFiles[index];
    setUploadedFiles((prevUrls) =>
      prevUrls.filter((_, i) => i !== index)
    );
    handleRemoveFile(
      files.findIndex(
        (file) => file.name === removedUrl.split("/").pop()
      )
    );
  };

  useEffect(() => {
    uploadLoading(isUploading);
  }, [isUploading]);

  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-white">
        Upload File
      </label>
      <div className="bg-[#2A2F4A] rounded p-3 text-white">
        <div className="flex items-center space-x-2 mb-1">
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
            {isUploading ? "Uploading..." : <Plus size={20} />}
          </label>
          <div className="bg-[#1E2139] rounded-lg p-2 text-sm">More File</div>
        </div>

        {uploadedFiles.length > 0 && (
          <div>
            <ul className="space-y-2">
              <b className="text-purple-600">Uploaded Files: </b>
              {uploadedFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {file.split("/").pop()}{" "}
                    {/* Display just the file name */}
                  </a>
                  <div>
                    <button
                      onClick={() => handleRemoveUploadedFile(index)} // Remove file
                      className="text-red-500 ml-2"
                      title="Remove uploaded file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <>
            <Spacing height={10} />
            <div className="flex space-x-2 mt-4">
              {uploadedFiles
                .filter((file) => isImageFile(file))
                .map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      className="flex-none w-24 h-24 object-cover border border-white rounded-md "
                      src={file}
                      alt={`Uploaded ${index}`}
                    />
                    <button
                      onClick={() => handleRemoveUploadedFile(index)} // Remove image
                      className="absolute top-0 right-0 text-red-500"
                      title="Remove uploaded image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
