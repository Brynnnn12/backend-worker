import { Router } from 'express';
import AuthController from '../app/controllers/auth.controller';
import { authMiddleware } from '../app/middlewares/auth.middleware';
import { validate } from '../app/middlewares/validation.middleware';
import { RegisterRequestSchema } from '../app/requests/auth/register.request';
import { LoginRequestSchema } from '../app/requests/auth/login.request';
import { UpdateProfileRequestSchema } from '../app/requests/auth/update-profile.request';

const router = Router();

/**
 * Public routes
 */
router.post('/register', validate(RegisterRequestSchema), (req, res) =>
  AuthController.register(req, res),
);
router.post('/login', validate(LoginRequestSchema), (req, res) => AuthController.login(req, res));

/**
 * Protected routes
 */
router.get('/profile', authMiddleware, (req, res) => AuthController.getProfile(req, res));
router.put('/profile', authMiddleware, validate(UpdateProfileRequestSchema), (req, res) =>
  AuthController.updateProfile(req, res),
);

export default router;
