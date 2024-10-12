import { Bounce, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message: string, options?: ToastOptions) => {
  console.log("Success toast triggered");
  toast.success(message, {
    ...options,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    ...options,
    className: "bounce",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifyInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    ...options,
    className: "bounce",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
