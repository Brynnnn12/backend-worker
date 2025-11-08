import { z } from 'zod';

export const UpdateProfileRequestSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().url('Avatar must be a valid URL').optional(),
  }),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>['body'];
