import { css } from '@emotion/react'
import useSWR from 'swr'
import { fetcher } from '../api'
import Profile from '../pages/Profile'
import { Color } from '../palette'
import PostList from '../techblog/PostList'
import { TUser } from '../types'
import { getCurrentDate } from '../utils/dateFormat'
import { removeHTMLTags } from '../utils/removeTags'
import Button from './Button'
import icon_delete from '../assets/icon_delete_tag.svg'

type UploadPostModalProps = {
  onClose: () => void
  setPage: (page: number) => void
  submit: () => void
  title: string
  tags: string[]
  content: string
  img: string
}

export const UploadPostModal = ({
  onClose,
  setPage,
  submit,
  title,
  tags,
  content,
  img,
}: UploadPostModalProps) => {
  const { data, isLoading, error } = useSWR('profile', fetcher)
  if (isLoading || error) return <div>error</div>
  const userInfo: TUser = data.data

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.5);
      `}
    >
      <div
        css={css`
          position: relative;
          width: 1080px;
          height: 531px;
          margin: 214px auto 0 auto;
          border: 1px solid #dadce2;
          border-radius: 24px;
          padding: 0 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
        `}
      >
        <button
          css={css`
            position: absolute;
            top: 30px;
            right: 30px;
          `}
          onClick={onClose}
        >
          <img
            src={icon_delete}
            alt=''
            css={css`
              width: 20px;
              height: 20px;
              filter: brightness(0) invert(60%);
              transition: 0.2s ease-in-out;

              :hover {
                filter: brightness(10%);
              }
            `}
          />
        </button>
        <p
          css={css`
            font-size: 22.5px;
            font-weight: 700;
            line-height: 27px;
            margin: 80px 0 12px 0;
          `}
          onClick={() => setPage(1)}
        >
          글 작성을 완료하시겠습니까?
        </p>
        <p
          css={css`
            color: #9d9fa7;
            font-size: 15px;
            line-height: 18px;
          `}
        >
          아래와 같이 업로드 됩니다.
        </p>
        <div
          css={css`
            margin-top: 46px;
          `}
        >
          <PostList
            id={12346}
            title={title}
            hashtags={tags}
            modDate={getCurrentDate()}
            content={removeHTMLTags(content)}
            thumbnail={img ?? Profile}
            writer={userInfo}
          />
        </div>

        <Button
          color={Color.Primary}
          text='완료'
          margin='-15px 0 0 19px'
          onClick={submit}
        />
      </div>
    </div>
  )
}
