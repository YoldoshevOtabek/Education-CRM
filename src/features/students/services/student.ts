import http from "../../../lib/http";
import type { CreateStudentDto, StudentResponse } from "../types/student";

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

  async createStudent(dto: CreateStudentDto): Promise<StudentResponse> {
    const res = await http.post("/students", dto);
    return res.data;
  }
}

export const studentService = new StudentService();
