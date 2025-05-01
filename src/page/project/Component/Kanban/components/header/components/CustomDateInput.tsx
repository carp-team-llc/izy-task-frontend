import { Calendar, X } from "lucide-react";
import React from "react";

interface CustomDateInputProps {
  value?: string; // Prop này sẽ được DatePicker truyền vào với ngày đã format
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Prop này do DatePicker truyền để mở calendar
  placeholder: string; // Prop chúng ta tự định nghĩa
  selectedDate: Date | null; // Prop chúng ta tự định nghĩa để biết khi nào hiển thị nút X
  onClear: () => void; // Prop chúng ta tự định nghĩa để xử lý clear
  id?: string; // DatePicker có thể truyền id
}

const CustomDateInput = React.forwardRef<
  HTMLButtonElement,
  CustomDateInputProps
>(({ value, onClick, placeholder, selectedDate, onClear, id }, ref) => {
  return (
    <div className="relative w-full">
      {" "}
      <button
        type="button"
        className={`w-full text-left px-3 py-2 rounded hover:bg-[#0A061F] text-sm mb-1 flex items-center justify-between ${
          value ? "text-white" : "text-[#A6A6B2]" // Đổi màu text nếu có giá trị
        }`}
        onClick={onClick} // Gắn onClick được DatePicker cung cấp
        ref={ref}
        id={id}
      >
        {/* Phần hiển thị icon và text */}
        <span className="flex items-center flex-grow mr-2 overflow-hidden">
          {" "}
          {/* Thêm overflow-hidden */}
          <Calendar size={16} className="mr-2 text-[#A6A6B2] flex-shrink-0" />
          <span className="truncate">
            {" "}
            {/* Đảm bảo text bị cắt nếu quá dài */}
            {/* Ưu tiên hiển thị 'value' (ngày đã format) nếu có, nếu không thì hiển thị placeholder */}
            {value || placeholder}
          </span>
        </span>
      </button>
      {selectedDate && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Ngăn không cho click vào button cha (mở calendar)
            onClear(); // Gọi hàm onClear đã truyền vào
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-[#A6A6B2] hover:text-white rounded-full hover:bg-[#4b4763] focus:outline-none focus:ring-1 focus:ring-[#4F39F6]"
          aria-label={`Clear ${placeholder}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
});

export default CustomDateInput;
