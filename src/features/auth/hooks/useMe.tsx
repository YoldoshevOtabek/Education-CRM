import { useQuery } from "@tanstack/react-query";
import http from "../../../lib/http";
import { getToken } from "../utils/authStorage";
import type { LoginUser, MeResponse } from "../types/auth";

const useMe = () => {
  const hasToken = Boolean(getToken());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      http.get<MeResponse>("/auth/me").then((res) => res.data?.data),
    enabled: hasToken,
    retry: false,
    staleTime: 60_000,
  });

  return {
    user: data as LoginUser | undefined,
    isLoading: hasToken && isLoading,
    isError,
  };
};

export default useMe;
