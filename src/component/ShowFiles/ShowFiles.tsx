import { FileText } from "lucide-react";
import Helper from "../../constant/Helper";
import Spacing from "../common/Spacing";

interface FilesProps {
  urls: string[];
}

const ShowFiles = ({ urls }: FilesProps) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const documentExtensions = [".pdf", ".docx", ".xlsx", ".pptx"];

  const isImage = (url: string) => {
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const isDocument = (url: string) => {
    return documentExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  return (
    <div>
      <div>
        {urls?.filter(isDocument)?.map((url) => (
          <div
            style={{
              marginRight: Helper.normalize(10),
              backgroundColor: "#1EA7FF",
              padding: 5,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FileText size={20} className="mx-2" />
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url.slice(url.lastIndexOf("/") + 1) || "Unknown File"}
            </a>
          </div>
        ))}
      </div>
      <Spacing height={10} />
      <div style={{ borderWidth: 1, width: "80%", justifyContent: "center" }} />
      <Spacing height={10} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {urls?.filter(isImage)?.map((url) => (
          <div style={{ marginRight: Helper.normalize(10) }}>
            <img
              src={url}
              style={{
                width: Helper.normalize(100),
                height: Helper.normalize(100),
                borderRadius: 6,
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowFiles;
