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
  const [uploadedDocumentUrls, setUploadedDocumentUrls] = useState<string[]>(
    []
  );
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isDocumentUpload, setIsDocumentUpload] = useState<boolean>(true);

  const documentExtensions: string[] = [".pdf", ".txt"];
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

      const hasDocuments = newFiles.some((file) => isDocumentFile(file.name));
      const hasImages = newFiles.some((file) => isImageFile(file.name));

      if (!hasDocuments && !hasImages) {
        notifyError(
          "Please upload valid document (.pdf, .txt) or image files."
        );
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setIsDocumentUpload(hasDocuments);

      setIsUploading(true);
      const newUploadedDocumentUrls: string[] = [];
      const newUploadedImageUrls: string[] = [];

      try {
        for (const file of newFiles) {
          const response = await onUpload({ file });
          if (response) {
            if (isDocumentFile(file.name)) {
              newUploadedDocumentUrls.push(response.data?.data);
            } else if (isImageFile(file.name)) {
              newUploadedImageUrls.push(response.data?.data);
            }
          }
        }

        setUploadedDocumentUrls(newUploadedDocumentUrls);
        setUploadedImageUrls(newUploadedImageUrls);
        onUploadComplete([...newUploadedDocumentUrls, ...newUploadedImageUrls]);
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

  const handleRemoveUploadedDocument = (index: number) => {
    const removedUrl = uploadedDocumentUrls[index];
    setUploadedDocumentUrls((prevUrls) =>
      prevUrls.filter((_, i) => i !== index)
    );
    handleRemoveFile(
      files.findIndex(
        (file) =>
          isDocumentFile(file.name) && file.name === removedUrl.split("/").pop()
      )
    );
  };

  const handleRemoveUploadedImage = (index: number) => {
    const removedUrl = uploadedImageUrls[index];
    setUploadedImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    handleRemoveFile(
      files.findIndex(
        (file) =>
          isImageFile(file.name) && file.name === removedUrl.split("/").pop()
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

        {uploadedDocumentUrls.length > 0 && (
          <div>
            <ul className="space-y-2">
              <b className="text-purple-600">Uploaded Files: </b>
              {uploadedDocumentUrls.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {file.split("/hehe").pop()}{" "}
                    {/* Display just the file name */}
                  </a>
                  <div>
                    <button
                      onClick={() => handleRemoveUploadedDocument(index)} // Remove document
                      className="text-red-500 ml-2"
                      title="Remove uploaded document"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {uploadedImageUrls.length > 0 && (
          <>
            <Spacing height={10} />
            <b className="text-purple-600 ">Uploaded Images: </b>
            <div className="flex space-x-2 mt-4">
              {uploadedImageUrls.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    className="flex-none w-24 h-24 object-cover border border-white rounded-md "
                    src={file}
                    alt={`Uploaded ${index}`}
                  />
                  <button
                    onClick={() => handleRemoveUploadedImage(index)} // Remove image
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
