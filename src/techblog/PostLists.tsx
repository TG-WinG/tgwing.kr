import React from 'react'
import PostList from './PostList'
import { css } from '@emotion/react'
import { TPost, TPosts } from '../pages/TechBlog'

const PostLists: React.FC<TPosts> = ({ postList }) => {
  return (
    <div
      css={css`
        width: 945px;
        margin: 0 auto;
        margin-top: 70px;
      `}
    >
      {postList &&
        postList.map((item: TPost, idx: number) => (
          <PostList
            key={idx}
            title={item.title}
            tag={item.tag}
            // date={item.date}
            intro={item.content}
            // profile={item.profile}
            name={item.writer}
            heart={item.heart}
            comment={item.comment}
          />
        ))}
    </div>
  )
}

export default PostLists
