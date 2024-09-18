import React from 'react'
import { ChevronDown, Users } from 'lucide-react'

const RoundChart: React.FC = () => {
  return (
    <div className="bg-[#1a1f37] text-white p-6 rounded-lg max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Weekly Task</h2>
        <div className="flex items-center text-sm text-gray-400">
          <span>Aug 25-Sept 25</span>
          <ChevronDown size={16} className="ml-2" />
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-400">Inactive</span>
            </div>
            <p className="text-2xl font-bold">254</p>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
            <p className="text-2xl font-bold">3000</p>
          </div>
          <div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold">3254</p>
          </div>
        </div>

        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Outer circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* Middle circle */}
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            
            {/* Inner circle */}
            <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Orbiting elements */}
            <circle className="animate-orbit" cx="190" cy="100" r="4" fill="#9333ea">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="animate-orbit" cx="170" cy="100" r="4" fill="#f97316">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="120 100 100"
                to="480 100 100"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
            
            <circle className="animate-orbit" cx="150" cy="100" r="4" fill="#eab308">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="240 100 100"
                to="600 100 100"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-orange-500 rounded-full p-4">
              <Users size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoundChart