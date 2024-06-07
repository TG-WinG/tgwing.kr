import { FC } from 'react'
import Banner from '../techblog/Banner'
import PostLists from '../techblog/PostLists'
import Control from '../techblog/Control'

const TechBlog: FC = () => {
  return (
    <>
      <Banner />
      <Control />
      <PostLists />
    </>
  )
}

export default TechBlog
