
export interface Tasks {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
  expirationDate: string;
  description?: string;
  authorId?: string;
}

export interface DetailTaskProps {
  onClose: () => void;
  task: Tasks | null;
  isAdmin?: boolean;
}