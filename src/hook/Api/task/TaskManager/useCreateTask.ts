import { useMutation, useQueryClient } from "@tanstack/react-query"
import rootApi from '../../../../services/initApi'
import endpoint from '../../../../services/endpoint'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../services/authContext';
import { notifyError, notifySuccess } from "../../../../component/toastify/Toastify";

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
    const { token } = useAuth();
    const success = useNavigate();
    const QueryClient = useQueryClient();
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: CreateTaskParams) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            return rootApi.post<CreateTaskParams, Respsone>(
                endpoint.createtask,
                variables,
                { headers }
            )
        },
        onSuccess: (e: any) => {
            notifySuccess(e?.data?.message || 'Create Task success ')
            QueryClient.invalidateQueries({
                queryKey: [endpoint.personal_tasks]
            })
            success('/tasks')
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