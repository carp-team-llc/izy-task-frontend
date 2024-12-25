import React, { useState } from "react";
import { Upload, Calendar } from "lucide-react";
import useCreateProfile from "../../hook/Api/profile/useCreateProfile";

const CreateProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    bio: "",
    avatar: "",
    socials: [],
  });
  const { onCreateProfile, isError, error } = useCreateProfile();
  const [socialInputs, setSocialInputs] = useState<{
    platform: string;
    url: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSocialChange = (field: "platform" | "url", value: string) => {
    setSocialInputs(
      (prevInputs) =>
        ({
          ...prevInputs,
          [field]: value,
        } as { platform: string; url: string })
    );
  };

  const handleAddSocial = () => {
    if (!socialInputs) {
      setSocialInputs({ platform: "", url: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onCreateProfile(formData);
  };

  return (
    <div className="bg-[#1E1E2D] text-white p-6 rounded-lg w-full max-w-7xl mx-auto h-[calc(96vh-5rem)] overflow-y-auto relative ">
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
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium mb-1"
                >
                  Date of Birth
                </label>
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
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-1"
              >
                Gender
              </label>
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
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Description"
                rows={2}
                className="w-full bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400"
              ></textarea>
            </div>
          </div>

          <div className="space-y-4 border-l border-gray-700 pl-12">
            <h2 className="text-lg font-semibold mb-2">Social Network</h2>

            {socialInputs && (
              <div className="flex items-center space-x-4 mb-2">
                <input
                  type="text"
                  value={socialInputs.url}
                  onChange={(e) => handleSocialChange("url", e.target.value)}
                  placeholder="Profile link"
                  className="w-3/4 bg-[#151521] rounded-md p-2 text-sm text-white placeholder-gray-400"
                />
                <select
                  value={socialInputs.platform}
                  onChange={(e) =>
                    handleSocialChange("platform", e.target.value)
                  }
                  className="bg-[#151521] rounded-md p-2 text-sm text-white"
                >
                  <option value="">Select Platform</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="github">Github</option>
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddSocial}
              className="w-3/4 bg-indigo-600 text-white rounded-md p-2 mt-2 flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors text-sm"
            >
              <span>+ Add Social</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white rounded-md px-6 py-2 hover:bg-indigo-700 transition-colors text-sm"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfileForm;
