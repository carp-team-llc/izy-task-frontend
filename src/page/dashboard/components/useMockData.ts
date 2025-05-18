// src/hooks/useMockData.ts
import { useState, useEffect } from "react";
import { Task, Project, MockDailyChartResponse } from "../Dashboard.type";

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Implement login feature",
    status: "DOING",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: "Alice",
    projectName: "Project Alpha",
  },
  {
    id: "2",
    name: "Design database schema",
    status: "LATE",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: "Bob",
    projectName: "Project Beta",
  },
  {
    id: "3",
    name: "Write API documentation",
    status: "PENDING",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    projectName: "Project Alpha",
  },
  {
    id: "4",
    name: "Deploy to staging",
    status: "COMPLETED",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: "Charlie",
    projectName: "Project Gamma",
  },
  {
    id: "5",
    name: "User testing session",
    status: "DOING",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: "Alice",
    projectName: "Project Gamma",
  },
  {
    id: "6",
    name: "Fix critical bug #102",
    status: "LATE",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: "David",
    projectName: "Project Beta",
  },
];

const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Project Alpha",
    progress: 75,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "ON_TRACK",
    memberCount: 5,
  },
  {
    id: "p2",
    name: "Project Beta",
    progress: 40,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: "AT_RISK",
    memberCount: 3,
  },
  {
    id: "p3",
    name: "Project Gamma",
    progress: 90,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "ON_TRACK",
    memberCount: 7,
  },
  {
    id: "p4",
    name: "Project Delta (Overdue)",
    progress: 60,
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "OFF_TRACK",
    memberCount: 4,
  },
];

// Giả lập UseDailyChart
interface BarVariables {
  status: string[];
  createdAt: string;
}

export const useMockDailyChart = (body: BarVariables) => {
  const [data, setData] = useState<MockDailyChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching daily chart with params:", body);
    setTimeout(() => {
      const chartData: MockDailyChartResponse = {
        taskChart: [
          {
            statusInfo: { engName: "NEW", color: "#06a2c9" },
            total: Math.floor(Math.random() * 10),
          },
          {
            statusInfo: { engName: "PENDING", color: "#c99506" },
            total: Math.floor(Math.random() * 10),
          },
          {
            statusInfo: { engName: "DOING", color: "#ff5482" },
            total: Math.floor(Math.random() * 15),
          },
          {
            statusInfo: { engName: "LATE", color: "#d92a02" },
            total: Math.floor(Math.random() * 5),
          },
          {
            statusInfo: { engName: "COMPLETED", color: "#0eb53b" },
            total: Math.floor(Math.random() * 20),
          },
          {
            statusInfo: { engName: "CANCEL", color: "#7d7d7d" },
            total: Math.floor(Math.random() * 3),
          },
        ].filter(
          (item) =>
            body.status.includes(item.statusInfo.engName) ||
            body.status.length === 0
        ), // Filter if statuses are provided
        totalTask: 0,
      };
      chartData.totalTask = chartData.taskChart.reduce(
        (sum: any, item: any) => sum + item.total,
        0
      );
      setData(chartData);
      setLoading(false);
    }, 500);
  }, [body.status, body.createdAt]); // Re-fetch if body changes

  return { data, loading };
};

export const useMockDashboardData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks);
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const ongoingTasks = tasks.filter((task) => task.status === "DOING");
  const lateTasks = tasks.filter((task) => task.status === "LATE");
  const upcomingDeadlines = projects.filter((p) => {
    const diff = new Date(p.deadline).getTime() - Date.now();
    return (
      diff > 0 && diff < 7 * 24 * 60 * 60 * 1000 && p.status !== "COMPLETED"
    ); // Deadline within 7 days
  });

  return {
    tasks,
    projects,
    ongoingTasks,
    lateTasks,
    upcomingDeadlines,
    loading,
  };
};
