import React, { useEffect, useState } from "react";
import { Plus, Upload, MoreVertical, Grid } from "lucide-react";
import Activate from "../project/Component/Board/Activate";
import Timeline from "../project/Component/Board/Timeline";
import useProjectList from "../../hook/Api/project/useProjectList";
import Helper from "../../constant/Helper";
import CreateProject from "../../page/project/Component/Board/CreateProject";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  lastModified: string;
  deadline: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    lastModified: "Feb 25, 2022",
    deadline: "Feb 25, 2022",
  },
  {
    id: 2,
    name: "Project 2",
    lastModified: "Feb 25, 2022",
    deadline: "Feb 25, 2022",
  },
  {
    id: 3,
    name: "Project 3",
    lastModified: "Feb 25, 2022",
    deadline: "Feb 25, 2022",
  },
  {
    id: 4,
    name: "Project 4",
    lastModified: "Feb 25, 2022",
    deadline: "Feb 25, 2022",
  },
];

const ProjectList: React.FC<{
  projects: Project[];
  onProjectClick: (project: Project) => void;
}> = ({ projects, onProjectClick }) => {
  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProjectList({ where: {}, skip: 0, take: 10 });

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }
  if (isError) {
    return <div>Error loading tasks: {error?.message}</div>;
  }

  return (
    <div className="space-y-2">
      {data[0]?.project?.map((project: any) => (
        <div
          key={project.id}
          className="flex items-center py-2 px-4 rounded-lg bg-indigo-900/30 cursor-pointer"
          onClick={() => onProjectClick(project)}
        >
          <div className="flex items-center space-x-3 flex-grow">
            <div className="bg-yellow-500/20 p-2 rounded">
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <span className="text-white font-medium">{project.name}</span>
          </div>
          <span className="w-32 text-right text-gray-400 text-sm">
            {Helper.formatEngDate(project.createdAt)}
          </span>
          <span className="w-32 text-right text-gray-400 text-sm">
            {Helper.formatEngDate(project.updatedAt)}
          </span>
          <MoreVertical size={16} className="w-8 text-gray-400" />
        </div>
      ))}
    </div>
  );
};

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: any) => {
    navigate(`/projectdetail/${project.id}`);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen  text-white">
      {/* Navbar */}
      <div className="flex items-center p-4 flex-wrap space-y-2 md:space-y-0">
        <h1 className="text-3xl font-bold text-indigo-400 flex-grow">Project</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleOpenModal}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center text-sm"
          >
            <Plus size={16} className="mr-2" />
            Create New Project
          </button>
          <button className="bg-indigo-600/20 hover:bg-indigo-600/30 px-4 py-2 rounded-lg flex items-center text-sm">
            <Upload size={16} className="mr-2" />
            Import
          </button>
          <button className="bg-indigo-600/20 hover:bg-indigo-600/30 p-2 rounded-lg">
            <Grid size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row p-4 md:space-x-8 space-y-4 md:space-y-0">
        {/* Project list */}
        <main className="flex-grow bg-[#05051F] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All projects</h2>
          </div>
          <ProjectList projects={projects} onProjectClick={handleProjectClick} />
        </main>

        {/* Sidebar */}
        <aside className="md:w-80 w-full space-y-6">
          <Activate />
          <div className="w-full bg-[#0a0721] text-white p-6 rounded-xl">
            <Timeline />
          </div>
        </aside>
      </div>

      {/* Modal for Selected Project */}
      {isModalOpen && <CreateProject onClose={handleCloseModal} />}
    </div>
  );
}
