
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/auth/login/LoginPage";
import { lazy } from "react";


const App = lazy(() => import("../App"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "/login", element: <LoginPage></LoginPage> },
     
    ],
  },
]);

  