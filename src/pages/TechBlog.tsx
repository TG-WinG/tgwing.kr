import React from 'react'
import Banner from '../components/Banner'
import PostLists from '../techblog/PostLists'
import Control from '../techblog/Control'

import Background from '../assets/blog_background.png'
import { useGetData } from '../hooks/query/useGetData'
import { Header } from '../common/Header'
import { Post } from '../types'

const TechBlog: React.FC = () => {
  const params = new URLSearchParams({
    page: '0',
    size: '10',
  }).toString()

  const { data, isLoading, error } = useGetData(params)
  console.log(data)

  if (isLoading) return <div>Failed to load profiles</div>
  if (error) return <div>Error!</div>

  const postList: Post[] = data.content

  return (
    <>
      <Header num={1} />
      <Banner
        background={Background}
        title='Tech-Blog'
        subTitle='짧은 설명 한 줄 짜리 어쩌고 효과적인 의사소통을 위한 비언어적 신호'
      />
      <Control />
      <PostLists postList={postList} />
    </>
  )
}

export default TechBlog
