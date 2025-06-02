import { useMutation } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type Params = {
  taskId: string;
}

type Response = {
  data: any[];
};

export function UseViewAllComments() {
  const { mutateAsync, data, error, isError, isPending } =
    useMutation({
      mutationKey: [endpoint.view_comments, "viewAllComments"],
      mutationFn: async (variable: Params) => {
        const response = await rootApi.post<Response>(endpoint.view_comments, variable);
        return response.data;
      },
    });

  return {
    isError,
    data: data,
    error,
    isPending,
    onLoadComments: mutateAsync,
  };
}
