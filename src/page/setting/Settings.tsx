"use client"

import { ExternalLink } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./component/ui/Select"
import { Switch } from "./component/ui/Switch"

export default function SettingsPage() {
  const [compactLibrary, setCompactLibrary] = useState(false)
  const [showNowPlaying, setShowNowPlaying] = useState(true)
  const [showCanvas, setShowCanvas] = useState(true)
  const [showFollowerLists, setShowFollowerLists] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("english")

  return (
    <div className="min-h-screen bg-[#121212] text-white rounded-3xl">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold">Settings</h1>
        
        </div>

        <div className="space-y-10">
          {/* Account Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Account</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-base">Edit login methods</span>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-gray-600 rounded-full hover:bg-gray-800 transition-colors duration-200">
                Edit
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Language</h2>
            <p className="text-gray-400 text-base mb-4">
              Choose language - Changes will be applied after restarting the app
            </p>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-64 h-10 bg-gray-700 border border-gray-600 text-white text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border border-gray-600">
                <SelectItem value="english">English (English)</SelectItem>
                <SelectItem value="spanish">Español (Spanish)</SelectItem>
                <SelectItem value="french">Français (French)</SelectItem>
                <SelectItem value="german">Deutsch (German)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Your Library Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Your Library</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-base">Use compact library layout</span>
              <Switch
                checked={compactLibrary}
                onCheckedChange={setCompactLibrary}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600 relative inline-flex h-6 w-11 items-center rounded-full"
              />
            </div>
          </div>

          {/* Display Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Display</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-base">Show the now-playing panel on click of play</span>
                <Switch
                  checked={showNowPlaying}
                  onCheckedChange={setShowNowPlaying}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600 relative inline-flex h-6 w-11 items-center rounded-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-base">Display short, looping visuals on tracks (Canvas)</span>
                <Switch
                  checked={showCanvas}
                  onCheckedChange={setShowCanvas}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600 relative inline-flex h-6 w-11 items-center rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">Social</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-base">Show my follower and following lists on my public profile</span>
              <Switch
                checked={showFollowerLists}
                onCheckedChange={setShowFollowerLists}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600 relative inline-flex h-6 w-11 items-center rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
