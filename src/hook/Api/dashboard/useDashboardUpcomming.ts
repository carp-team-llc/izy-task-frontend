import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

export function UseDashboardUpcomming() {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint.dashboard_upcomming],
    queryFn: async () => {
      const res = await rootApi.post(endpoint.dashboard_upcomming, {
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
