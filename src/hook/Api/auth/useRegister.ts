import { useMutation } from "@tanstack/react-query";
import useApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";
import { useNavigate } from 'react-router-dom';

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
            alert(e?.response?.data?.message || 'Đăng ký oke rồi đó cu')
            success('/verify')
        },
        onError: (e: any) => {
            alert(e.response?.data?.message || "Đã có lỗi xảy ra")
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