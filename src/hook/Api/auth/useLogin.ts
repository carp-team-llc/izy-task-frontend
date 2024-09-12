import { useMutation } from '@tanstack/react-query'
import useApi from '../../../services/initApi'
import endpoint from '../../../services/endpoint'

type LoginParams = {
  email: string;
  password: string;
}

type Response = {
  data: any;
}

const useLogin = () => {
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: LoginParams) => {
      return useApi.post<LoginParams, Response>(
        endpoint.login,
        variables
      )
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message || 'Đã có lỗi xảy ra')
    }
  })
  
  return {
    isError,
    data,
    error,
    onLogin: mutateAsync
  }
}

export default useLogin
