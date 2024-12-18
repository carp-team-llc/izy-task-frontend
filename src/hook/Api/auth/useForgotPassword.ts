import { useNavigate } from "react-router-dom";
import rootApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";
import { useMutation } from "@tanstack/react-query";

type ForgotPasswordParams = {
  email: string;
};

type Response = {
  data: any;
};

const useForgotPassword = () => {
  const navigate = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: ForgotPasswordParams) => {
      return rootApi.post<ForgotPasswordParams, Response>(endpoint.forgot_password, variables);
    },
    onSuccess: (response: any) => {
      notifySuccess(response?.data?.message || "Reset password link sent to your email!");
      navigate("/login");
    },
    onError: (e: any) => {
      notifyError(e.data.data.message);
    }
  });
  return {
    isError,
    data: data?.data,
    error,
    onForgot: mutateAsync,
  }
}

export default useForgotPassword;