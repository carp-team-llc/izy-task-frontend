import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";


type CheckValidParams = {
  email: string;
  token: string;
  resetPasswordCreatedAt: string;
  resetPasswordExpires: string;
};

type Response = {
  data: any;
}
const useCheckValidInfomation = () => {
  const { isError, error, data, mutateAsync } = useMutation({
    mutationFn: async (variables: CheckValidParams) => {
      return await rootApi.post<CheckValidParams, Response>(endpoint.check_valid_information, variables);
    },
    onSuccess: () => {},
    onError: () => {}
  })
  return {
    isError,
    data,
    error,
    onCheckValid: mutateAsync,
  }
}

export default useCheckValidInfomation;