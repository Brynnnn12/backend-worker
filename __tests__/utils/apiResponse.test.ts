import { Response } from 'express';
import { ApiResponse } from '../../src/utils/apiResponse';

describe('ApiResponse', () => {
  let mockRes: Partial<Response>;

  beforeEach(() => {
    // Mock Express Response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('success method', () => {
    it('harus mengirim response sukses dengan data default', () => {
      const data = { id: 1, name: 'Test' };
      const result = ApiResponse.success(mockRes as Response, data);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data,
      });
      expect(result).toBe(mockRes);
    });

    it('harus mengirim response sukses dengan message dan statusCode custom', () => {
      const data = 'Custom data';
      const result = ApiResponse.success(mockRes as Response, data, 'Custom message', 201);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Custom message',
        data,
      });
      expect(result).toBe(mockRes);
    });

    it('harus mengirim response sukses dengan pagination jika diberikan', () => {
      const data = [1, 2, 3];
      const pagination = { page: 1, limit: 10 };
      const result = ApiResponse.success(mockRes as Response, data, 'Success', 200, pagination);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Success',
        data,
        pagination,
      });
      expect(result).toBe(mockRes);
    });

    it('harus mengirim response sukses tanpa data jika null', () => {
      const result = ApiResponse.success(mockRes as Response, null, 'No data', 204);

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'No data',
        data: null,
      });
      expect(result).toBe(mockRes);
    });
  });

  describe('error method', () => {
    it('harus mengirim response error dengan default message dan statusCode', () => {
      const result = ApiResponse.error(mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error',
        errors: null,
      });
      expect(result).toBe(mockRes);
    });

    it('harus mengirim response error dengan message, statusCode, dan errors custom', () => {
      const errors = { field: 'required' };
      const result = ApiResponse.error(mockRes as Response, 'Validation failed', 400, errors);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Validation failed',
        errors,
      });
      expect(result).toBe(mockRes);
    });

    it('harus mengirim response error tanpa errors jika null', () => {
      const result = ApiResponse.error(mockRes as Response, 'Not found', 404);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Not found',
        errors: null,
      });
      expect(result).toBe(mockRes);
    });
  });
});
