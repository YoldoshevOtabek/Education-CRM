import http from "../../../lib/http";
import type { LoginResponse, loginType } from "../types/auth";

class Auth {
  async login(dto: loginType): Promise<LoginResponse> {
    try {
      const res = await http.post<LoginResponse>("/auth/login", dto);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new Auth();
  