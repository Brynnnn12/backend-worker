import { PaginationUtil } from '../../src/utils/pagination';

describe('PaginationUtil', () => {
  describe('getPaginationOptions', () => {
    it('harus return default page 1 dan limit 10 jika tidak diberikan', () => {
      const result = PaginationUtil.getPaginationOptions();

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(0);
    });

    it('harus menggunakan page dan limit yang diberikan', () => {
      const result = PaginationUtil.getPaginationOptions({ page: 2, limit: 20 });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(20);
      expect(result.skip).toBe(20); // (2-1) * 20
    });

    it('harus set page minimum 1', () => {
      const result = PaginationUtil.getPaginationOptions({ page: 0 });

      expect(result.page).toBe(1);
      expect(result.skip).toBe(0);
    });

    it('harus set limit minimum 1 dan maksimum 100', () => {
      expect(PaginationUtil.getPaginationOptions({ limit: 0 }).limit).toBe(1);
      expect(PaginationUtil.getPaginationOptions({ limit: 150 }).limit).toBe(100);
    });

    it('harus menghitung skip dengan benar', () => {
      const result = PaginationUtil.getPaginationOptions({ page: 3, limit: 5 });

      expect(result.skip).toBe(10); // (3-1) * 5
    });
  });

  describe('createPaginationResult', () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    it('harus return pagination result dengan data dan info pagination', () => {
      const result = PaginationUtil.createPaginationResult(mockData, 50, { page: 1, limit: 10 });

      expect(result.data).toEqual(mockData);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.total).toBe(50);
      expect(result.pagination.totalPages).toBe(5); // 50 / 10
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('harus menghitung totalPages dengan benar', () => {
      const result = PaginationUtil.createPaginationResult(mockData, 23, { page: 1, limit: 10 });

      expect(result.pagination.totalPages).toBe(3); // Math.ceil(23 / 10)
    });

    it('harus set hasNext false di halaman terakhir', () => {
      const result = PaginationUtil.createPaginationResult(mockData, 20, { page: 2, limit: 10 });

      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrev).toBe(true);
    });

    it('harus set hasPrev false di halaman pertama', () => {
      const result = PaginationUtil.createPaginationResult(mockData, 30, { page: 1, limit: 10 });

      expect(result.pagination.hasPrev).toBe(false);
      expect(result.pagination.hasNext).toBe(true);
    });

    it('harus menggunakan default options jika tidak diberikan', () => {
      const result = PaginationUtil.createPaginationResult(mockData, 100);

      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.totalPages).toBe(10); // 100 / 10
    });
  });
});
