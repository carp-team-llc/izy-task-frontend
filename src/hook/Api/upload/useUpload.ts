import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type UploadParams = {
  file: any;
};
type response = {
  data: any;
};

const useUpload = () => {
  const { isError, data, error, mutateAsync } = useMutation({
    mutationFn: async (variables: UploadParams) => {
      const formdata = new FormData();
      formdata.append("file", variables.file);

      try {
        const response = await rootApi.post<FormData, response>(
          endpoint.uploadfile,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data", // dit me doan nay lam bo may bug hoi lau roi day
            },
            withCredentials: true,            
          },
          
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    isError,
    data: data?.data?.data,
    error,
    onUpload: mutateAsync,
  };
};
export default useUpload;
