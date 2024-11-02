import React, { useState, useEffect } from "react";

type Status = {
  status: string;
  statusName: string;
  statusColor: string;
};

type StatusDroplistProps = {
  defaultStatus: Status;
  statuses: Status[];
  onStatusChange: (statusKey: string) => void;
  isDisable: boolean;
};

const DropList: React.FC<StatusDroplistProps> = ({
  defaultStatus,
  statuses,
  onStatusChange,
  isDisable,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Status>(defaultStatus);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Cập nhật selectedStatus khi defaultStatus thay đổi
  useEffect(() => {
    setSelectedStatus(defaultStatus);
  }, [defaultStatus]);

  const handleStatusSelect = (status: Status) => {
    setSelectedStatus(status);
    onStatusChange(status.status);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-48">
      {/* Hiển thị trạng thái hiện tại */}
      <button
        disabled= {isDisable}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-8 py-2 px-4 flex items-center justify-center rounded-lg truncate"
        style={{ backgroundColor: selectedStatus.statusColor }}
      >
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <span className="text-white font-semibold text-sm truncate mr-1">
            {selectedStatus.statusName}
          </span>
          <span className="text-white">&#9662;</span>
        </div>
      </button>

      {/* Danh sách lựa chọn */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {statuses.map((status) => (
            <li
              key={status.status}
              onClick={() => handleStatusSelect(status)}
              className="py-2 px-4 flex items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200 truncate"
            >
              <span
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: status.statusColor }}
              ></span>
              <span className="text-sm font-semibold text-gray-800 truncate">
                {status.statusName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropList;
