import { useMutation } from '@tanstack/react-query'
import useApi from '../../../services/initApi'
import endpoint from '../../../services/endpoint'
import { useNavigate } from 'react-router-dom';


type LoginParams = {
  email: string;
  password: string;
}

type Response = {
  data: any;
}

const useLogin = () => {
  const success = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return useApi.post<LoginParams, Response>(
        endpoint.login,
        variables
      )
    },
    onSuccess: (e: any) => {
      alert(e?.response?.data?.message || 'Come on Baby')
      success('/dashboard')

    },
    onError: (e: any) => {
      alert(e?.response?.data?.message || 'Đã có lỗi xảy ra')
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
