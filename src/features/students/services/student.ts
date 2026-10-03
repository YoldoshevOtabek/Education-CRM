import http from "../../../lib/http";
import type { StudentResponse } from "../types/student";

class StudentService {
  async getStudents(
    page = 1,
    limit = 10
  ): Promise<StudentResponse> {
    const res = await http.get<StudentResponse>("/students", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }
}

export const studentService = new StudentService();
