import { z } from 'zod'

export const StudentId = z.string().regex(/\d{10}/).brand('StudentId')
export type StudentId = z.infer<typeof StudentId>

const UserDataBase = z.object({
  studentId: StudentId,
  email: z.string().max(25).email().endsWith('@khu.ac.kr'),
  name: z.string(),
  birth: z.string().date(),
  phoneNumber: z.string().regex(/\d{3}-\d{4}-\d{4}/),
})

export const User = UserDataBase.extend({
  picture: z.string().url()
}).brand('User')
export type User = z.infer<typeof User>

export const RegistrationForm = UserDataBase.extend({
  password: z.string()
}).brand('RegistrationForm')
export type RegistrationForm = z.infer<typeof RegistrationForm>
