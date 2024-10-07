// ToastifyProvider.tsx
import React, { ReactNode } from "react";
import { ToastContainer, toast, ToastOptions, Bounce } from "react-toastify";
interface ToastifyProviderProps {
  children: ReactNode;
}

// Tạo các hàm toast để sử dụng dễ dàng
export const notifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...options, className: "bounce" });
};

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...options, className: "bounce" });
};

export const notifyInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...options, className: "bounce" });
};

const ToastifyProvider: React.FC<ToastifyProviderProps> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {children}
    </>
  );
};

export default ToastifyProvider;
