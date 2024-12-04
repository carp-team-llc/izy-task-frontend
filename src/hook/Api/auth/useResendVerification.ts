import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import useApi from "../../../services/initApi";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";

type ResendParams = {
  email: string;
};

type Response = {
  data: any;
};

const useResendVerification = () => {
  const { isError, data, error,  mutateAsync } = useMutation({
    mutationFn: (variables: ResendParams) => {
      return useApi.post<ResendParams, Response>(endpoint.resend_verification, variables);
    },
    onSuccess: () => {
      notifySuccess("Resend email verification success, check your inbox.!");
    },
    onError: () => {
      notifyError("Resend email failed!");
    },
  });

  return {
    isError,
    data: data?.data,
    error,
    onResendVerify: mutateAsync,
  };
};

export default useResendVerification;
