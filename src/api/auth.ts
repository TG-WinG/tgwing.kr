import { Server } from '.'
import { TUser } from '../types'

export const checkToken = async () => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    Server.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  const result = await Server.post('validate')

  return result
}

export const getUserInfo = async (): Promise<TUser> => {
  const res = await Server.get('profile')
  const result = res.data.data
  return result
}

export const logout = async () => {
  const res = await Server.post('logout')
  localStorage.removeItem('accessToken')

  return res
}

export const updateUserInfo = async (body: TUser) => {
  const res = await Server.put('profile', body)
  return res
}


export const certifyEmail = async (body: object) => {
  const res = await Server.post('user/register/email', body)

  return res
}

export const verifyEmailCode = async (body: object, emailKey: string) => {
  const res = await Server.post(
    `user/register/check?emailKey=${emailKey}`,
    body
  )

  return res
}
