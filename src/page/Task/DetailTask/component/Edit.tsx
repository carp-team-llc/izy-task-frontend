import { Edit, Trash2 } from "lucide-react";
import React from "react";

type UpdateProps = {
  onHandleUpdate: (isUpdate: boolean) => void;
  onHandleDelete: () => void;
};

const Editt: React.FC<UpdateProps> = ({ onHandleUpdate, onHandleDelete }) => {
  return (
    <div className="p-2 bg-[#0f0a2a] flex justify-end space-x-2">
      {/* Nút chỉnh sửa */}
      <button className="p-1.5 bg-blue-500 rounded" onClick={() => onHandleUpdate(false)}>
        <Edit size={14} />
      </button>

      {/* Nút xóa */}
      <button className="p-1.5 bg-red-500 rounded" onClick={onHandleDelete}>
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default Editt;
