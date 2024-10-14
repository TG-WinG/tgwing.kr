import useSWR from 'swr'
import { fetcher } from '../../api'

export const useGetData = (params: string) => {
  const key = `post?${params}`

  return useSWR(key, fetcher)
}
