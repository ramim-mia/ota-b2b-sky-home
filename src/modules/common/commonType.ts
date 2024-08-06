export interface HTTPResponse<T> {
  success: boolean;
  count?: number;
  total?: number;
  data?: T;
  message?: string;
  token?: string;
}

export interface ErrorResponse {
  status?: number;
  data?: {
    message?: string;
    success?: boolean;
    type?: string;
  };
}
