// KanbanHeader.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Filter, Search, SortDesc } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import FilterDropList from "./header/FilterDropList";
import SortDropList from "./header/SortDropList";
import {
  mockStatuses,
  mockUsers,
  type FilterState,
  type SortKey,
} from "./header/type";

type KanbanHeaderProps = {
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sortKey: SortKey) => void;
  onSearchChange?: (term: string) => void;
};

const KanbanHeader: React.FC<KanbanHeaderProps> = ({
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  // --- State Management ---
  const [filters, setFilters] = useState<FilterState>({
    users: [],
    author: null,
    statuses: [],
    isExpiration: false,
    startTime: null,
    expirationDate: null,
  });
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State cho input search

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // --- Callback Handlers ---
  // Filter Handlers
  const handleUserSelect = useCallback((userId: string) => {
    setFilters((prev) => ({
      ...prev,
      users: prev.users.includes(userId)
        ? prev.users.filter((id) => id !== userId)
        : [...prev.users, userId],
    }));
  }, []);

  const handleAuthorSelect = useCallback((userId: string | null) => {
    setFilters((prev) => ({ ...prev, author: userId }));
  }, []);

  const handleStatusSelect = useCallback((statusId: string) => {
    const upperCaseStatusId = statusId.toUpperCase();
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(upperCaseStatusId)
        ? prev.statuses.filter((id) => id !== upperCaseStatusId)
        : [...prev.statuses, upperCaseStatusId],
    }));
  }, []);

  const handleExpirationToggle = useCallback((isChecked: boolean) => {
    setFilters((prev) => ({ ...prev, isExpiration: isChecked }));
  }, []);

  // Sort Handler
  const handleSortChange = useCallback((newSortKey: SortKey) => {
    setSortKey(newSortKey);
    setIsSortOpen(false); // Đóng dropdown Sort sau khi chọn
  }, []);

  // Search Handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // TODO: Thêm logic debounce nếu cần gọi API search
  };

  const handleDateChange = useCallback(
    (field: "startTime" | "expirationDate", date: String | null) => {
      setFilters((prev) => ({
        ...prev,
        [field]: date,
      }));
    },
    []
  );

  // --- Effects ---
  // Effect để xử lý click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    console.log("filters: ", filters)
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  useEffect(() => {
    console.log("sortKey: ", sortKey)
    onSortChange?.(sortKey);
  }, [sortKey, onSortChange]);
  
  useEffect(() => {
    console.log("searchTerm: ", searchTerm)
    onSearchChange?.(searchTerm);
  }, [searchTerm, onSearchChange]);

  // --- Toggle Dropdown Functions ---
  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSortOpen(false);
    setIsFilterOpen((prev) => !prev);
  };

  const toggleSort = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFilterOpen(false);
    setIsSortOpen((prev) => !prev);
  };

  // --- Render Logic ---
  // Tính toán số lượng filter đang áp dụng để hiển thị badge
  const activeFilterCount = [
    filters.users.length > 0,
    filters.author !== null,
    filters.statuses.length > 0,
    filters.isExpiration,
    filters.expirationDate,
    filters.startTime,
  ].filter(Boolean).length;

  return (
    <div className="flex items-center px-4 py-2 bg-[#0F0F35] border-b rounded-t-md border-[#13172B] relative z-10">
      {/* Search Input */}
      <span className="flex items-center mr-6 space-x-2 text-[#A6A6B2] text-sm font-medium">
        <Search width={16} height={16} className="text-[#A6A6B2]" />{" "}
        {/* Không cần hover effect ở đây */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-[#A6A6B2] rounded-md px-2 py-1 bg-[#0A061F] text-white placeholder-[#A6A6B2] focus:outline-none focus:border-[#4F39F6] focus:ring-1 focus:ring-[#4F39F6] text-sm transition-colors duration-200"
        />
      </span>

      {/* Filter Button & Dropdown */}
      <div className="relative mr-6" ref={filterRef}>
        <button // Chuyển thành button để tốt hơn cho A11y
          onClick={toggleFilter}
          aria-haspopup="true"
          aria-expanded={isFilterOpen}
          className={`flex items-center space-x-2 cursor-pointer text-sm font-medium hover:text-[#4F39F6] transition-colors duration-200 ${
            isFilterOpen ? "text-[#4F39F6]" : "text-[#A6A6B2]"
          }`}
        >
          <Filter width={16} height={16} />
          <p className="text-md">Filter</p>
          {/* Hiển thị badge số lượng filter đang active */}
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-[#4F39F6] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        <AnimatePresence>
          {isFilterOpen && (
            <FilterDropList
              filters={filters} // Truyền toàn bộ state filters
              users={mockUsers}
              statuses={mockStatuses}
              onClose={() => setIsFilterOpen(false)}
              onUserSelect={handleUserSelect}
              onAuthorSelect={handleAuthorSelect}
              onStatusSelect={handleStatusSelect}
              onExpirationToggle={handleExpirationToggle}
              onDateChange={handleDateChange}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Sort Button & Dropdown */}
      <div className="relative mr-6" ref={sortRef}>
        <button // Chuyển thành button
          onClick={toggleSort}
          aria-haspopup="true"
          aria-expanded={isSortOpen}
          className={`flex items-center space-x-2 cursor-pointer text-sm font-medium hover:text-[#4F39F6] transition-colors duration-200 ${
            isSortOpen ? "text-[#4F39F6]" : "text-[#A6A6B2]"
          }`}
        >
          <SortDesc width={16} height={16} />
          <p className="text-md">Sort</p>
          {/* Hiển thị loại sort đang active (ví dụ) */}
          {sortKey && (
            <span className="ml-1 text-[#4F39F6] text-xs font-medium">
              (
              {sortKey === "az"
                ? "A-Z"
                : sortKey === "za"
                ? "Z-A"
                : sortKey === "newest"
                ? "Newest"
                : "Oldest"}
              )
            </span>
          )}
        </button>
        <AnimatePresence>
          {isSortOpen && (
            <SortDropList
              currentSortKey={sortKey}
              onSortChange={handleSortChange}
              onClose={() => setIsSortOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Assignees */}
      <span className="flex items-center space-x-2 cursor-pointer text-[#A6A6B2] text-sm font-medium hover:text-[#4F39F6] ml-auto"></span>
    </div>
  );
};

export default KanbanHeader;
