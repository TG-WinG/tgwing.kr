import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'
import { Color } from '../palette'

import Heart from '../assets/heart.svg'

import icon_comment from '../assets/comment.png'
import { useLocation, useParams } from 'wouter'
import { useGetPostDetail } from '../hooks/query/post.api'
import { Header } from '../common/Header'
import { useGetComments } from '../hooks/query/comment.api'
import { TComment } from '../types'
import { Comment } from '../components/Comment'
import icon_new_comment from '../assets/icon_new_comment.svg'
import DOMPurify from 'dompurify'

import {
  deletePostApi,
  postLikeApi,
  uploadComment,
  uploadReplyComment,
} from '../api/post'

import icon_default_profile from '../assets/icon_default_profile.svg'
import userStore from '../store/User'
import { mutate } from 'swr'

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
    button {
      color: ${Color.Gray400};
      :hover {
        border-bottom: 1px solid ${Color.Gray700};
        color: ${Color.Gray700};
      }
    }
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

    color: ${Color.Gray500};
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

  heartIcon: css`
    filter: invert(25%) sepia(86%) saturate(3427%) hue-rotate(350deg)
      brightness(95%) contrast(93%);
  `,
  liked: css`
    color: ${Color.Red};
  `,
}

const Post: React.FC = () => {
  const { post_id } = useParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)

  const [, navigate] = useLocation()

  const { user } = userStore()

  const {
    data: post,
    isLoading,
    error,
    mutate: postMutate,
  } = useGetPostDetail(post_id!)

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    error: commentsError,
    mutate: commentMutate,
  } = useGetComments(post_id!)

  if (isLoading || isCommentsLoading) return <>Loading..</>
  if (error || commentsError) return <>Error occured!</>

  const comments: TComment[] = commentsData.content

  const commentUpload = async () => {
    if (!inputRef.current || inputRef.current.value.trim() === '') {
      alert('댓글을 입력하세요!')
      return
    }

    try {
      await uploadComment(post_id!, {
        content: inputRef.current.value,
      })
      commentMutate()
      inputRef.current.value = ''
    } catch {
      console.log('errr')
    }
  }

  const deleteClick = async () => {
    try {
      await deletePostApi(String(post?.id))
      mutate((key) => Array.isArray(key) && key[0] === 'post')
      navigate('/blog')
    } catch (err) {
      console.log(err)
    }
  }

  const likeClick = async () => {
    try {
      await postLikeApi(String(post?.id))

      postMutate()
    } catch (err) {
      console.log(err)
    }
  }

  const replyUpload = async (commentId: number, content: string) => {
    try {
      await uploadReplyComment(post_id!, commentId, { content })
      commentMutate()
    } catch (err) {
      console.log('Reply upload error:', err)
    }
  }

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
              <img
                src={post.writer.profilePicture ?? icon_default_profile}
                css={PostStyle.profile}
              />
              <span>{post.writer.name}</span>
              <div css={PostStyle.border} />
              <span>{post.modDate}</span>
              {post?.writer.studentNumber === user?.studentNumber && (
                <div css={PostStyle.buttonBox}>
                  <button>
                    <span>수정</span>
                  </button>
                  <button onClick={deleteClick}>
                    <span>삭제</span>
                  </button>
                </div>
              )}
            </div>

            <div css={PostStyle.line} />

            <div
              css={PostStyle.post}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(post.content)),
              }}
            />

            <div css={PostStyle.heart}>
              <img src={Heart} /> {post.likeCount}
              <img src={icon_comment} /> {post.commentCount}
            </div>

            <div css={PostStyle.line} />

            <div css={PostStyle.button}>
              <button css={PostStyle.imgBox} onClick={likeClick}>
                <img src={Heart} css={post.ilikeIt && PostStyle.heartIcon} />
                <span css={post.ilikeIt && PostStyle.liked}>
                  {post.ilikeIt ? '공감취소' : '공감하기'}
                </span>
              </button>
              <div css={PostStyle.div} />
              <button
                css={PostStyle.imgBox}
                onClick={() => inputRef.current?.focus()}
              >
                <img src={icon_comment} /> 댓글달기
              </button>
            </div>

            <div css={PostStyle.commentContainer}>
              {comments.map((item, idx) => (
                <Comment
                  key={idx}
                  content={item.content}
                  writer={item.writer}
                  modDate={item.modDate}
                  id={item.id}
                  onReplySubmit={replyUpload}
                  post_id={post.id}
                />
              ))}

              <div
                css={[
                  PostStyle.newCommentContainer,
                  isFocused && PostStyle.focused,
                ]}
              >
                <input
                  ref={inputRef}
                  type='text'
                  css={PostStyle.newCommentInput}
                  placeholder='댓글 작성'
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button onClick={commentUpload}>
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
