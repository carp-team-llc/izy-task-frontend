import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";

type profileParams = {
  id: string;
}

export function useDetailProfile(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: [endpoint.detail_profile, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as [string, string];
      const res = await rootApi.post<profileParams, any>(
        endpoint.detail_profile,
        { id },
        { withCredentials: true }
      );
      return res.data;
    },
    enabled: !!id,
  });

  return {
    data,
    isLoading,
  };
}