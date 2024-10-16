import PostList from './PostList'
import { css } from '@emotion/react'
import { TPost } from '../types'

type PostListsProps = {
  postList: TPost[]
}

const PostLists = ({ postList }: PostListsProps) => {
  return (
    <div
      css={css`
        width: 945px;
        margin: 0 auto;
        margin-top: 70px;
      `}
    >
      {postList &&
        postList.map((item, idx) => (
          <PostList
            key={idx}
            id={item.id}
            title={item.title}
            hashtags={item.hashtags}
            modDate={item.modDate}
            content={item.content}
            thumbnail={item.thumbnail}
            writer={item.writer}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
          />
        ))}
    </div>
  )
}

export default PostLists
