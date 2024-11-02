import { useMutation, useQueryClient } from "@tanstack/react-query";
import rootApi from "../../../../services/initApi";
import endpoint from "../../../../services/endpoint";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
} from "../../../../component/toastify/Toastify";
import useAuth from "../../../../services/authContext";

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
  const QueryClient = useQueryClient();
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
      QueryClient.invalidateQueries({
        queryKey: [endpoint.personal_tasks],
      });
      QueryClient.invalidateQueries({
        queryKey: [endpoint.tasklist],
      });
      QueryClient.invalidateQueries({
        queryKey: [endpoint.task_list_detail],
      });
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
