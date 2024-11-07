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

export const deletePostApi = async (postId: string) => {
  const res = await Server.delete(`post/${postId}`)

  return res
}


export const postLikeApi = async (postId: string) => {
  const res = await Server.post(`post/${postId}/like`)

  return res
}

export const uploadReplyComment = async (
  postId: string,
  commentId: number,
  body: object
) => {
  const res = await Server.post(
    `post/${postId}/comment/${commentId}/reply`,
    body
  )

  return res
}

export const getReplyComments = async (postId: string, commentId: number) => {
  const res = await Server.get(`post/${postId}/comment/${commentId}/reply`)
  return res
}
