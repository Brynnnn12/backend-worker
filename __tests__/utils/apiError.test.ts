import { ApiError } from '../../src/utils/apiError';

describe('ApiError', () => {
  it('harus membuat instance ApiError dengan statusCode, message, dan isOperational', () => {
    const error = new ApiError(400, 'Bad Request', true);

    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad Request');
    expect(error.isOperational).toBe(true);
  });

  it('harus menggunakan default isOperational = true jika tidak diberikan', () => {
    const error = new ApiError(500, 'Internal Server Error');

    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Internal Server Error');
    expect(error.isOperational).toBe(true);
  });

  it('harus mengizinkan isOperational = false', () => {
    const error = new ApiError(404, 'Not Found', false);

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error.isOperational).toBe(false);
  });

  it('harus mewarisi properti Error standar', () => {
    const error = new ApiError(403, 'Forbidden');

    expect(typeof error.stack).toBe('string');
  });
});
