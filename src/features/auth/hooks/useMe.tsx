import { useQuery } from "@tanstack/react-query";
import http from "../../../lib/http";
import { getToken } from "../utils/authStorage";

const useMe = () => {
  const hasToken = Boolean(getToken());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => http.get("/auth/me").then((res) => res?.data),
    enabled: hasToken,
    retry: false,
    staleTime: 60_000,
  });

  return {
    data,
    isLoading: hasToken && isLoading,
    isError,
  };
};

export default useMe;
