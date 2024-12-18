import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";
import { v4 as uuidv4 } from 'uuid';

type RegisterParams = {
    username : string;
    password : string;
    email : string;
    phone : string;
}
type Response = {
    data : any;
}

const UseRegister = () => {
    const success = useNavigate();
    const { isError, data, error, status, mutateAsync } = useMutation({
        mutationFn: (Variable: RegisterParams) => {
            return rootApi.post<RegisterParams, Response>(
                endpoint.register,
                Variable
            )
        },
        onSuccess: (e: any) => {
            notifySuccess(e?.response?.data?.message || 'Registered successfully!')
            const uuid = uuidv4();
            sessionStorage.setItem('registrationUUID', uuid);
            success(`/verify/${uuid}?email=${e?.response?.data?.email}`);
        },
        onError: (e: any) => {
            notifyError(e.response?.data?.message || "An error occurred!")
        }
    })

    const isLoading = status === 'pending';

    return {
        isError,
        data,
        error,
        isLoading,
        onRegister: mutateAsync,
    }
}
export default UseRegister;