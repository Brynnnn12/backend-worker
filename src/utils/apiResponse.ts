import { Response } from 'express';

interface ApiResponseData {
  success: boolean;
  message: string;
  data?: unknown;
  pagination?: unknown;
  errors?: unknown;
}

export class ApiResponse {
  static success(
    res: Response,
    data: unknown = null,
    message = 'Success',
    statusCode = 200,
    pagination?: unknown,
  ) {
    const response: ApiResponseData = {
      success: true,
      message,
      data,
    };
    if (pagination) {
      response.pagination = pagination;
    }
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message = 'Error', statusCode = 500, errors: unknown = null) {
    const response: ApiResponseData = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(response);
  }
}

export default ApiResponse;
