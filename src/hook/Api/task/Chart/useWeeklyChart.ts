import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";
type Variables = {
    status : any;
    fromDate : string;
    toDate : string;

}
type response = {
    data : any;
}
const useWeeklyChart = (variables: Variables ) => {
    const { data, error, isError, isLoading, refetch } = useQuery({
        queryKey: [endpoint.weekly_chart, variables],
        queryFn: async () => {
            const response = await rootApi.post<response>(endpoint.weekly_chart,variables)
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
export default useWeeklyChart;