// header/SortDropList.tsx
import { motion } from "framer-motion";
import React, { useRef } from "react";
import type { SortKey } from "./type";

interface SortDropListProps {
  currentSortKey: SortKey; // Nhận key sort hiện tại
  onSortChange: (sortKey: SortKey) => void; // Callback để cập nhật sort
  onClose: () => void;
}

const SortDropList: React.FC<SortDropListProps> = ({
  currentSortKey,
  onSortChange,
  onClose, // Vẫn giữ onClose để xử lý click outside từ parent
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropDownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const handleSelect = (key: SortKey) => {
    onSortChange(key);
  };

  return (
    <motion.div
      ref={dropdownRef}
      className="absolute top-full mt-2 left-0 z-20 bg-[#1E1A31] text-[#FFFFFF] rounded-md shadow-lg border border-[#0A061F] w-48 p-2"
      variants={dropDownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <button
        onClick={() => handleSelect("az")}
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm mb-1 ${
          currentSortKey === "az" ? "bg-[#0A061F]" : ""
        }`}
      >
        Sort A-Z
      </button>
      <button
        onClick={() => handleSelect("za")}
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm mb-1 ${
          currentSortKey === "za" ? "bg-[#0A061F]" : ""
        }`}
      >
        Sort Z-A
      </button>
      <button
        onClick={() => handleSelect("newest")}
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm mb-1 ${
          currentSortKey === "newest" ? "bg-[#0A061F]" : ""
        }`}
      >
        Newest First
      </button>
      <button
        onClick={() => handleSelect("oldest")}
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm ${
          currentSortKey === "oldest" ? "bg-[#0A061F]" : ""
        }`}
      >
        Oldest First
      </button>
      <button
        onClick={() => handleSelect(null)}
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm mt-1 border-t border-[#0A061F] pt-2 ${
          currentSortKey === null ? "text-[#4F39F6]" : ""
        }`}
      >
        Clear Sort
      </button>
    </motion.div>
  );
};

export default SortDropList;
