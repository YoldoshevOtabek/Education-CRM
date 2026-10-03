import http from "../../../lib/http";
import type { ApiResponse } from "../types/directions";

class DirectionService {
  async getDirections(
    page = 1,
    limit = 10
  ): Promise<ApiResponse> {
    const res = await http.get<ApiResponse>("/directions", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  }
}

export const directionService = new DirectionService();
