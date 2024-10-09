import useSWR from 'swr'
import { getData } from '../../api'

export const useGetData = (params: string) => {
  const key = `/api/post?${params}`

  return useSWR(key, getData)
}
