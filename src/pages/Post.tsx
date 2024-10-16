import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Color } from '../palette'

import Heart from '../assets/heart.png'
import icon_comment from '../assets/comment.png'
import { useParams } from 'wouter'
import { useGetPostDetail } from '../hooks/query/post.api'
import { Header } from '../common/Header'
import { useGetComments } from '../hooks/query/comment.api'
import { TComment } from '../types'
import { Comment } from '../components/Comment'
import icon_new_comment from '../assets/icon_new_comment.svg'

const PostStyle = {
  wrapper: css`
    width: 944px;
    margin: 100px auto;
  `,

  title: css`
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 30px;
  `,

  tagBox: css`
    display: flex;
    margin-bottom: 30px;
  `,

  tag: css`
    color: ${Color.PrimaryBorder};
    margin-right: 30px;
  `,

  info: css`
    display: flex;
    align-items: center;
    color: ${Color.Gray500};
    font-size: 18px;
    margin-bottom: 25px;
  `,

  profile: css`
    width: 24px;
    height: 24px;
    border-radius: 9999px;
    margin-right: 12px;
  `,

  border: css`
    height: 14px;
    border-right: 1px solid ${Color.Gray400};
    margin: 0 20px;
  `,

  buttonBox: css`
    display: flex;
    margin-left: auto;
    font-size: 14px;
    gap: 25px;
  `,

  line: css`
    border-bottom: 1px solid ${Color.Gray200};
  `,

  post: css`
    margin-top: 65px;
    margin-bottom: 100px;
  `,

  heart: css`
    display: flex;
    color: ${Color.Gray400};
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 15px;
      height: 15px;
      margin-right: 8px;
      &:nth-of-type(2) {
        margin-left: 16px;
      }
    }
  `,

  button: css`
    display: flex;
    margin-top: 8px;
    height: 43px;
    align-items: center;
    color: ${Color.Gray500};
    justify-content: space-between;

    img {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin-right: 10px;
    }
  `,

  imgBox: css`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,

  div: css`
    height: 43px;
    border-right: 1px solid ${Color.Gray400};
  `,

  commentContainer: css`
    display: flex;
    flex-direction: column;
    gap: 30px;

    padding: 48px 50px;
  `,
  newCommentContainer: css`
    width: 100%;
    display: flex;
    border: 1px solid ${Color.Gray300};
    border-radius: 8px;
    margin-top: 30px;
    padding: 15px 21px;
    gap: 20px;
  `,
  focused: css`
    border-color: ${Color.Primary};
  `,
  newCommentInput: css`
    border: none;
    background: none;
    flex: 1;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;

    :focus {
      outline: none;
    }
  `,
}

const Post: React.FC = () => {
  const { post_id } = useParams()

  const [isFocused, setIsFocused] = useState(false)

  const { data: post, isLoading, error } = useGetPostDetail(post_id!)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetComments(post_id!)

  if (isLoading || isCommentsLoading) return <>Loading..</>
  if (error || commentsError) return <>Error occured!</>

  const comments: TComment[] = commentsData.content

  console.log(comments)

  return (
    <>
      <Header num={1} />
      <div css={PostStyle.wrapper}>
        {post && (
          <>
            <div css={PostStyle.title}>{post.title}</div>

            <div css={PostStyle.tagBox}>
              {post.hashtags.map((item, idx) => (
                <div css={PostStyle.tag} key={idx}>
                  #{item}
                </div>
              ))}
            </div>

            <div css={PostStyle.info}>
              <img src={post.writer.profilePicture} css={PostStyle.profile} />
              <span>{post.writer.name}</span>
              <div css={PostStyle.border} />
              <span>{post.modDate}</span>
              <div css={PostStyle.buttonBox}>
                <span>수정</span>
                <span>삭제</span>
              </div>
            </div>

            <div css={PostStyle.line} />

            <div css={PostStyle.post}>{post.content}</div>

            <div css={PostStyle.heart}>
              <img src={Heart} /> {post.likeCount}
              <img src={icon_comment} /> {post.commnetCount}
            </div>

            <div css={PostStyle.line} />

            <div css={PostStyle.button}>
              <div css={PostStyle.imgBox}>
                <img src={Heart} /> 공감하기
              </div>
              <div css={PostStyle.div} />
              <div css={PostStyle.imgBox}>
                <img src={icon_comment} /> 댓글달기
              </div>
            </div>

            <div css={PostStyle.commentContainer}>
              {comments.map((item, idx) => (
                <Comment
                  key={idx}
                  content={item.content}
                  writer={item.writer}
                  modDate={item.modDate}
                />
              ))}
              {comments.map((item, idx) => (
                <Comment
                  key={idx}
                  content={item.content}
                  writer={item.writer}
                  modDate={item.modDate}
                />
              ))}

              <div
                css={[
                  PostStyle.newCommentContainer,
                  isFocused && PostStyle.focused,
                ]}
              >
                <input
                  type='text'
                  css={PostStyle.newCommentInput}
                  placeholder='댓글 작성'
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button>
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
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Post
