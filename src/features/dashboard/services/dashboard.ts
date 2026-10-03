import http from "../../../lib/http";
import type { DashboardResponse } from "../types/dashboard";

class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const res = await http.get<DashboardResponse>("/dashboard/stats");
    return res.data;
  }
}

export const dashboardService = new DashboardService();
