import { useInfiniteQuery } from "@tanstack/react-query";
import endpoint from "../../../../services/endpoint";
import rootApi from "../../../../services/initApi";


type Variables = {
    where?: any;
    skip: number;
    take: number;
};

type Response = {
    data: any;
    totalCount: number;
    nextCusor?: number;
};


const usePersonalTaskList = (variables: Variables) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        isFetching,
        isRefetching,
        isLoading,
        refetch,

    } = useInfiniteQuery<Response, Error> ({
        queryKey: [endpoint.recenttask, variables],
        queryFn: async () => {
            return rootApi.post<Variables, Response>(endpoint.recenttask, {
                where: variables.where,
                take: variables.take,
                skip: variables.skip,
            });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalCount = lastPage?.totalCount || 0;
            const loadedItems = allPages?.map(page => page.data).flat().length;
            return loadedItems < totalCount ? loadedItems : undefined;
        },
    });

    return {
        isLoading,
        isError,
        data: data?.pages.flatMap(page => page.data) || [],
        error,
        refetch,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isRefetching,
        fetchNextPage,
    };
};


export default usePersonalTaskList;