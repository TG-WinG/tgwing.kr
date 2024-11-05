import useSWR from 'swr'
import { fetcher } from '../../api'
import { getReplyComments } from '../../api/post'

export const useGetComments = (postId: string) => {
  const key = `post/${postId}/comment`

  return useSWR(key, fetcher)
}

export const useGetReplies = (postId: string, commentId: number) => {
  return useSWR(
    postId && commentId
      ? [`reply-${postId}-${commentId}`, postId, commentId]
      : null,
    () => getReplyComments(postId, commentId)
  )
}
