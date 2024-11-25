import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type Variables = {
    projectId?: string;
}

type Response = {
    data: any;
}


const useMetric = (variables: Variables) => {
    const {
        data,
        error,
        isError,
        isFetching,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [endpoint.metric, variables ],
        queryFn: async () => {
            const response = await rootApi.post<Response>(endpoint.metric, variables);
      
            return response.data.data
        },
    });
    console.log("===>", JSON.stringify(data,null,2))

    return {
        isLoading,
        isError,
        data: data,
        error,
        refetch,
        isFetching,
        isRefetching
    };

};
export default useMetric;