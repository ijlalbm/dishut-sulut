import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive().optional(),
  username: z.string().max(255),
  email: z.string().max(255).email(),
  no_hp: z.string().max(255),
  password: z.string().max(255),
  name: z.string().max(255).nullable().optional(),
  status: z.number().int().min(0).max(1),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});