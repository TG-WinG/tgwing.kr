import { css } from '@emotion/react'
import { TComment } from '../types'
import { Color } from '../palette'
import { dateFormat } from '../utils/dateFormat'
import icon_default_profile from '../assets/icon_default_profile.svg'

const CommentStyle = {
  wrapper: css``,
  title: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
  `,
  profileImg: css`
    width: 24px;
    height: 24px;
    border-radius: 999px;
    object-fit: cover;
  `,

  name: css`
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
  `,

  dot: css`
    margin: 0 3px;
    width: 4px;
    height: 4px;
    border-radius: 99px;
    background-color: ${Color.Gray500};
  `,

  date: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: ${Color.Gray500};
  `,
  content: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: ${Color.Gray900};
    margin-bottom: 10px;
  `,
  babyComment: css`
    font-size: 13px;
    font-weight: 400;
    line-height: 15.6px;
    color: ${Color.Gray400};
  `,
}

export const Comment = ({ content, modDate, writer }: TComment) => {
  return (
    <div>
      <div css={CommentStyle.title}>
        <img
          src={writer.profilePicture ?? icon_default_profile}
          alt='x'
          css={CommentStyle.profileImg}
        />
        <span css={CommentStyle.name}>{writer.name}</span>
        <div css={CommentStyle.dot} />
        <span css={CommentStyle.date}>{dateFormat(modDate)}</span>
      </div>
      <div css={CommentStyle.content}>{content}</div>
      <div css={CommentStyle.babyComment}>댓글달기</div>
    </div>
  )
}
