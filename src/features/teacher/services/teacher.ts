import http from "../../../lib/http";
import type { ApiResponse, CreateTeacherDto } from "../types/teacher";

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

  async createTeacher(dto: CreateTeacherDto): Promise<ApiResponse> {
    const res = await http.post("/teachers", dto);
    return res.data;
  }
}

export const teacherService = new TeacherService();
