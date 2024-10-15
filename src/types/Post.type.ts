import { User } from './User.type'

type Post = {
  id: number
  title: string
  thumbnail: string
  summary: string
  content: string
  likeCount: number
  commentCount: number
  hashtags: string[]
  modDate: string
  writer: User
}

type Comment = {
  id: number
  content: string
  writer: User
  modDate: string
}

export type { Post, Comment }
