import { useMutation } from "@tanstack/react-query"
import rootApi from "../../../services/initApi"
import endpoint from "../../../services/endpoint"

interface MeResponse {
  message: string;
  isLogin: boolean;
  userId: string;
}

const UseCheckLogin = () => {
  const { data, isError, error, mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const res = await rootApi.post<MeResponse>(endpoint.checkLogin);
      return res.data;
    },
  });

  return {
    data: data,
    isError,
    error,
    isPending,
    me: mutateAsync,
  };
};

export default UseCheckLogin;