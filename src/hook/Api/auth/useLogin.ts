import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../services/authContext';
import endpoint from '../../../services/endpoint';
import useApi from '../../../services/initApi';


type LoginParams = {
  email: string;
  password: string;
}

type Response = {
  data: any;
}

const useLogin = () => {
  const { setToken } = useAuth();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return useApi.post<LoginParams, Response>(
        endpoint.login,
        variables
      )
    },
    onSuccess: (e: any) => {
      setToken(e?.data?.accessToken)
      console.log(e?.data?.message || 'Login success!')
    },
    onError: (e: any) => {
      console.log(e?.data?.message || 'Đã có lỗi xảy ra')
    }
  })
  
  return {
    isError,
    data: data?.data,
    error,
    onLogin: mutateAsync
  }
}

export default useLogin
