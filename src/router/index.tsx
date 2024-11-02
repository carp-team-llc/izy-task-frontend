import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Verify from "../page/404/Verify";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import CreateProfile from "../page/profile/CreateProfile";
import ProjectDashboard from "../page/project/ProjectBoard";
import DetailTaskList from "../page/Task/DetailTaskList";
import TaskBoard from "../page/Task/TaskBoard";
import TaskListParams from "../page/Task/TaskListParams";
import ProtectedRoute from "./ProtectedRoute";

// Lazy load các trang chính
const HomePage = lazy(() => import("../page/home/HomePage"));
const DashBoard = lazy(() => import("../page/dashboard/DashBoard"));
const Task = lazy(() => import("../page/Task/Task"));
const TimeLine = lazy(() => import("../page/Task/TimeLine"));

const getAccessToken = () => {
  return localStorage.getItem("AUTH_IZY_TASK")
}

const isAuthenticated = () => {
  return !!getAccessToken();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
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
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/verify/:uuid", element: <Verify /> },
]);

export default router;