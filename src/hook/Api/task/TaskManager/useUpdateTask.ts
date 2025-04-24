import { useMutation, useQueryClient } from "@tanstack/react-query"
import rootApi from '../../../../services/initApi'
import endpoint from '../../../../services/endpoint'
import { notifyError, notifySuccess } from "../../../../component/toastify/Toastify";

type UpdateTaskParams = {
    id: string;
    name?: string;
    body?: string;
    images?: string[];
    expirationDate?: string;
}
type Respsone = {
    data: any;
}

const useUpdateTask = () => {
    const QueryClient = useQueryClient();
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: UpdateTaskParams) => {
            return rootApi.post<UpdateTaskParams, Respsone>(
                endpoint.updatetask,
                variables,
                {  withCredentials: true }
            )
        },
        onSuccess: async (e: any) => {
            notifySuccess(e?.data?.message || 'Update Task success ')
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.tasklist],
            });
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.personal_tasks],
            });
        },
        onError: (e: any) => {
            notifyError(e?.data?.message || 'Update Task error ')
        }
    })
    return {
        isError,
        data: data?.data,
        error,
        onUpdate: mutateAsync
    }
}
export default useUpdateTask