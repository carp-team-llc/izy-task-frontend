import { useMutation } from "@tanstack/react-query";
import useApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";


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
    const { isError, data, error, mutateAsync } = useMutation({
        mutationFn: (Variable: RegisterParams) => {
            return useApi.post<RegisterParams, Response>(
                endpoint.register,
                Variable
            )
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