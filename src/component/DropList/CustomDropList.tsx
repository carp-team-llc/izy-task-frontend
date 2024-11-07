import React, { useState } from "react";

interface Option {
  id: string | number;
  name: string;
}

interface CustomDropListProps {
  options: Option[];
  onSelect: (id: string | number) => void;
  placeholder?: string;
}

const CustomDropList: React.FC<CustomDropListProps> = ({ options, onSelect, placeholder = "Select an option" }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.id);
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    onSelect("");
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-gray-400 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex-1">{selectedOption ? selectedOption.name : placeholder}</span>

        {selectedOption && (
          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearSelection();
              }}
              className="text-red-600 hover:text-gray-300 transition-colors duration-150 ease-in-out mr-3"
            >
              ✕
            </button>
          </div>
        )}

        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-[#2A2F4A] rounded shadow-lg max-h-60 overflow-y-auto z-10 transition-all duration-300 ease-out">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 text-gray-400 hover:bg-[#1E2238] hover:text-white cursor-pointer transition-colors duration-150 ease-in-out"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropList;
