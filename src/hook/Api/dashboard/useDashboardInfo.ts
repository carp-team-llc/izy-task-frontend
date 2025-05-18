import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

export function UseDashboardInfo() {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint.dashboard_info],
    queryFn: async () => {
      const res = await rootApi.post(endpoint.dashboard_info, {
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
