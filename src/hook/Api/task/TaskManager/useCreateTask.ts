import { useMutation } from "@tanstack/react-query"
import useApi from '../../../../services/initApi'
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
    const {isError, data, error, mutateAsync } = useMutation({
        mutationFn: (variables: CreateTaskParams) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            return useApi.post<CreateTaskParams, Respsone>(
                endpoint.createtask,
                variables,
                { headers }
            )
        },
        onSuccess: (e: any) => {
            notifySuccess(e?.data?.message || 'Create Task success ')
            success('/task')
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