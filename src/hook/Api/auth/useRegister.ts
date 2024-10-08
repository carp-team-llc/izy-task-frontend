import { useMutation } from "@tanstack/react-query";
import useApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";

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
    const { isError, data, error, mutateAsync } = useMutation({
        mutationFn: (Variable: RegisterParams) => {
            return useApi.post<RegisterParams, Response>(
                endpoint.register,
                Variable
            )
        },
        onSuccess: (e: any) => {
            notifySuccess(e?.response?.data?.message || 'Registered successfully!')
            success('/verify')
        },
        onError: (e: any) => {
            notifyError(e.response?.data?.message || "An error occurred!")
        }
    })
    return {
        isError,
        data,
        error,
        onRegister: mutateAsync,
    }
}
export default UseRegister;