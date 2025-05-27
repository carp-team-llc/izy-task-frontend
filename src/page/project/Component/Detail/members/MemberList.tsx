import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectMember, UserRole } from './components/types';
import MemberListItem from './components/MemberListItem';

// Icons
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3.375 19.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-text-secondary)]">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);


interface ProjectMembersTabProps {
  projectId: string;
}

const useProjectMembers = (projectId: string) => {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockMembers: ProjectMember[] = [
        {
            id: "member1", userId: "user1", projectId, teamId: null, joinedAt: "2024-01-15T10:00:00.000Z", role: "Admin", roleCode: "ADMIN", roleName: "Quản trị viên", roleEngName: "Admin", permission: "HIGH",
            user: { id: "user1", username: "admin_user", email: "admin@example.com", createdAt: "2023-01-01T00:00:00.000Z", profile: { id: "profile1", fullName: "Alice Wonderland", avatar: "https://randomuser.me/api/portraits/women/1.jpg", userId: "user1" } }
        },
        {
            id: "member2", userId: "user2", projectId, teamId: null, joinedAt: "2024-02-20T14:30:00.000Z", role: "Moderator", roleCode: "MOD", roleName: "Điều phối viên", roleEngName: "Moderator", permission: "MEDIUM",
            user: { id: "user2", username: "mod_user", email: "mod@example.com", createdAt: "2023-02-01T00:00:00.000Z", profile: { id: "profile2", fullName: "Bob The Builder", avatar: "https://randomuser.me/api/portraits/men/2.jpg", userId: "user2" } }
        },
        {
            id: "member3", userId: "user3", projectId, teamId: null, joinedAt: "2024-03-10T09:00:00.000Z", role: "Member", roleCode: "MEMBER", roleName: "Thành viên", roleEngName: "Member", permission: "LOW",
            user: { id: "user3", username: "member_user", email: "member@example.com", createdAt: "2023-03-01T00:00:00.000Z", profile: { id: "profile3", fullName: "Charlie Brown", avatar: "https://randomuser.me/api/portraits/men/3.jpg", userId: "user3" } }
        },
        {
            id: "6813509fb989a01b77c8d94a", userId: "6813503db989a01b77c8d949", projectId, teamId: null, joinedAt: "2025-05-01T10:44:47.266Z", role: "Member", roleCode: "MEMBER", roleName: "Thành viên", roleEngName: "Member", permission: "LOW",
            user: {
                id: "6813503db989a01b77c8d949", username: "cadeptrai", email: "nguyentrananhkhoa.xc9n@gmail.com", phone: "0914930159", createdAt: "2025-05-01T10:43:09.507Z",
                profile: { id: "6813503db989a01b77c8d949", fullName: "calangthang", bio: "hihi", dateOfBirth: "2025-05-20T17:00:00.000Z", avatar: "https://stickerrs.com/wp-content/uploads/2024/03/Cat-Meme-Stickers-Featured.png", userId: "6813503db989a01b77c8d949", gender: "male" }
            }
        },
        {
            id: "member4", userId: "user4", projectId, teamId: null, joinedAt: "2024-04-05T11:00:00.000Z", role: "Member", roleCode: "MEMBER", roleName: "Thành viên", roleEngName: "Member", permission: "LOW",
            user: { id: "user4", username: "another_member", email: "another@example.com", createdAt: "2023-04-01T00:00:00.000Z", profile: null } // Profile có thể null
        },
      ];
      setMembers(mockMembers);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  const addMember = (email: string) => {
    console.log(`Adding member ${email} to project ${projectId}`);
  };
  const kickMember = (memberId: string) => {
    console.log(`Kicking member ${memberId} from project ${projectId}`);
    setMembers(prev => prev.filter(m => m.id !== memberId));
  };

  return { members, loading, addMember, kickMember };
};

const useCurrentUserRole = (): { role: UserRole, loading: boolean } => {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [loading, setLoading] = useState(false);
  
  // useEffect(() => {
  //   setLoading(true);
  //   // API call to get current user role
  //   setTimeout(() => {
  //     setRole('ADMIN'); 
  //     setLoading(false);
  //   }, 500);
  // }, []);

  return { role, loading };
};


const ProjectMembersTab: React.FC<ProjectMembersTabProps> = ({ projectId }) => {
  const { members, loading: membersLoading, kickMember: apiKickMember } = useProjectMembers(projectId);
  const { role: currentUserRole, loading: roleLoading } = useCurrentUserRole(); // Hook để lấy vai trò người dùng hiện tại
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddMember = () => {
    const email = prompt("Nhập email thành viên muốn thêm:");
    if (email) {
      console.log(`TODO: Implement add member API call for ${email}`);
    }
  };

  const handleKickMember = (memberId: string, memberName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn kick thành viên "${memberName}" khỏi dự án?`)) {
      apiKickMember(memberId);
    }
  };

  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;
    return members.filter(member =>
      (member.user.profile?.fullName || member.user.username).toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  const canManageMembers = currentUserRole === 'ADMIN' || currentUserRole === 'MOD';

  if (membersLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-white">Thành viên dự án ({members.length})</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Tìm kiếm thành viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-[var(--color-secondary)] border border-[var(--color-border-subtle)] text-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
          </div>
          {canManageMembers && (
            <button
              onClick={handleAddMember}
              className="flex items-center bg-[var(--color-accent)] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <UserPlusIcon />
              Thêm mới
            </button>
          )}
        </div>
      </div>

      {filteredMembers.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMembers.map((member) => (
              <MemberListItem
                key={member.id}
                member={member}
                currentUserRole={currentUserRole}
                onKickMember={handleKickMember}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-[var(--color-text-secondary)]"
        >
          <p className="text-lg">
            {searchTerm ? "Không tìm thấy thành viên phù hợp." : "Chưa có thành viên nào trong dự án."}
          </p>
        </motion.div>
      )}

      {/* TODO: Modals for Add Member / Kick Confirmation can be added here */}
      {/* Ví dụ: 
        <AddMemberModal 
          isOpen={isAddMemberModalOpen} 
          onClose={() => setIsAddMemberModalOpen(false)}
          onAddMember={(email) => { apiAddMember(email); setIsAddMemberModalOpen(false); }}
        /> 
      */}
    </div>
  );
};

export default ProjectMembersTab;