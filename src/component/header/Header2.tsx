import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import CreateTask from "../../page/Task/CreateTask"; // Updated import
import { NavLink } from "react-router-dom";

const Header2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-[-10px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white text-2xl font-bold">Task</h2>
        <div className="flex items-center space-x-4 mb-">
          <NavLink
            to="/tasklist"
            className="bg-purple-600 text-white px-3 py-1.5 rounded-lg flex items-center text-sm"
          >
            <span>Task List</span>
          </NavLink>
          <button
            onClick={handleOpenModal}
            className="bg-purple-600 text-white px-3 py-1.5 rounded-lg flex items-center text-sm"
          >
            <Plus size={18} className="mr-2" />
            Create New Task
          </button>
          <button className="bg-gray-700 text-white px-3 py-1.5 rounded-lg flex items-center text-sm">
            <Upload size={18} className="mr-2" />
            Import
          </button>
        </div>
      </div>
      {isModalOpen && <CreateTask onClose={handleCloseModal} />}
    </div>
  );
};

export default Header2;
