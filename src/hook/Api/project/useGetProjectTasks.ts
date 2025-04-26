import { useQuery } from "@tanstack/react-query";
import rootApi from "../../..//services/initApi";
import endpoint from "../../../services/endpoint";

type Variables = {
  projectId: string;
};

type Response = {
  message: string;
  data: any;
};

const useGetProjectTasks = (variables: Variables) => {
  const {
    data,
    error,
    isError,
    isFetching,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery<Response, Error>({
    queryKey: [endpoint.project_task_list, variables],
    queryFn: async () => {
      return rootApi.post<Variables, Response>(endpoint.project_task_list, variables);
    },
  });

  return {
    isLoading,
    isError,
    data: data?.data?.data,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useGetProjectTasks;
