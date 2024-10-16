import useSWR from 'swr'
import { fetcher } from '../../api'

export const useGetComments = (postId: string) => {
  const key = `post/${postId}/comment`

  return useSWR(key, fetcher)
}
