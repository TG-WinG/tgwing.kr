import { Server } from '.'

export const acceptStudent = async (studentNumber: number) => {
  const res = await Server.post(`admin/${studentNumber}`)

  return res
}

export const rejectStudent = async (studentNumber: number) => {
  const res = await Server.delete(`admin/${studentNumber}`)
  return res
}
