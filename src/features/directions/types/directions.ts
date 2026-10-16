export type DirectionStatus =
  "ACTIVE" |
  "INACTIVE"

export interface Direction {
  id: number;
  name: string;
  description: string;
  status: DirectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Direction[];
  pagination: Pagination;
}