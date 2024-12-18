import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type Variables = {
    projectId?: string;
    today?: string; 
}

type Response = {
    data: any;
}


const useTodayTask = (variables: Variables) => {
    
    const {
        data,
        error,
        isError,
        isFetching,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await rootApi.post<Response>(endpoint.todaytask, variables);
            return response.data?.data
        },
        
    });
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
export default useTodayTask;