// src/components/Kanban/types.ts
export interface Task {
  id: string;
  title: string;
  status: StatusId;
  number: number;
}

export interface TaskResponse {
  id: string;
  name: string;
  body: string;
  status: string;
  statusColor: string;
  statusName: string;
  createdAt: string;
  estimatetime: string;
  updatedAt: string;
  isExpiration: string;
  startTime: string;
  expirationDate: string;
  images: string;
  tags: string;
  projectId: string;
  team: string;
  type: string;
  priority: string;
  priorityName: string;
  progress: string;
  employeeId: string;
  authorId: string;
  sprintId: string;
  taskListId: string;
  employeeAvatar?: string;
  employeeName?: string;
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
