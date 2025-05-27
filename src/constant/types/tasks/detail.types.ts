
export interface Tasks {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
  expirationDate: string;
  description?: string;
}

export interface DetailTaskProps {
  onClose: () => void;
  task: Tasks | null;
}