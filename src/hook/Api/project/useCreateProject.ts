import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notifyError,
  notifySuccess,
} from "../../../component/toastify/Toastify";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type CreateProjectParams = {
  name: string;
  description: string;
  avatar: string;
  deadline: string;
  permission: string;
  timeworking: number;
  member: string[];
  tasks: any;
  startTime: string;
};
type Respsone = {
  data: any;
};

const useCreateProject = () => {
  const QueryClient = useQueryClient();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: CreateProjectParams) => {
      return rootApi.post<CreateProjectParams, Respsone>(
        endpoint.create_project,
        variables,
        { withCredentials: true }
      );
    },
    onSuccess: async (e: any) => {
      notifySuccess(e?.data?.message || "Create Project success ");
      await QueryClient.invalidateQueries({
        queryKey: [endpoint.project_list],
      });
    },
    onError: (e: any) => {
      notifyError(e?.data?.message || "Create Project error ");
    },
  });
  return {
    isError,
    data: data?.data,
    error,
    onCreate: mutateAsync,
  };
};
export default useCreateProject;
