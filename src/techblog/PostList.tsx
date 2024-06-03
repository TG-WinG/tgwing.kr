import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../platte'

import Heart from '../assets/heart.png'
import Comment from '../assets/comment.png'

type TPostList = {
  title: string
  tag: string
  date: string
  intro: string
  profile: string // 작성자 프로필 사진
  name: string
  heart: number
  comment: number
}

const PostList = ({
  title,
  tag,
  date,
  intro,
  profile,
  name,
  heart,
  comment,
}: TPostList) => {
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
          src={profile}
          alt={profile}
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
          <div
            css={css`
              background-color: ${Color.Primary};
              color: #fff;
              padding: 3px 9px; // 4px로 할 시 폰트 밀림
              border-radius: 7500px;
              height: 22px;
              font-size: 12px;
              text-align: center;
              margin-bottom: 12px;
            `}
          >
            {tag}
          </div>
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
            `}
          >
            {title}
          </p>
        </div>
        <div
          css={css`
            margin-top: 4px;
            font-size: 16px;
          `}
        >
          {intro}
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
            src={profile}
          />

          {name}
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
            {date}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-left: auto;
              gap: 10px;
            `}
          >
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
              {heart}
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
              {comment}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList
