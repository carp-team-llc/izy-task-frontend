import React, { useState } from 'react'
import { X, Camera, Calendar } from 'lucide-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface UserProfileFormProps {
  onClose: () => void
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: new Date(),
    gender: '',
    email1: '',
    email2: '',
    phone: ''
  })
  const [birthdayPickerOpen, setBirthdayPickerOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleBirthdayChange = (date: Date | null) => {
    if (date) {
      setFormData(prevData => ({ ...prevData, birthday: date }))
      setBirthdayPickerOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-[#1E2139] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide p-4">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Create Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Basic info</h3>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 w-1/3">Profile picture</span>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm text-gray-400">Add a profile picture</span>
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-600 transition-colors">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>

          <ProfileInput label="Name" name="name" value={formData.name} onChange={handleChange} />

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 w-1/3">Birthday</span>
            <div className="flex-1 relative">
              <input
                type="text"
                value={formData.birthday.toLocaleDateString()}
                readOnly
                className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10 cursor-pointer"
                onClick={() => setBirthdayPickerOpen(true)}
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={() => setBirthdayPickerOpen(true)}
              />
              {birthdayPickerOpen && (
                <DatePicker
                  selected={formData.birthday}
                  onChange={handleBirthdayChange}
                  onClickOutside={() => setBirthdayPickerOpen(false)}
                  inline
                />
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 w-1/3">Gender</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 bg-[#2A2F4A] rounded px-2 py-1 text-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-2">Contact info</h3>
          </div>

          <ProfileInput label="Email" name="email1" value={formData.email1} onChange={handleChange} />
          <ProfileInput label="Additional email" name="email2" value={formData.email2} onChange={handleChange} />
          <ProfileInput 
            label="Phone" 
            name="phone" 
            type="tel"
            value={formData.phone} 
            onChange={handleChange}
            placeholder="Add a recovery phone number"
          />

          <div className="flex justify-center space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ProfileInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
}

const ProfileInput: React.FC<ProfileInputProps> = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex items-center space-x-4">
    <span className="text-sm text-gray-400 w-1/3">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-500"
    />
  </div>
)

export default UserProfileForm