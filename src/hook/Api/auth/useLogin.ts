import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import useApi from "../../../services/initApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/authContext";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";

type LoginParams = {
  email: string;
  password: string;
};

type Response = {
  data: any;
};

const useLogin = () => {
  const { setToken } = useAuth();
  const success = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return useApi.post<LoginParams, Response>(endpoint.login, variables);
    },
    onSuccess: (e: any) => {
      notifySuccess("Login success");
      setToken(e?.data?.accessToken);
      success("/dashboard");
    },
    onError: () => {
      notifyError("Login failed");
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
