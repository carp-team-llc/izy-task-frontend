import React from 'react';
import { motion } from 'framer-motion';
import type { ProjectMember, UserRole } from './types';

const UserRemoveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


interface MemberListItemProps {
  member: ProjectMember;
  currentUserRole: UserRole;
  onKickMember: (memberId: string, memberName: string) => void;
}

const MemberListItem: React.FC<MemberListItemProps> = ({
  member,
  currentUserRole,
  onKickMember,
}) => {
  const canKick = (currentUserRole === 'ADMIN' || currentUserRole === 'MOD') && member.roleCode !== 'ADMIN'; // Admin không thể kick Admin khác, Mod có thể kick Member

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 bg-[var(--color-secondary)] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center space-x-4">
        <img
          src={member.user.profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.user.profile?.fullName || member.user.username)}&background=0F0F35&color=FFFFFF&bold=true`}
          alt={member.user.profile?.fullName || member.user.username}
          className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-accent)]"
        />
        <div>
          <p className="text-md font-semibold text-white">
            {member.user.profile?.fullName || member.user.username}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">{member.user.email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <div className="text-center">
          <p className="text-[var(--color-text-secondary)] text-xs">Vai trò</p>
          <p className="font-medium text-white">{member.roleName}</p>
        </div>
        <div className="text-center hidden sm:block">
          <p className="text-[var(--color-text-secondary)] text-xs">Ngày tham gia</p>
          <p className="font-medium text-white">{formatDate(member.joinedAt)}</p>
        </div>
        
        {canKick && (
          <button
            onClick={() => onKickMember(member.id, member.user.profile?.fullName || member.user.username)}
            className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors p-2 rounded-md hover:bg-red-500/10"
            title={`Kick ${member.user.profile?.fullName || member.user.username}`}
          >
            <UserRemoveIcon />
            <span className="hidden md:inline">Kick</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MemberListItem;