import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CustomDateInput from "./components/CustomDateInput";
import type { FilterState, Status, User } from "./type";

interface FilterDropListProps {
  filters: FilterState; // Nhận state filter hiện tại
  users: User[]; // Nhận danh sách users từ props
  statuses: Status[]; // Nhận danh sách statuses từ props
  onClose: () => void;
  onUserSelect: (userId: string) => void;
  onAuthorSelect: (userId: string | null) => void; // Cho phép null để bỏ chọn
  onStatusSelect: (statusId: string) => void;
  onExpirationToggle: (isChecked: boolean) => void;
  onDateChange: (
    field: "startTime" | "expirationDate",
    date: string | null
  ) => void;
}

type ActiveNestedMenu = "assigned" | "author" | "status" | "priority" | null;

const FilterDropList: React.FC<FilterDropListProps> = ({
  users,
  filters,
  statuses,
  onUserSelect,
  onAuthorSelect,
  onStatusSelect,
  onExpirationToggle,
  onDateChange,
}) => {
  const [activeNestedMenu, setActiveNestedMenu] =
    useState<ActiveNestedMenu>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng nested menu khi click vào mục khác ở menu chính
  const handleMainMenuClick = (menu: ActiveNestedMenu) => {
    setActiveNestedMenu((prev) => (prev === menu ? null : menu));
  };

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

  const nestedMenuVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut", delay: 0.1 },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  const getAuthorName = (authorId: string | null): string => {
    if (!authorId) return "";
    const author = users.find((u) => u.id === authorId);
    // Trả về tên ngắn gọn hoặc tên đầy đủ tùy thiết kế
    return author ? `(${author.name.split(" ")[0]})` : "";
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <motion.div
      ref={dropdownRef}
      className="absolute top-full mt-2 left-0 z-20 bg-[#1E1A31] text-[#FFFFFF] rounded-md shadow-lg border border-[#0A061F] w-64 flex" // Giữ nguyên layout flex
      variants={dropDownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-2 flex-shrink-0 w-full">
        {/* Start Date Picker */}
        <div className="mb-1">
          <DatePicker
            selected={filters.startTime ? new Date(filters.startTime) : null} // Chuyển đổi từ string sang Date
            onChange={(date: Date | null) => {
              if (date) {
                const localDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                const isoString = localDate.toISOString();
                onDateChange("startTime", isoString);
              } else {
                onDateChange("startTime", null);
              }
            }}
            selectsStart
            startDate={filters.startTime ? new Date(filters.startTime) : null}
            endDate={
              filters.expirationDate ? new Date(filters.expirationDate) : null
            }
            maxDate={
              filters.expirationDate
                ? new Date(filters.expirationDate)
                : undefined
            } // Không cho chọn sau ngày hết hạn
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
            isClearable={false} // Tắt clear mặc định, dùng nút clear custom
            showPopperArrow={false}
            customInput={
              <CustomDateInput
                placeholder="Start Date"
                selectedDate={filters.startTime}
                onClear={() => onDateChange("startTime", null)}
              />
            }
            popperClassName="react-datepicker-dark"
            calendarClassName="react-datepicker-dark-cal"
            wrapperClassName="w-full"
          />
        </div>
        {/* Expiration Date Picker */}
        <div className="mb-1">
          <DatePicker
            selected={
              filters.expirationDate ? new Date(filters.expirationDate) : null
            }
            onChange={(date: Date | null) => {
              if (date) {
                const localDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                const isoString = localDate.toISOString();
                onDateChange("expirationDate", isoString);
              } else {
                onDateChange("expirationDate", null);
              }
            }}
            selectsEnd
            startDate={filters.startTime ? new Date(filters.startTime) : null}
            endDate={
              filters.expirationDate ? new Date(filters.expirationDate) : null
            }
            minDate={
              filters.startTime ? new Date(filters.startTime) : undefined
            } // Không cho chọn trước ngày bắt đầu
            placeholderText="Expiration Date"
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showPopperArrow={false}
            customInput={
              <CustomDateInput
                placeholder="Expiration Date"
                selectedDate={filters.expirationDate}
                onClear={() => onDateChange("expirationDate", null)}
              />
            }
            popperClassName="react-datepicker-dark"
            calendarClassName="react-datepicker-dark-cal"
            wrapperClassName="w-full"
          />
        </div>{" "}
        {/* Assigned */}
        <button
          onClick={() => handleMainMenuClick("assigned")}
          className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm flex justify-between items-center mb-1 ${
            activeNestedMenu === "assigned" ? "bg-[#0A061F]" : ""
          }`}
        >
          <span>
            Assigned{" "}
            {filters.users.length > 0 ? `(${filters.users.length})` : ""}
          </span>
          <ChevronRight size={16} />
        </button>
        {/* Author */}
        <button
          onClick={() => handleMainMenuClick("author")}
          className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm flex justify-between items-center mb-1 ${
            activeNestedMenu === "author" ? "bg-[#0A061F]" : ""
          }`}
        >
          <span>Author {getAuthorName(filters.author)}</span>
          <ChevronRight size={16} />
        </button>
        {/* Status */}
        <button
          onClick={() => handleMainMenuClick("status")}
          className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm flex justify-between items-center mb-1 ${
            activeNestedMenu === "status" ? "bg-[#0A061F]" : ""
          }`}
        >
          <span>
            Status{" "}
            {filters.statuses.length > 0 ? `(${filters.statuses.length})` : ""}
          </span>
          <ChevronRight size={16} />
        </button>
        {/* isExpiration Checkbox */}
        <label className="flex items-center px-3 py-2 text-sm space-x-2 cursor-pointer hover:bg-[#0A061F] rounded">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-[#4F39F6] bg-[#0A061F] border-[#A6A6B2] rounded focus:ring-[#4F39F6]"
            checked={filters.isExpiration} // Đọc từ props
            onChange={(e) => onExpirationToggle(e.target.checked)} // Gọi callback
          />
          <span>Is Expiration</span>
        </label>
        {/* <button onClick={onClose}>
          {" "}
          <X size={16} />{" "}
        </button> */}
      </div>

      {/* Nested Menus Container */}
      <div className="relative w-56 flex-shrink-0 border-l border-[#0A061F]">
        <AnimatePresence mode="wait">
          {activeNestedMenu && (
            <motion.div
              key={activeNestedMenu}
              className="absolute top-0 left-0 w-full h-full bg-[#1E1A31] p-2 overflow-y-auto"
              variants={nestedMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h4 className="text-xs font-semibold text-[#A6A6B2] px-2 py-1 mb-1 uppercase">
                {activeNestedMenu}
              </h4>

              {/* Assigned Users */}
              {activeNestedMenu === "assigned" &&
                users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onUserSelect(user.id)} // Gọi callback
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-[#0A061F] text-sm mb-1 flex items-center justify-between ${
                      filters.users.includes(user.id) ? "bg-[#0A061F]" : ""
                    }`}
                  >
                    {user.name}
                    {filters.users.includes(user.id) && (
                      <span className="text-[#4F39F6]">✓</span>
                    )}
                  </button>
                ))}

              {/* Author Selection */}
              {activeNestedMenu === "author" && (
                <>
                  {/* Option to clear author */}
                  <button
                    onClick={() => {
                      onAuthorSelect(null); // Gọi callback với null
                      setActiveNestedMenu(null); // Đóng nested menu
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-[#0A061F] text-sm mb-1 flex items-center justify-between ${
                      filters.author === null ? "bg-[#0A061F]" : ""
                    }`}
                  >
                    Any Author
                    {filters.author === null && (
                      <span className="text-[#4F39F6]">✓</span>
                    )}
                  </button>
                  {/* List of users to select as author */}
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onAuthorSelect(user.id); // Gọi callback
                        setActiveNestedMenu(null); // Đóng nested menu
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded hover:bg-[#0A061F] text-sm mb-1 flex items-center justify-between ${
                        filters.author === user.id ? "bg-[#0A061F]" : ""
                      }`}
                    >
                      {user.name}
                      {filters.author === user.id && (
                        <span className="text-[#4F39F6]">✓</span>
                      )}
                    </button>
                  ))}
                </>
              )}

              {/* Statuses */}
              {activeNestedMenu === "status" &&
                statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => onStatusSelect(status.id)} // Gọi callback
                    className={`w-full text-left px-2 py-1.5 rounded hover:bg-[#0A061F] text-sm mb-1 flex items-center justify-between ${
                      filters.statuses.includes(status.id.toUpperCase()) ? "bg-[#0A061F]" : ""
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${status.color}`}
                      ></span>
                      <span>{status.title}</span>
                    </span>
                    {filters.statuses.includes(status.id.toUpperCase()) && (
                      <span className="text-[#4F39F6]">✓</span>
                    )}
                  </button>
                ))}

              {/* Nút Done hoặc Back để đóng nested menu */}
              <button
                onClick={() => setActiveNestedMenu(null)}
                className="w-full mt-2 text-center px-3 py-1.5 rounded bg-[#0A061F] hover:bg-[#4F39F6] text-sm"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FilterDropList;
