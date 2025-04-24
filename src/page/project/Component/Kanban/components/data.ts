// src/components/Kanban/types.ts
export interface Task {
  id: string;
  title: string;
  status: StatusId;
  number: number; // The # number shown in the UI
  // Add other relevant task properties if needed
}

export type StatusId =
  | "new"
  | "doing"
  | "pending"
  | "late"
  | "review"
  | "completed"
  | "cancel";

export interface Column {
  id: StatusId;
  title: string;
  color: string; // Tailwind color class for the dot/line
}
