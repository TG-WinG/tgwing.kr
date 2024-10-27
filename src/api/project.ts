import { Server } from '.'

export const uploadProjectApi = async (body: object) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    Server.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  const res = await Server.post('project', body)

  return res
}
