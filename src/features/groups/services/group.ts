import http from "../../../lib/http";
import type { ApiResponse, CreateGroupDto } from "../types/group";

class GroupService {
  async getGroups(
    page = 1,
    limit = 10
  ): Promise<ApiResponse> {
    const res = await http.get<ApiResponse>("/groups", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }

  async createGroup(dto: CreateGroupDto): Promise<ApiResponse> {
    const res = await http.post("/groups", dto);
    return res.data;
  }
}

export default new GroupService();