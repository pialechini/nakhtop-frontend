export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  timestamp: string;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  statusCode: number;
  path: string;
  timestamp: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
