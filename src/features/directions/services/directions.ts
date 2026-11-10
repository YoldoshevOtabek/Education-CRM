import http from "../../../lib/http";
import type { ApiResponse, CreateDirectionDto } from "../types/directions";

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

  async createDirection(dto: CreateDirectionDto): Promise<ApiResponse> {
    const res = await http.post("/directions", dto);
    return res.data;
  }
}

export const directionService = new DirectionService();
