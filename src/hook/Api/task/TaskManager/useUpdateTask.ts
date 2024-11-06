import { useMutation, useQueryClient } from "@tanstack/react-query"
import rootApi from '../../../../services/initApi'
import endpoint from '../../../../services/endpoint'
import { notifyError, notifySuccess } from "../../../../component/toastify/Toastify";
import useAuth from "../../../../services/authContext";

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
    const { token } = useAuth();
    const QueryClient = useQueryClient();
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: UpdateTaskParams) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            return rootApi.post<UpdateTaskParams, Respsone>(
                endpoint.updatetask,
                variables,
                { headers }
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