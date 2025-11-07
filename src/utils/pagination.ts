export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class PaginationUtil {
  static getPaginationOptions(options: PaginationOptions = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit ?? 10)); // Gunakan ?? untuk handle 0
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  static createPaginationResult<T>(
    data: T[],
    total: number,
    options: PaginationOptions = {},
  ): PaginationResult<T> {
    const { page, limit } = this.getPaginationOptions(options);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
