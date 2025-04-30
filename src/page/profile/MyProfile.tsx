import React, { useEffect, useState } from 'react'
import ShowProfile from './ShowProfile'
import CreateProfile from './CreateProfile'

interface ProfileData {
  name?: string
  email?: string
  bio?: string
  joinDate?: string
  gender?: string
  followers?: number
  posts?: number
  avatar?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
}

interface MyProfileProps {
  userId: string
}

const MyProfile: React.FC<MyProfileProps> = ({ userId }) => {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${userId}`)
        if (res.ok) {
          const data = await res.json()
          if (data && data.profile) {
            setProfileData(data.profile)
            setHasProfile(true)
          } else {
            setHasProfile(false)
          }
        } else {
          setHasProfile(false)
        }
      } catch (error) {
        console.error('Lỗi khi fetch profile:', error)
        setHasProfile(false)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchProfile()
    }
  }, [userId])

  if (loading) {
    return <div className="text-white p-4">Đang kiểm tra thông tin hồ sơ...</div>
  }

  if (hasProfile) {
    return <ShowProfile {...profileData!} />
  }

  return <CreateProfile userId={userId} />
}

export default MyProfile
