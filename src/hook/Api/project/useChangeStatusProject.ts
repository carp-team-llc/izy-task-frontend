import { useMutation } from "@tanstack/react-query";
import rootApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";

type ChangeStatusProjectParams = {
  id: string;
  projectId: string;
  statusKey: string;
}

type ChangeStatusProjectResponse = {
  message: string;
  data: any
}

const UseChangeStatusProject = () => {
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: ChangeStatusProjectParams) => {
      return rootApi.post<ChangeStatusProjectParams, ChangeStatusProjectResponse>(endpoint.change_status_project, variables, {
        withCredentials: true,
      });
    },
    onSuccess: async  () => {},
    onError: () => {},
  });

  return {
    isError,
    data: data?.data,
    error,
    onChangeStatus: mutateAsync,
  };
}

export default UseChangeStatusProject;