import { useMutation, useQueryClient } from "@tanstack/react-query"
import rootApi from '../../../../services/initApi'
import endpoint from '../../../../services/endpoint'
import { notifyError, notifySuccess } from "../../../../component/toastify/Toastify";
import { useAuth } from "../../../../services/authContext";

type DeleteTaskParams = {
    id?: string;
    body?: string;
}
type Respsone = {
    data: any;
}

const useDeleteTask = () => {
    const { token } = useAuth();
    const QueryClient = useQueryClient();
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: DeleteTaskParams) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            return rootApi.post<DeleteTaskParams, Respsone>(
                endpoint.deletetask,
                variables,
                { headers }
            )
        },
        onSuccess: async (e: any) => {
            notifySuccess(e?.data?.message || 'Detete Task success ')
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.tasklist],
            });
            await QueryClient.invalidateQueries({
                queryKey: [endpoint.personal_tasks],
            });
        },
        onError: (e: any) => {
            notifyError(e?.data?.message || 'Detete Task error ')
        }
    })
    return {
        isError,
        data: data?.data,
        error,
        onDelete: mutateAsync
    }
}
export default useDeleteTask