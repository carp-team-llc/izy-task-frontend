import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "../page/auth/register/RegisterPage";
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
      
      { path: "/", element: <Navigate to="/" /> },
      { path: "/home", element: <HomePage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "/task", element: <Task /> },
      { path: "/timeline", element: <TimeLine/> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

