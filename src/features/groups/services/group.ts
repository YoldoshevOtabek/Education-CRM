import http from "../../../lib/http";
import type { ApiResponse } from "../types/group";

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
}

export default new GroupService();