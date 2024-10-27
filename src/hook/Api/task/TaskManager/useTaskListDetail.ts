import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";

type Variables = {
  id?: string;
};

type Response = {
  detail: any;
  data: any;
};

const useTaskListDetail = (variables: Variables) => {
  const {
    data,
    error,
    isError,
    isFetching,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [endpoint.task_list_detail, variables],
    queryFn: async () => {
    const response =  await rootApi.post<Response>(endpoint.task_list_detail, variables);
    return response.data.detail
    },
  });
  return {
    isLoading,
    isError,
    data: data,
    error,
    refetch,
    isFetching,
    isRefetching,
  };
};

export default useTaskListDetail;
