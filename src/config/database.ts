import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

prisma
  .$connect()
  .then(() => {
    logger.info('Database Berhasil Terhubung');
  })
  .catch((error: Error) => {
    logger.error('Database gagal terhubung:', error);
    process.exit(1);
  });
