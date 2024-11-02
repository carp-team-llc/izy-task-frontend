import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";
import useAuth from "../../../services/authContext";

type UploadParams = {
  file: any;
};
type response = {
  data: any;
};

const useUpload = () => {
  const { setToken, token } = useAuth();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: async (variables: UploadParams) => {
      const formdata = new FormData();
      formdata.append("file", variables.file);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        const response = await rootApi.post<FormData, response>(
          endpoint.uploadfile,
          formdata,
          { headers: {
            'Content-Type': 'multipart/form-data', // dit me doan nay lam bo may bug hoi lau roi day
            Authorization: `Bearer ${headers}`,
          }, }
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (e: any) => {
      if (e?.data?.accessToken) {
        setToken(e.data.accessToken);
      }
      
      notifySuccess(e?.data?.message || "Upload file success");
    },
    onError: (e: any) => {
      const errorMessage = e.response?.data?.message || "Upload file error";
      notifyError(errorMessage);
    },
  });

  return {
    isError,
    data: data?.data?.data,
    error,
    onUpload: mutateAsync,
  };
};
export default useUpload;
