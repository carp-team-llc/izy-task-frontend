import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TimelineBlockProps {
  color: 'indigo' | 'green' | 'blue' | 'orange'
  title: string
  percentage: number
  width?: string
}

const TimelineBlock: React.FC<TimelineBlockProps> = ({ color, title, percentage, width = 'w-full' }) => {
  const backgroundColor = color === 'indigo' ? 'bg-indigo-500' :
                          color === 'green' ? 'bg-green-500' :
                          color === 'blue' ? 'bg-blue-500' : 'bg-orange-500';

  const percentageColor = color === 'indigo' ? 'bg-indigo-400' :
                          color === 'green' ? 'bg-green-400' :
                          color === 'blue' ? 'bg-blue-400' : 'bg-orange-400';

  return (
    <div className={`${width} flex items-center ${backgroundColor} text-white rounded-full py-1 px-2 space-x-1`}>
      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
      <span className="text-xs truncate">{title}</span>
      <div className={`${percentageColor} rounded-full py-0.5 px-1 text-xs ml-auto`}>
        {percentage}%
      </div>
      <ChevronRight size={12} />
    </div>
  )
}

const Timeline: React.FC = () => {
  const dates: string[] = ['S 04', 'S 05', 'S 06', 'S 07', 'S 04', 'S 05', 'S 06', 'S 07', 'S 08', 'S 09', 'S 10', 'S 11', 'S 12', 'S 13', 'S 14', 'S 15', 'S 16', 'S 18', 'S 19', 'S 20', 'S 21']

  return (
    <div className="bg-[#1a1f37]  w-[97%] max-w-full mx-auto h-[600px] p-4 rounded-lg overflow-hidden mt-[100px] ml-[20px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Timeline</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Today</button>
          <div className="flex items-center text-gray-600">
            <ChevronLeft size={20} />
            <span className="mx-2 text-sm text-white">June, 20 2022</span>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex justify-between mb-2">
            {dates.map((date, index) => (
              <div key={index} className="text-xs text-gray-600 w-12 flex-shrink-0">{date}</div>
            ))}
          </div>

          <div className="relative h-[500px]">
            <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-21 gap-0">
              {Array.from({ length: 21 }).map((_, index) => (
                <div key={index} className="border-l border-dashed border-gray-300 h-full"></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-rows-6 gap-0">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border-t border-dashed border-gray-300 w-full"></div>
              ))}
            </div>

            <div className="relative grid grid-cols-21 grid-rows-6 gap-2 pt-2">
              <div className="col-start-2 col-span-4 row-start-1">
                <TimelineBlock color="indigo" title="Profile" percentage={49} />
              </div>
              <div className="col-start-7 col-span-4 row-start-1">
                <TimelineBlock color="green" title="Menu" percentage={54} />
              </div>
              <div className="col-start-12 col-span-4 row-start-1">
                <TimelineBlock color="blue" title="Settings" percentage={39} />
              </div>
              <div className="col-start-3 col-span-3 row-start-2">
                <TimelineBlock color="green" title="Login" percentage={48} />
              </div>
              <div className="col-start-8 col-span-3 row-start-2">
                <TimelineBlock color="orange" title="Services" percentage={54} />
              </div>
              <div className="col-start-2 col-span-5 row-start-3 row-span-2">
                <div className="bg-white rounded-lg p-3 shadow h-full">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">Complete Task</h3>
                  <svg className="w-full h-16" viewBox="0 0 200 60">
                    <path d="M0,30 Q50,5 100,30 T200,30" fill="none" stroke="#4F46E5" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>67</span>
                    <span>73</span>
                    <span>53</span>
                    <span>47</span>
                    <span>39</span>
                    <span>27</span>
                    <span>27</span>
                  </div>
                </div>
              </div>
              <div className="col-start-8 col-span-4 row-start-3">
                <TimelineBlock color="indigo" title="Testimonials" percentage={69} />
              </div>
              <div className="col-start-7 col-span-2 row-start-4">
                <div className="bg-orange-500 text-white rounded-full py-1 px-2 flex items-center space-x-1 text-xs">
                  <span>61%</span>
                  <ChevronRight size={12} />
                </div>
              </div>
              <div className="col-start-14 col-span-4 row-start-4">
                <TimelineBlock color="green" title="Homepage" percentage={48} />
              </div>
              <div className="col-start-5 col-span-5 row-start-5">
                <TimelineBlock color="blue" title="Edit Portfolio" percentage={63} />
              </div>
              <div className="col-start-2 col-span-3 row-start-6">
                <TimelineBlock color="indigo" title="Profile" percentage={48} />
              </div>
              <div className="col-start-14 col-span-3 row-start-6">
                <TimelineBlock color="orange" title="Services" percentage={54} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timeline;
