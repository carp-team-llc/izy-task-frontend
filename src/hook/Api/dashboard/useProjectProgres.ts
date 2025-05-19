import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

export function UseProjectProgres() {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint.dashbord_project_progres],
    queryFn: async () => {
      const res = await rootApi.post(endpoint.dashbord_project_progres, {
        withCredentials: true,
      });
      return res?.data;
    },
  });

  return {
    data,
    isLoading,
  };
}
