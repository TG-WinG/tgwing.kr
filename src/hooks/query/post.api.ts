import useSWR from 'swr'
import { fetcher } from '../../api'
import { TPost } from '../../types'

export const useGetPostList = (params: string) => {
  const key = `post?${params}`

  return useSWR(key, fetcher)
}

export const useGetPostDetail = (postId: string) => {
  const key = `post/${postId}`

  return useSWR<TPost>(key, fetcher)
}
