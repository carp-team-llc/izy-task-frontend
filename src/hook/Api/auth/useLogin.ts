import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
} from "../../../component/toastify/Toastify";
import endpoint from "../../../services/endpoint";
import useApi from "../../../services/initApi";
import { useAuth } from "../../../services/authContext";

type LoginParams = {
  email: string;
  password: string;
};

type Response = {
  data: any;
};

const useLogin = () => {
  const success = useNavigate();
  const { refetchAuth } = useAuth(); 
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return useApi.post<LoginParams, Response>(endpoint.login, variables, {
        withCredentials: true,
      });
    },
    onSuccess: async  () => {
      notifySuccess("Login success");
      await refetchAuth();
      success("/dashboard");
    },
    onError: (e: any) => {
      const errorCode = e?.response?.data?.errorCode;

      if (errorCode === "PASSWORD_INCORRECT") {
        notifyError("Wrong password, please re-enter password!");
        success("/login");
        return;
      }

      if (errorCode === "NOT_FOUND") {
        notifyError("No account found with this email!");
        success("/login");
        return;
      }

      if (errorCode === "NONVERIFY") {
        notifyError("Please verify your account!");
        success(`/resend-verification?email=${e?.response?.data?.email}`);
        return;
      }

      success("/login");
      notifyError("Login Failed");
    },
  });

  return {
    isError,
    data: data?.data,
    error,
    onLogin: mutateAsync,
  };
};

export default useLogin;
