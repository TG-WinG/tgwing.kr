import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import PostLists from '../techblog/PostLists'
import Control from '../techblog/Control'

import Background from '../assets/blog_background.png'
import { Header } from '../common/Header'
import { TPost } from '../types'
import { useGetPostList } from '../hooks/query/post.api'
import { Pagination } from '../components/Pagination'
import { ServerError } from './error/ServerError'

const TechBlog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>('')
  const [hashtag, setHashtag] = useState<string[]>([])

  const params = new URLSearchParams({
    page: String(currentPage),
    size: '7',
    sort: 'modDate,desc',
    keyword,
    hashtag: hashtag.join(','),
  }).toString()

  const { data, isLoading, error } = useGetPostList(params)

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.totalElements / 7))
    }
  }, [data])

  if (isLoading) return <div></div>
  if (error) return <ServerError />

  const postList: TPost[] = data.content

  return (
    <>
      <Header num={1} />
      <Banner
        background={Background}
        title='Tech-Blog'
        subTitle='동아리원들의 스터디 공유 아고라'
      />
      <Control setKeyword={setKeyword} setHashtag={setHashtag} />
      <PostLists postList={postList} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default TechBlog
