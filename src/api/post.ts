import { Server } from '.'

export const uploadImageApi = async (body: FormData) => {
  const res = await Server.post('file/image', body)
  console.log(res)

  return res.data
}

export const uploadPostAPi = async (body: object) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    Server.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  const res = await Server.post('post', body)

  return res
}

export const uploadComment = async (postId: string, body: object) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    Server.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  const res = await Server.post(`post/${postId}/comment`, body)

  return res
}
