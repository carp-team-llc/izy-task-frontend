import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./services/authContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import ToastifyProvider from "./component/toastify/Toastify.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="Loading">
        <AuthProvider>
          <ToastifyProvider>
            <RouterProvider router={router}></RouterProvider>
          </ToastifyProvider>
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
