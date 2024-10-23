import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import Verify from "../page/404/Verify";
import CreateProfile from "../page/profile/CreateProfile";
import TaskListParams from "../page/Task/TaskListParams";
import DetailTaskList from "../page/Task/DetailTaskList";
import TaskBoard from "../page/Task/TaskBoard"; 
import ProjectDashboard from "../page/project/ProjectBoard";
import DetailTask from "../page/Task/DetailTask";

// Lazy load các trang chính
const App = lazy(() => import("../App"));
const HomePage = lazy(() => import("../page/home/HomePage"));
const DashBoard = lazy(() => import("../page/dashboard/DashBoard"));
const Task = lazy(() => import("../page/Task/Task"));
const TimeLine = lazy(() => import("../page/Task/TimeLine"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/home", element: <HomePage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/tasks", element: <Task /> },
      { path: "/timeline", element: <TimeLine /> },
      { path: "/profile", element: <CreateProfile /> },
      { path: "/tasklist", element: <TaskListParams /> },
      { path: "/tasklist/:id", element: <DetailTaskList /> }, // Add dynamic route for DetailTaskList
      { path: "/taskboard", element: <TaskBoard /> },
      { path: "/projectboard", element: <ProjectDashboard /> },
      { path: "/detailtask", element: <DetailTask /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/verify", element: <Verify /> },
]);
