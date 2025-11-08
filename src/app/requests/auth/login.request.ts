import { z } from 'zod';

export const LoginRequestSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>['body'];
