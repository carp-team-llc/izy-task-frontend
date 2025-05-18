import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Verify from "../page/404/Verify";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
import CreateProfile from "../page/profile/CreateProfile";
import ProjectDashboard from "../page/project/ProjectBoard";
import DetailTaskList from "../page/Task/DetailTaskList";
import TaskBoard from "../page/Task/TaskBoard";
import TaskList from "../page/Task/TaskList";
import ProtectedRoute from "./ProtectedRoute";
import ProjectDetail from "../page/project/ProjectDetail";
import KabanBoard from "../page/Task/TaskBoard/components/KabanBoard";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";
import ShowProfile from "../page/profile/ShowProfile";
import ResendVerification from "../page/404/ResendVerification";
import ForgotPasswordPage from "../page/404/ForgotPassword";
import NewPasswordPage from "../page/404/NewPassword";
import CheckInfomation from "../page/404/CheckInfomation";
import MyProfile from "../page/profile/MyProfile";

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
      { path: "profile", element: <CreateProfile /> },
      { path: "showprofile", element: <ShowProfile /> },
      // { path: "my-profile", element: <MyProfile userId={userId} /> }, // Replace with actual userId
      { path: "tasklist", element: <TaskList /> },
      { path: "tasklist/:id", element: <DetailTaskList /> }, // Add dynamic route for DetailTaskList
      { path: "taskboard", element: <TaskBoard /> },
      { path: "projectboard", element: <ProjectDashboard /> },
      { path: "projectdetail/:id", element: <ProjectDetail /> },
      { path: "kaban", element: <KabanBoard /> },
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
