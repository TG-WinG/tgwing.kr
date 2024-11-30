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

  return useSWR<TPost>(key, fetcher, {
    revalidateOnFocus: false, // 윈도우 포커스 시 리페칭 방지
    revalidateOnMount: true, // 첫 마운트 시에만 데이터 가져오기
    revalidateIfStale: false, // 캐시된 데이터가 오래되어도 자동으로 리페칭하지 않음
  })
}
