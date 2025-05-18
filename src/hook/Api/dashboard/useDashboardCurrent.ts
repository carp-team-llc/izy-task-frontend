import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

export function UseDashboardCurrent() {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint.dashboard_current],
    queryFn: async () => {
      const res = await rootApi.post(endpoint.dashboard_current, {
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
