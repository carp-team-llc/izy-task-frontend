
import { createContext, useContext } from 'react';

interface ProfileProps {
  id: string;
  fullName: string;
  bio: string;
  dateOfBirth: string;
  avatar: string;
  userId: string;
  gender: string;
  socials: [];
  user: {
    email: string;
  };
}

export const ProfileContext = createContext<ProfileProps | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
}