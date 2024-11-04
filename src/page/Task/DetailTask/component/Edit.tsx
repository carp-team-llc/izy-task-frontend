import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";

type UpdateProps = {
  onHandleUpdate: (isUpdate: boolean) => void;
};
const Editt: React.FC<UpdateProps> = ({ onHandleUpdate }) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const handleUpdate = () => {
    onHandleUpdate(false)
  };
  return (
    <div className=" p-2 bg-[#0f0a2a] flex justify-end space-x-2">
      <button className="p-1.5 bg-blue-500 rounded" onClick={handleUpdate}>
        <Edit size={14} />
      </button>
      <button className="p-1.5 bg-red-500 rounded">
        <Trash2 size={14} />
      </button>
    </div>
  );
};
export default Editt;
