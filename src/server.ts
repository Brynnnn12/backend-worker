import { logger } from './utils/logger';
import app from './config/app';
import { config } from './config/env';
import { prisma } from './config/database';

const server = app.listen(config.port, () => {
  logger.info(`Server berjalan di port ${config.port} dalam mode ${config.nodeEnv}`);
});

// ini untuk graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM diterima, mematikan server dengan baik');
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Proses dihentikan dengan baik');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
});
