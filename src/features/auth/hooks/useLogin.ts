import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import http from "../../../lib/http";
import { setToken } from "../utils/authStorage";
import type { LoginResponse, loginType } from "../types/auth";

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: loginType) =>
      http.post<LoginResponse>("/auth/login", data).then((res) => res.data),
    onSuccess: (res) => {
      const token = res?.data?.token;

      if (!token) {
        message.error("Token olinmadi");
        return;
      }

      setToken(token);
      message.success("Muvaffaqiyatli kirdingiz");
      navigate("/dashboard");
    },
    onError: () => {
      message.error("Login yoki parol noto'g'ri");
    },
  });

  return { mutate, isPending };
};

export default useLogin;
