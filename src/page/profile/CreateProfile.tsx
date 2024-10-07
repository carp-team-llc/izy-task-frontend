import React, { useState } from 'react'
import { Upload, Calendar, Facebook, Twitter, Instagram } from 'lucide-react'

const CreateProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    description: '',
    facebook: '',
    twitter: '',
    instagram: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
  }

  return (
    <div className="bg-[#1E1E2D] text-white p-6 rounded-lg w-full max-w-7xl mx-auto h-[calc(96vh-5rem)] overflow-y-auto relative top-20">
      <h1 className="text-2xl font-bold mb-6">CREATE PROFILE</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-[#151521] rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition-colors mr-4">
            <Upload size={24} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Profile picture</p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Public information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">Date of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="Date of birth"
                    className="w-full bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-[#151521] rounded-md p-2 text-sm text-white appearance-none"
              >
                <option value="">Choose your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows={2}
                className="w-full bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400"
              ></textarea>
            </div>
          </div>
          <div className="space-y-4 border-l border-gray-700 pl-12">
            <h2 className="text-lg font-semibold mb-2">Social network</h2>
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium mb-1">Facebook</label>
              <div className="relative">
                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="https://www.facebook.com/your_id"
                  className="w-full bg-[#151521] rounded-md p-2 pl-10 text-sm text-white placeholder-gray-400"
                />
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={16} />
              </div>
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium mb-1">X (Twitter)</label>
              <div className="relative">
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://x.com/your_id"
                  className="w-full bg-[#151521] rounded-md p-2 pl-10 text-sm text-white placeholder-gray-400"
                />
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={16} />
              </div>
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium mb-1">Instagram</label>
              <div className="relative">
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://www.instagram.com/your_id"
                  className="w-full bg-[#151521] rounded-md p-2 pl-10 text-sm text-white placeholder-gray-400"
                />
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" size={16} />
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-indigo-600 text-white rounded-md p-2 mt-2 flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors text-sm"
            >
              <span>Connect with google</span>
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-indigo-600 text-white rounded-md px-6 py-2 hover:bg-indigo-700 transition-colors text-sm">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProfileForm