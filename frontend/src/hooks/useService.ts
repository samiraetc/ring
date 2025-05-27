// src/hooks/useServices.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export const useServices = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
    enabled,
  });
};
