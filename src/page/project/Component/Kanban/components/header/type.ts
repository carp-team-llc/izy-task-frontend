// Có thể đặt ở file constants hoặc trong KanbanHeader nếu phù hợp
interface Status { id: string; title: string; color: string; }
interface User { id: string; name: string; avatar?: string; }
interface Priority { id: string; name: string; color?: string; }

const mockUsers: User[] = [
  { id: "user1", name: "Alice Wonderland" },
  { id: "user2", name: "Bob The Builder" },
  { id: "user3", name: "Charlie Chaplin" },
  { id: "user4", name: "Diana Prince" },
];

const mockStatuses: Status[] = [
  { id: "new", title: "New", color: "bg-[#06a2c9]" },
  { id: "doing", title: "Doing", color: "bg-[#ff5482]" },
  { id: "completed", title: "Completed", color: "bg-[#0eb53b]" },
  { id: "review", title: "Review", color: "bg-[#FF6900]" },
  { id: "pending", title: "Pending", color: "bg-[#c99506]" },
  { id: "late", title: "Late", color: "bg-[#d92a02]" },
  { id: "cancel", title: "Cancelled", color: "bg-[#7d7d7d]" },
];

const mockPriorities: Priority[] = [
    {id: 'low', name: 'Low'},
    {id: 'medium', name: 'Medium'},
    {id: 'high', name: 'High'},
    {id: 'urgent', name: 'Urgent'},
];

// Kiểu dữ liệu cho State Filter tổng hợp
export interface FilterState {
  users: string[];       // IDs of selected users for 'assigned'
  author: string | null; // ID of the selected author
  statuses: string[];    // IDs of selected statuses
  priorities: string[];  // IDs of selected priorities
  isExpiration: boolean;
  startTime: Date | null;
  expirationDate: Date | null;
}

// Kiểu dữ liệu cho State Sort
export type SortKey = 'az' | 'za' | 'newest' | 'oldest' | null;

export { mockUsers, mockStatuses, mockPriorities };
export type { Status, User, Priority };