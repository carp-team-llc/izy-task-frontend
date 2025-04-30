import { Filter, Search, SortDesc } from "lucide-react";

const KanbanHeader = () => {
  return (
    <div className="flex items-center px-4 py-2 bg-[#0F0F35] border-b rounded-md border-[#13172B]">
      <span className="flex items-center mr-6 space-x-2 cursor-pointer text-[#A6A6B2] text-sm font-medium">
        <Search width={16} height={16} className="hover:text-[#4F39F6]" />
        <input className="border border-[#A6A6B2] rounded-md px-2 " />
      </span>
      <span className="flex items-center mr-6 space-x-2 cursor-pointer text-[#A6A6B2] text-sm font-medium hover:text-[#4F39F6]">
        <Filter width={16} height={16} />
        <p className="text-md">Filter</p>
      </span>
      <span className="flex items-center mr-6 space-x-2 cursor-pointer text-[#A6A6B2] text-sm font-medium hover:text-[#4F39F6]">
        <SortDesc width={16} height={16} />
        <p className="text-md">Sort</p>
      </span>
      <span className="flex items-center mr-6 space-x-2 cursor-pointer text-[#A6A6B2] text-sm font-medium hover:text-[#4F39F6]">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0a061f]"
            />
          ))}
        </div>
      </span>
    </div>
  );
};

export default KanbanHeader;
