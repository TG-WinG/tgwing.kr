import React from 'react'
import Banner from '../components/Banner'
import PostLists from '../techblog/PostLists'
import Control from '../techblog/Control'

import Background from '../assets/blog_background.png'

const TechBlog: React.FC = () => {
  return (
    <>
      <Banner
        background={Background}
        title='Tech-Blog'
        subTitle='짧은 설명 한 줄 짜리 어쩌고 효과적인 의사소통을 위한 비언어적 신호'
      />
      <Control />
      <PostLists />
    </>
  )
}

export default TechBlog
