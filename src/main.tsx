import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./services/authContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback ="Loading">
        <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
);
