import axios from "axios";
import { getToken } from "../features/auth/utils/authStorage";

const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
});

http.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
http.interceptors.response.use((response) => response, async (err) => {
  if(err.response?.status === 401) {
    localStorage.removeItem("crmToken")
    localStorage.removeItem("crmUser")
    window.location.href = "/login"
    return Promise.reject(err)
  }
  return Promise.reject(err)
})

export default http;
