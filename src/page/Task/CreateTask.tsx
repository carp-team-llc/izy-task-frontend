import React, { useState } from 'react';
import { X, Calendar, Clock, Plus, FileText } from 'lucide-react';

// Define the prop types for the component
interface CreateNewTaskModalProps {
  onClose: () => void; // Prop for closing the modal
}

const CreateTask: React.FC<CreateNewTaskModalProps> = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startTime, setStartTime] = useState('Sep 12 2024 - 12:00');
  const [endTime, setEndTime] = useState('Sep 15 2024 - 12:00');
  const [estimate, setEstimate] = useState('24H:00M:00S');
  const [project, setProject] = useState('');
  const [assignee, setAssignee] = useState('');
  const [files, setFiles] = useState([
    { name: 'Cat.img', size: '1.2 MB', type: 'image' },
    { name: 'Document.docx', size: '1.2 MB', type: 'document' }
  ]);

  const handleAddFile = () => {
    // Implement file upload logic here
  };

  const handleSubmit = () => {
    // Implement task submission logic here
    console.log({
      taskName,
      taskDescription,
      startTime,
      endTime,
      estimate,
      project,
      assignee,
      files,
    });
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-[#1E2139] rounded-lg w-full scrollbar-hide p-3" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className=" p-3 space-y-3 ">
          <div className='mb-5'>
            <label className="block text-sm font-medium mb-3 text-white">Task name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter Task's Name"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-white">Task description:</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white placeholder-gray-400 h-12 resize-none"
            />
          </div>

          <div className="flex space-x-2  ">
            <div className="flex-1 ">
              <label className="block text-sm font-medium mb-3 text-white">Start time:</label>
              <div className="relative">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex-1 ">
              <label className="block text-sm font-medium mb-3 text-white">End time:</label>
              <div className="relative">
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="flex-1 ">
              <label className="block text-sm font-medium mb-3 text-white">Estimate:</label>
              <div className="relative">
                <input
                  type="text"
                  value={estimate}
                  onChange={(e) => setEstimate(e.target.value)}
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white pr-10"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <div className='flex-1 pt-2'>
            <label className="block text-sm font-medium mb-3 text-white">Add to project:</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Add
              </button>
            </div>
          </div>

          <div className='pt-2'>
            <label className="block text-sm font-medium mb-3 text-white">Assign to:</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  placeholder="Enter member name"
                  className="w-full bg-[#2A2F4A] rounded px-2 py-1 text-white"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Add
              </button>
            </div>
          </div>

          <div className='pt-2'>
            <label className="block text-sm font-medium mb-3 text-white">Upload file:</label>
            <div className="bg-[#2A2F4A] rounded p-3 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <button onClick={handleAddFile} className="bg-[#1E2139] rounded-lg p-2 hover:bg-opacity-80">
                  <Plus size={24} />
                </button>
                <div className="bg-[#1E2139] rounded-lg p-2">
                  <img src="/placeholder.svg?height=24&width=24" alt="Cat" className="w-6 h-6" />
                </div>
                <div className="bg-[#1E2139] rounded-lg p-2">
                  <FileText size={24} />
                </div>
              </div>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2 form-checkbox text-blue-600" />
                    <span>{file.name}</span>
                  </div>
                  <span>{file.size}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center items-center pt-5 pb-5'>

          <button onClick={handleSubmit} className="  bg-blue-600 text-white px-4 py-2 rounded">
            Create Task
          </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default CreateTask;
