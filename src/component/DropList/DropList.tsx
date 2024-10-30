import React, { useState } from "react";

interface StatusOption {
  status: string;
  statusName: string;
  statusColor?: string; // Optional field for color
}

interface DropListProps {
  options: StatusOption[];
  onSelect: (selectedStatus: StatusOption) => void;
}

const DropList: React.FC<DropListProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState<StatusOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: StatusOption) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="drop-list">
      <div
        className="drop-list__selected"
        style={{ color: selected?.statusColor || "black" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.statusName : "Select a status"}
      </div>

      {isOpen && (
        <ul className="drop-list__options">
          {options.map((option, index) => (
            <li
              key={index}
              className="drop-list__option"
              style={{ color: option.statusColor || "black" }}
              onClick={() => handleSelect(option)}
            >
              {option.statusName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropList;
