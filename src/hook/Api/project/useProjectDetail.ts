import { useQuery } from "@tanstack/react-query";
import rootApi from "../../../services/initApi";
import endpoint from "../../../services/endpoint";

type Variables = {
  id: string;
}

type Response = {
  data: any;
}

const UseProjectDetail = (variables: Variables) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projectDetail', variables.id],
    queryFn: async () => {
      const response = await rootApi.post<Variables, Response>(endpoint.project_detail, variables);
      console.log("response ====> ", response.data);
      return response.data;
    },
  });

  return { detailProject: data, isLoading, isError, error };
};

export default UseProjectDetail;
