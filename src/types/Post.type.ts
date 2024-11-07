import { TUser } from './User.type'

type TPost = {
  id: number
  title: string
  thumbnail: string
  summary: string
  content: string
  likeCount?: number
  commentCount?: number
  hashtags: string[]
  modDate: string
  writer: TUser
  ilikeIt?: boolean
}

type TComment = {
  id?: number
  content: string
  writer: TUser
  modDate: string
}

export type { TPost, TComment }
