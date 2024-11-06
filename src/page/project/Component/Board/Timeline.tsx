import React from "react";
const days = [
    { day: "mon", date: "3" },
    { day: "tue", date: "4", isActive: true },
    { day: "wed", date: "5" },
    { day: "thu", date: "6" },
    { day: "fri", date: "7" },
    { day: "sat", date: "8" },
  ];
  
  const tasks = [
    {
      id: 1,
      title: "UI Motion",
      time: "10:00 - 11:00",
      startHour: 10,
    },
    {
      id: 2,
      title: "UI Design",
      time: "12:00 - 13:00",
      startHour: 12,
    },
  ];
  const hours = Array.from({ length: 16 }, (_, i) => {
    const hour = (i + 9) % 24;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  export default function Timeline() {
    return(
        <div className="">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">September</h2>
                <button className="bg-[#2d2463] hover:bg-[#352a75] text-xs px-3 py-1 rounded flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Task
                </button>
              </div>
              <div className="flex justify-between bg-[#1c1248] rounded-lg p-2">
                {days.map((day) => (
                  <div
                    key={day.day}
                    className={`flex flex-col items-center ${
                      day.isActive ? "text-[#4cc9f0]" : "text-gray-400"
                    }`}
                  >
                    <span className="text-[10px] mb-1">{day.day}</span>
                    <span
                      className={`text-sm font-medium ${
                        day.isActive ? "text-[#4cc9f0]" : "text-white"
                      }`}
                    >
                      {day.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {hours.map((hour, index) => (
                <div key={hour} className="flex items-start h-12">
                  <span className="text-[10px] text-gray-400 w-8">{hour}</span>
                  <div className="flex-1 border-t border-[#1c1248]" />
                </div>
              ))}

              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="absolute left-8 right-0 bg-[#4cc9f0] rounded p-2 h-12"
                  style={{
                    top: `${(task.startHour - 9) * 3}rem`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-[#0a0721]">
                        {task.title}
                      </h3>
                      <p className="text-[10px] text-[#0a0721]">{task.time}</p>
                    </div>
                    <button className="h-6 w-6 text-[#0a0721] hover:bg-[#7dd8f4] rounded flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
    )
  }