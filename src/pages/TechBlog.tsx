import React from 'react'
import Banner from '../techblog/Banner'
import PostLists from '../techblog/PostLists'
import Control from '../techblog/Control'

const TechBlog: React.FC = () => {
  return (
    <>
      <Banner />
      <Control />
      <PostLists />
    </>
  )
}

export default TechBlog
