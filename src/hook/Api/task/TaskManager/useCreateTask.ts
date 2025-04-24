import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../../component/toastify/Toastify";
import endpoint from '../../../../services/endpoint';
import rootApi from '../../../../services/initApi';

type CreateTaskParams = {
    name: string;
    body: string;
    images: string[];
    expirationDate: string;
}
type Respsone = {
    data: any;
}

const useCreateTask = () => {
    const QueryClient = useQueryClient();
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: CreateTaskParams) => {
            return rootApi.post<CreateTaskParams, Respsone>(
                endpoint.createtask,
                variables,
                {  withCredentials: true }
            )
        },
        onSuccess: async (e: any) => {
            notifySuccess(e?.data?.message || 'Create Task success ')
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.personal_tasks],
            });
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.task_list_detail],
            });
        },
        onError: (e: any) => {
            notifyError(e?.data?.message || 'Create Task error ')
        }
    })
    return {
        isError,
        data: data?.data,
        error,
        onCreate: mutateAsync
    }
}
export default useCreateTask