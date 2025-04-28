import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./services/authContext.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import router from "./router/index.tsx";
import Skeleton from "./component/common/skeleton.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-[#0F0F35]">
            <div className="space-y-4 w-80">
              <Skeleton className="h-6 w-2/3 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-10 w-full mx-auto mt-6" />
            </div>
          </div>
        }
      >
        <AuthProvider>
          <>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              draggablePercent={60}
              transition={Bounce}
            />
          </>
        </AuthProvider>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
