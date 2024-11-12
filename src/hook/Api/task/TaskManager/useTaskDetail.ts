import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";

type Variables = {
    id?: string;
}

type Response = {
    detail: any;
    data: any;
}


const useTaskDetail = (variables: Variables) => {
    const {
        data,
        error,
        isError,
        isFetching,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [endpoint.detailtask, variables ],
        queryFn: async () => {
            const response = await rootApi.post<Response>(endpoint.detailtask, variables);
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
        isRefetching
    };

};
export default useTaskDetail;