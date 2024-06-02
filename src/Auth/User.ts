import { z } from 'zod'

export const User = z.object({
  studentId: z.string().regex(/\d{10}/),
  email: z.string().max(25).email().endsWith('@khu.ac.kr'),
  name: z.string(),
  birth: z.string().date(),
  phoneNumber: z.string().regex(/\d{3}-\d{4}-\d{4}/),
  profilePicture: z.string().url(),
})
export type User = z.infer<typeof User>