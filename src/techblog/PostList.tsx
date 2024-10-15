import { css } from '@emotion/react'
import { Color } from '../palette'

import Heart from '../assets/heart.png'
import Comment from '../assets/comment.png'
import { Post } from '../types'

const PostList = ({
  title,
  thumbnail,
  content,
  writer,
  likeCount,
  commentCount,
  hashtags,
  modDate,
}: Omit<Post, 'id' | 'summary'>) => {
  return (
    <div
      css={css`
        display: flex;
        margin-bottom: 75px;
      `}
    >
      {/* THUMBNAIL */}
      <div
        css={css`
          width: 240px;
          height: 160px;
          background-color: #d9d9d9;
          margin-right: 40px;
        `}
      >
        <img
          src={thumbnail}
          alt={thumbnail}
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
        />
      </div>

      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          {hashtags &&
            hashtags.map((item, idx) => (
              <div
                key={idx}
                css={css`
                  background-color: ${Color.Primary};
                  color: #fff;
                  padding: 2px 9px; // 4px로 할 시 폰트 밀림
                  border-radius: 7500px;
                  font-size: 12px;
                  text-align: center;
                  margin-bottom: 12px;
                  margin-right: 6px;
                `}
              >
                {item}
              </div>
            ))}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <p
            css={css`
              font-size: 18px;
              font-weight: 500;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {title}
          </p>
        </div>
        <div
          css={css`
            margin-top: 4px;
            font-size: 16px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {content}
        </div>
        <div
          css={css`
            margin-top: auto;
            display: flex;
            align-items: center;
            color: ${Color.Gray400};
            font-size: 14px;
          `}
        >
          <img
            css={css`
              width: 20px;
              height: 20px;
              border-radius: 9999px;
              margin-right: 8px;
            `}
            src={writer.profilePicture}
          />

          {writer.name}
          <div
            css={css`
              height: 12px;
              border-right: 1px solid ${Color.Gray400};
              margin: 0 12px;
            `}
          />
          <div
            css={css`
              font-size: 14px;
            `}
          >
            {modDate}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-left: auto;
              gap: 10px;
            `}
          >
            {likeCount && (
              <>
                <div>
                  <img
                    src={Heart}
                    alt={Heart}
                    css={css`
                      width: 12px;
                      height: 12px;
                      display: inline-block;
                      margin-right: 6px;
                    `}
                  />
                  {likeCount}
                </div>
                <div>
                  <img
                    src={Comment}
                    alt={Comment}
                    css={css`
                      width: 12px;
                      height: 12px;
                      display: inline-block;
                      margin-right: 6px;
                    `}
                  />
                  {commentCount}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList
