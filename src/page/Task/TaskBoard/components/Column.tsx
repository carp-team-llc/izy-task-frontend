import type { ReactNode } from "react";

export interface ColumnInfoProps {
  id: string;
  name: string;
  statusKey: string;
  children: ReactNode;
}

export interface ColumnDataProps {
  name: string;
  body: string;
  status: string;
  statusColor: string;
  statusName: string;
  isExpiration: boolean;
  startTime: string;
  expirationDate: string;
  avatar: string;
  comments: string[];
}

const Column = ({ id, name, statusKey, children }: ColumnInfoProps) => {
  return (
    <div className="bg-[#ffffff] w-80 h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* title */}
      <div
        className="
      bg-[#05051F] 
      text-md h-[60px] 
      cursor-grab 
      rounded-lg
      rounded-b-none
      p-3
      font-bold
      border-[#0F0F35]
      border-4
      "
      >
        <div className="flex gap-2">
          <div
            className="
          flex
          jutify-center
          items-center
          bg-[#0F0F35]
          px-2
          py-1
          text-sm
          rounded-md
        "
          >
            0
          </div>
          {name}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-grow">{children}</div>
    </div>
  );
};

export default Column;
