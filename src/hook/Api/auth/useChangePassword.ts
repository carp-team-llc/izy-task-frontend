import { useMutation } from "@tanstack/react-query";
import rootApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";
import { useNavigate } from "react-router-dom";

type ChangePaswordParams = {
  email: string;
  token: string;
  newPassword: string;
}

type Response = {
  data: any;
}
const UseChangePassword = () => {
  const navigate = useNavigate();
  const { isError, error, data, mutateAsync, isPending } = useMutation({
    mutationFn: async (variable: ChangePaswordParams) => {
      return  await rootApi.post<ChangePaswordParams, Response>(endpoint.change_password, variable);
    },
    onSuccess: () => {
      notifySuccess("Changed password succesfully, please login.")
      navigate("/login");
    },
    onError: (e: any) => {
      notifyError(e.data)
    }
  })

  return {
    isError,
    error,
    data,
    isPending,
    onChangePassword: mutateAsync,
  }
}

export default UseChangePassword;