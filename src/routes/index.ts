import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

/**
 * Health check route
 */
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * Auth routes
 */
router.use('/auth', authRoutes);

export default router;
