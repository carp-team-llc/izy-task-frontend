import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";

type Variables = {
  status: any,
  createdAt: string,
}

type Response = {
  data: any
}

const UseDailyChart = (variables: Variables) => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: [endpoint.daily_chart, variables],
    queryFn: async () => {
      const response = await rootApi.post<Response>(endpoint.daily_chart, variables) // xu ly api voi endpoint truoc va body sau
      return response.data.data
    }
  })
  return {
    data: data,
    isLoading: isLoading,
    error: error,
    isError: isError,
    refetch: refetch,
  }
}

export default UseDailyChart;