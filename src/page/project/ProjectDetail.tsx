import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { NavLink, useParams } from "react-router-dom";
import UseProjectDetail from "../../hook/Api/project/useProjectDetail";
import OverviewTab from "./Component/Detail/Overview";
import ProjectTaskList from "./Component/Detail/ProjectTask/ProjectTaskList";
import KanBan from "./Component/Kanban/Kanban";
import ProjectMembersTab from "./Component/Detail/members/MemberList";

const TABS: Record<string, (props: { id: string, role: string }) => JSX.Element> = {
  Overview: () => <OverviewTab />,
  List: () => <ProjectTaskList />,
  KanBan: ({ id, role }) => <KanBan projectId={id} />,
  Members: ({ id, role }) => <ProjectMembersTab projectId={id} />,
};

const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { id } = useParams();
  const { detailProject } = UseProjectDetail({ id: id as string });

  const handleTabChange = (newTab: string) => {
    if (newTab !== activeTab) {
      const currentIndex = Object.keys(TABS).indexOf(activeTab);
      const newIndex = Object.keys(TABS).indexOf(newTab);
      setDirection(newIndex > currentIndex ? "right" : "left");
      setActiveTab(newTab);
    }
  };

  const renderActiveTab = TABS[activeTab as keyof typeof TABS];

  return (
    <div className="min-h-screen bg-[#0a061f] text-white p-4 text-start">
      <div className="max-w-[1400px] mx-auto space-y-4">
        <Header projectName={detailProject?.name} />

        <TabNav tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />

        <div className="mt-4 relative overflow-hidden">
          <TabTransition key={activeTab} direction={direction}>
            {renderActiveTab({ id: id as string, role: "" })}
          </TabTransition>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

// ---------- Header Component ----------
const Header = ({ projectName }: { projectName?: string }) => (
  <div className="flex flex-wrap text-start justify-between items-center gap-4">
    <div className="flex items-center gap-4">
      <NavLink
        to="/projectboard"
        className="text-gray-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft size={18} />
      </NavLink>
      <h1 className="text-xl md:text-2xl font-bold">{projectName}</h1>
      <div className="flex gap-2">
        <IconButton icon="search" />
        <IconButton icon="bell" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="bg-indigo-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
        + Invite
      </button>
      <div className="flex -space-x-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0a061f]"
          />
        ))}
      </div>
    </div>
  </div>
);

const IconButton = ({ icon }: { icon: "search" | "bell" }) => {
  const paths: Record<string, string> = {
    search:
      "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    bell: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
  };
  return (
    <button className="bg-gray-700/50 rounded-full p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[icon]} />
      </svg>
    </button>
  );
};

// ---------- TabNav Component ----------
const TabNav = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: Record<string, (props: { id: string, role: string }) => JSX.Element>;
  activeTab: string;
  onChange: (tab: string) => void;
}) => (
  <div className="flex gap-4 overflow-x-auto border-b border-gray-800 pb-2">
    {Object.keys(tabs).map((tabKey) => (
      <button
        key={tabKey}
        onClick={() => onChange(tabKey)}
        className={`text-sm whitespace-nowrap ${
          activeTab === tabKey ? "text-indigo-400" : "text-gray-400"
        }`}
      >
        {tabKey}
      </button>
    ))}
  </div>
);

// ---------- TabTransition Component ----------
const TabTransition = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: "left" | "right";
}) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div
        className={`transition-all duration-300 ease-in-out w-full ${
          isAnimating
            ? `opacity-0 transform ${
                direction === "right" ? "translate-x-10" : "-translate-x-10"
              }`
            : "opacity-100 transform translate-x-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
