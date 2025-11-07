import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../src/utils/jwt';

// Mock config untuk test (agar tidak tergantung env asli)
jest.mock('../../src/config/env', () => ({
  config: {
    jwt: {
      secret: 'test-secret-key',
      expiresIn: '1h',
    },
  },
}));

describe('JWT Utils', () => {
  const payload = { userId: 123, email: 'test@example.com' };

  describe('generateToken', () => {
    it('harus menghasilkan token JWT yang valid', () => {
      const token = generateToken(payload);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT format: header.payload.signature

      // Verifikasi token bisa di-decode
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.exp).toBeDefined(); // expiresIn harus ada
    });

    it('harus menggunakan secret dan expiresIn dari config', () => {
      const token = generateToken(payload);
      const decoded = jwt.verify(token, 'test-secret-key') as jwt.JwtPayload;

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.iat).toBeDefined(); // issued at
      expect(decoded.exp).toBeDefined(); // expires
    });
  });

  describe('verifyToken', () => {
    it('harus memverifikasi token yang valid dan return payload', () => {
      const token = generateToken(payload);
      const decoded = verifyToken(token) as jwt.JwtPayload;

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(typeof decoded).toBe('object');
    });

    it('harus throw error untuk token yang invalid', () => {
      const invalidToken = 'invalid.jwt.token';

      expect(() => verifyToken(invalidToken)).toThrow(jwt.JsonWebTokenError);
    });

    it('harus throw error untuk token yang expired (mock)', () => {
      // Mock jwt.verify untuk simulate expired
      const mockVerify = jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new jwt.TokenExpiredError('jwt expired', new Date());
      });

      const token = generateToken(payload);
      expect(() => verifyToken(token)).toThrow(jwt.TokenExpiredError);

      mockVerify.mockRestore();
    });
  });
});
