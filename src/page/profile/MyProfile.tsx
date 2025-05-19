import React, { useEffect, useState } from "react";
import ShowProfile from "./ShowProfile";
import CreateProfile from "./CreateProfile";
import { useAuth } from "../../services/authContext";
import { useDetailProfile } from "../../hook/Api/profile/useDetailProfile";

interface ProfileData {
  id: string;
  fullName: string;
  bio: string;
  dateOfBirth: string;
  avatar: string;
  userId: string;
  gender: string;
  socials: [];
  user: {
    email: string
  }
}

const MyProfile: React.FC = () => {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const { UserId } = useAuth();
  const { data, isLoading } = useDetailProfile(UserId || "");

  useEffect(() => {
    if (data) {
      setHasProfile(true);
      setProfileData(data?.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="text-white p-4">Đang kiểm tra thông tin hồ sơ...</div>
    );
  }

  if (hasProfile) {
    return <ShowProfile {...profileData!} />;
  }

  return <CreateProfile />;
};

export default MyProfile;
