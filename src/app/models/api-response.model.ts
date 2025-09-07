export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  
  export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }