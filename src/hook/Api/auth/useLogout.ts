import { useMutation } from "@tanstack/react-query";

import rootApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";

type Response = {
  data: {
    statusCode: number;
    message: string;
  }
}

const UseLogOut = () => {
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: async () => {
      return rootApi.post<Response>(endpoint.logout);
    },
    onSuccess: (res: any) => {
      notifySuccess(res?.data?.data?.message);
    },
    onError: (e: any) => {
      notifyError(e?.data?.data?.message);
    }
  })

  return {
    isError,
    data,
    error,
    onLogout: mutateAsync
  }
}

export default UseLogOut;