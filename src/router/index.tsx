import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import CheckInfomation from "../page/404/CheckInfomation";
import ForgotPasswordPage from "../page/404/ForgotPassword";
import NewPasswordPage from "../page/404/NewPassword";
import ResendVerification from "../page/404/ResendVerification";
import Verify from "../page/404/Verify";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import MyProfile from "../page/profile/MyProfile";
import ShowProfile from "../page/profile/ShowProfile";
import ProjectDashboard from "../page/project/ProjectBoard";
import ProjectDetail from "../page/project/ProjectDetail";
import DetailTaskList from "../page/Task/DetailTaskList";
import TaskBoard from "../page/Task/TaskBoard";
import KabanBoard from "../page/Task/TaskBoard/components/KabanBoard";
import TaskList from "../page/Task/TaskList";
import ProtectedRoute from "./ProtectedRoute";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";
import SetTing from "../page/setting/SetTing";

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
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "home", element: <HomePage /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "tasks", element: <Task /> },
      { path: "timeline", element: <TimeLine /> },
      { path: "profile", element: <MyProfile /> },
      { path: "showprofile", element: <ShowProfile /> },
      { path: "tasklist", element: <TaskList /> },
      { path: "tasklist/:id", element: <DetailTaskList /> }, // Add dynamic route for DetailTaskList
      { path: "taskboard", element: <TaskBoard /> },
      { path: "projectboard", element: <ProjectDashboard /> },
      { path: "projectdetail/:id", element: <ProjectDetail /> },
      { path: "kaban", element: <KabanBoard /> },
      { path: "setting", element: <SetTing /> },
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
  {
    path: "/forgot-password",
    element: (
      <RedirectIfLoggedIn>
        <ForgotPasswordPage />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <RedirectIfLoggedIn>
        <CheckInfomation />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/new-password",
    element: (
      <RedirectIfLoggedIn>
        <NewPasswordPage />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: "/resend-verification",
    element: <ResendVerification />,
  },
  { path: "/verify/:uuid", element: <Verify /> },
]);

export default router;
