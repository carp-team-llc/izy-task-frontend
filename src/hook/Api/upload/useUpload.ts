import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";
import { useAuth } from "../../../services/authContext";
import { useNavigate } from "react-router-dom";

type UploadParams = {
  file: any;
};
type response = {
  data: any;
};

const useUpload = () => {
  const { setToken, token } = useAuth();
  const success = useNavigate();
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: UploadParams) => {
      const formdata = new FormData();
      formdata.append("file", variables.file);
      console.log(variables.file)
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      return rootApi.post<FormData, response>(endpoint.uploadfile, formdata, {
        headers,
      });
    },
    onSuccess: (e: any) => {
      setToken(e?.data?.accessToken);
      alert(e?.data?.message || "Upload file success");
      success(e?.data?.data);
    },
    onError: (e: any) => {
      alert(e?.data?.message || "Upload file error");
    },
  });
  
  return {
    isError,
    data: data?.data,
    error,
    onUpload: mutateAsync,
  };
};
export default useUpload;
