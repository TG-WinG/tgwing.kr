import { css } from '@emotion/react'

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
        margin-bottom: 100px;
      `}
    >
      {/* THUMBNAIL */}
      <div
        css={css`
          width: 300px;
          height: 216px;
          background-color: #d9d9d9;
          margin-right: 42px;
        `}
      ></div>
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
            align-items: center;
          `}
        >
          <p
            css={css`
              font-size: 24px;
              font-weight: 700;
            `}
          >
            {title}
          </p>
          <div
            css={css`
              background-color: #d9d9d9;
              padding: 2px 10px;
              border-radius: 8px;
              height: 22px;
              margin-left: 20px;
              font-size: 12px;
            `}
          >
            {tag}
          </div>
          <div
            css={css`
              font-size: 18px;
              color: #747474;
              margin-left: auto;
            `}
          >
            {date}
          </div>
        </div>
        <div
          css={css`
            margin-top: 20px;
            font-size: 20px;
          `}
        >
          {intro}
        </div>
        <div
          css={css`
            margin-top: auto;
            display: flex;
          `}
        >
          <div>{profile}</div>
          {name}
          <div
            css={css`
              margin-left: auto;
            `}
          >
            하트: {heart} 댓글 : {comment}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostList
