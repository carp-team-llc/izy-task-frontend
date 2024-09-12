
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/auth/login/LoginPage";
import { lazy } from "react";
import RegisterPage from "../page/auth/register/RegisterPage";


const App = lazy(() => import("../App"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "/login", element: <LoginPage></LoginPage> },
      { path: "/register", element: <RegisterPage></RegisterPage> },
     
    ],
  },
]);

  