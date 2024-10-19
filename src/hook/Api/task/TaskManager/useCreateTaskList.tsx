import { useMutation } from "@tanstack/react-query";
import rootApi from "../../../../services/initApi";
import endpoint from "../../../../services/endpoint";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../services/authContext";
import {
  notifyError,
  notifySuccess,
} from "../../../../component/toastify/Toastify";

type CreateTaskParams = {
  name: string;
  description: string;
  avatar: string;
};
type Respsone = {
  data: any;
};

const useCreateTaskList = () => {
  const { token } = useAuth();
  const success = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: CreateTaskParams) => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      return rootApi.post<CreateTaskParams, Respsone>(
        endpoint.createtasklist,
        variables,
        { headers }
      );
    },
    onSuccess: (e: any) => {
      notifySuccess(e?.data?.mesage || "Create Task List success");
      success("/tasklist");
    },
    onError: (e: any) => {
      notifyError(e?.data?.message || "Create Task List error ");
    },
  });
  return {
    isError,
    data: data?.data,
    error,
    onCreate: mutateAsync,
  };
};
export default useCreateTaskList;
