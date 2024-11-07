import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";

type Response = {
  data: any;
};

const useChooseTaskList = () => {
  const {
    data,
    error,
    isError,
    isFetching,
    isRefetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [endpoint.choose_task_list],
    queryFn: async () => {
    const response =  await rootApi.post<Response>(endpoint.choose_task_list);
    return response.data.data
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

export default useChooseTaskList;
