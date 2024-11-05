import { css } from '@emotion/react'
import { TComment } from '../types'
import { Color } from '../palette'
import { dateFormat } from '../utils/dateFormat'
import icon_default_profile from '../assets/icon_default_profile.svg'
import icon_new_comment from '../assets/icon_new_comment.svg'
import { useRef, useState } from 'react'
import { useGetReplies } from '../hooks/query/comment.api'
import icon_line from '../assets/reply.svg'

interface CommentProps extends TComment {
  onReplySubmit: (commentId: number, content: string) => Promise<void>
  post_id: number
}

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
    cursor: pointer;
    &:hover {
      color: ${Color.Gray600};
    }
  `,

  replyContainer: css`
    margin-top: 20px;
    margin-left: 48px;
    display: flex;
    border: 1px solid ${Color.Gray300};
    border-radius: 8px;
    padding: 12px 16px;
    gap: 16px;
  `,

  replyInput: css`
    border: none;
    background: none;
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;

    :focus {
      outline: none;
    }
  `,

  focused: css`
    border-color: ${Color.Primary};
  `,

  repliesWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  replyWrapper: css`
    position: relative;
    padding-left: 48px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
  `,

  writerName: css`
    font-size: 16px;
    font-weight: 500;
    line-height: 21.6px;
    color: ${Color.Gray700};
  `,

  replyContent: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: ${Color.Gray900};
  `,

  replyLine: css`
    position: absolute;
    left: 0px;
  `,
}

export const Comment = ({
  content,
  modDate,
  writer,
  id,
  onReplySubmit,
  post_id,
}: CommentProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const replyInputRef = useRef<HTMLInputElement>(null)

  const {
    data: replies,
    isLoading,
    mutate,
  } = useGetReplies(String(post_id)!, id!)

  console.log(replies?.data.content)

  const handleReplySubmit = async () => {
    if (
      !replyInputRef.current ||
      replyInputRef.current.value.trim() === '' ||
      !id
    ) {
      alert('댓글을 입력하세요!')
      return
    }

    try {
      await onReplySubmit(id, replyInputRef.current.value)
      // 성공적으로 제출되면 입력창 초기화
      replyInputRef.current.value = ''
      setShowReplyInput(false)
      mutate()
    } catch (err) {
      console.log('Reply submit error:', err)
    }
  }

  return (
    <div css={CommentStyle.wrapper}>
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
      <div
        css={CommentStyle.babyComment}
        onClick={() => setShowReplyInput((prev) => !prev)}
      >
        댓글달기
      </div>

      {isLoading ? (
        <div>Loading replies...</div>
      ) : (
        <div css={CommentStyle.repliesWrapper}>
          {replies?.data.content?.map((reply: TComment, idx: number) => (
            <div key={reply.id} css={CommentStyle.replyWrapper}>
              {idx === 0 && (
                <img css={CommentStyle.replyLine} src={icon_line} />
              )}
              <div css={CommentStyle.title}>
                <img
                  src={reply.writer.profilePicture ?? icon_default_profile}
                  css={CommentStyle.profileImg}
                  alt='profile'
                />
                <div css={CommentStyle.name}>{reply.writer.name}</div>
                <div css={CommentStyle.dot} />
                <div css={CommentStyle.date}>{dateFormat(reply.modDate)}</div>
              </div>
              <div css={CommentStyle.replyContent}>{reply.content}</div>
            </div>
          ))}
        </div>
      )}

      {showReplyInput && (
        <div
          css={[CommentStyle.replyContainer, isFocused && CommentStyle.focused]}
        >
          <input
            ref={replyInputRef}
            type='text'
            css={CommentStyle.replyInput}
            placeholder='댓글을 입력하세요'
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleReplySubmit()
              }
            }}
          />
          <button onClick={handleReplySubmit}>
            <img
              src={icon_new_comment}
              alt='>'
              css={[
                isFocused &&
                  css`
                    filter: invert(64%) sepia(72%) saturate(5667%)
                      hue-rotate(213deg) brightness(104%) contrast(96%);
                  `,
              ]}
            />
          </button>
        </div>
      )}
    </div>
  )
}
