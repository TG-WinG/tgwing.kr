import useSWR from 'swr'
import { fetcher } from '../../api'
import { TPost } from '../../types'

export const useGetPostList = (params: string) => {
  const baseKey = 'post' // 기본 key는 'post'
  const key = params ? [baseKey, params] : null // params를 포함한 배열을 key로 사용

  return useSWR(key, ([baseKey, params]) => fetcher(`${baseKey}?${params}`))
}

export const useGetPostDetail = (postId: string) => {
  const key = `post/${postId}`

  return useSWR<TPost>(key, fetcher)
}
