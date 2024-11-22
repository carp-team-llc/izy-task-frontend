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
import ProjectDetail from "../page/project/ProjectDetail"
import KabanBoard from "../page/Task/TaskBoard/components/KabanBoard";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";
import ShowProfile from "../page/profile/ShowProfile";

// Lazy load các trang chính
const HomePage = lazy(() => import("../page/home/HomePage"));
const DashBoard = lazy(() => import("../page/dashboard/DashBoard"));
const Task = lazy(() => import("../page/Task/Task"));
const TimeLine = lazy(() => import("../page/Task/TimeLine"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/home", element: <HomePage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/tasks", element: <Task /> },
      { path: "/timeline", element: <TimeLine /> },
      { path: "/profile", element: <CreateProfile /> },
      { path: "/showprofile", element: <ShowProfile /> },
      { path: "/tasklist", element: <TaskListParams /> },
      { path: "/tasklist/:id", element: <DetailTaskList /> }, // Add dynamic route for DetailTaskList
      { path: "/taskboard", element: <TaskBoard /> },
      { path: "/projectboard", element: <ProjectDashboard /> },
      { path: "/projectdetail", element: <ProjectDetail /> },
      { path: "/kaban", element: <KabanBoard /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectIfLoggedIn>
        <LoginPage />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectIfLoggedIn>
        <RegisterPage />
      </RedirectIfLoggedIn>
    ),
  },
  { path: "/verify/:uuid", element: <Verify /> },
]);

export default router;
