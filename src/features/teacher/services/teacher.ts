import http from "../../../lib/http";
import type { ApiResponse } from "../types/teacher";

class TeacherService {
  async getTeachers(
    page = 1,
    limit = 10
  ): Promise<ApiResponse> {
    const res = await http.get<ApiResponse>("/teachers", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }
}

export const teacherService = new TeacherService();
