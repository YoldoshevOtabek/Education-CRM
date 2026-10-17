import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { clearToken, getToken } from "../features/auth/utils/authStorage";

type RetryConfig = InternalAxiosRequestConfig & {
  _retried304?: boolean;
};

const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
  timeout: 45000,
});

http.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const method = (config.method ?? "get").toLowerCase();

  if (method === "get") {
    const params =
      config.params && typeof config.params === "object"
        ? (config.params as Record<string, unknown>)
        : {};

    config.params = {
      ...params,
      _: Date.now(),
    };
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const config = error.config as RetryConfig | undefined;

    if (status === 304 && config && !config._retried304) {
      config._retried304 = true;
      const params =
        config.params && typeof config.params === "object"
          ? (config.params as Record<string, unknown>)
          : {};

      config.params = {
        ...params,
        _: Date.now(),
      };

      return http.request(config);
    }

    const requestUrl = config?.url ?? "";
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      clearToken();
      localStorage.removeItem("crmUser");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default http;
