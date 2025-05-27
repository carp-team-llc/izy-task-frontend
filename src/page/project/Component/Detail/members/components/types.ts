
export interface Profile {
  id: string;
  fullName: string;
  bio?: string | null;
  dateOfBirth?: string | null;
  avatar?: string | null;
  userId: string;
  gender?: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string | null;
  createdAt: string;
  profile: Profile | null;
}

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  teamId?: string | null;
  joinedAt: string;
  role: string;
  roleCode: string;
  roleName: string;
  roleEngName: string;
  permission: string;
  user: User;
}

export type UserRole = "ADMIN" | "MOD" | "MEMBER" | "GUEST";