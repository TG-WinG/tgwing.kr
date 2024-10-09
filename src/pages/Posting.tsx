import React, { useRef, useState } from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import { Color } from '../palette'
import PostList from '../techblog/PostList'

import Profile from '../assets/blog_background.png'
import { accessToken } from '../api'
import { mutate } from 'swr'

const Posting: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const fileRef = useRef<HTMLInputElement>(null)

  const postFetcher = (url: string, data: unknown) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())

  const clickHandler = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const submitHandler = async () => {
    const postData = {
      title,
      content,
      thumbnail: 'hi',
    }

    try {
      await mutate('/api/blog', postFetcher('/api/blog', postData))
      setPage(2)
    } catch (error) {
      console.error('Failed to post data:', error)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {page === 0 && (
        <div
          css={css`
            width: 942px;
            margin: 0 auto;
          `}
        >
          <TextBox
            margin='80px 0 61px 0'
            fontSize='24px'
            padding='5px 8px'
            height='48px'
            placeholder='제목을 입력해주세요.'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor onChange={(content) => setContent(content)} />
          <Button
            color={Color.Secondary}
            text='다음'
            margin='80px 0 0 auto'
            onClick={() => setPage(1)}
          />
        </div>
      )}
      {page === 1 && (
        <div
          css={css`
            width: 430px;
            margin: 120px auto 0 auto;
          `}
        >
          <p
            css={css`
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 20px;
            `}
          >
            태그 등록
          </p>
          <div
            css={css`
              position: relative;
            `}
          >
            <TextBox
              placeholder='# 태그를 추가해주세요 (최대 5개)'
              height='40px'
              padding='10px'
              // position='relative'
            />
            <button
              css={css`
                border: 0;
                background: none;
                color: ${Color.Gray500};
                position: absolute;
                height: 40px;
                padding: 10px;
                font-size: 12px;
                right: 0px;
              `}
            >
              Enter
            </button>
          </div>
          <p
            css={css`
              font-size: 24px;
              font-weight: 500;
              margin-top: 93px;
            `}
          >
            썸네일
          </p>
          <p
            css={css`
              color: #9d9fa7;
              margin-bottom: 40px;
            `}
          >
            썸네일 이미지를 업로드 해주세요.
          </p>

          <div
            css={css`
              display: flex;
              color: ${Color.Gray400};
              align-items: center;
              margin-bottom: 20px;
            `}
          >
            <button
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                width: 58px;
                height: 26px;
                border: 1px solid ${Color.Primary};
                border-radius: 4px;
                color: ${Color.Primary};
                font-size: 12px;
                margin-right: 20px;
                background: none;
              `}
              onClick={clickHandler}
            >
              파일첨부
            </button>
            <div>{!fileName ? '파일을 첨부해주세요.' : fileName}</div>
            <div
              css={css`
                margin-left: auto;
              `}
            >
              X
            </div>
          </div>

          <div
            css={css`
              margin: 0 auto;
              width: 240px;
              height: 160px;
              background: #d9d9d9;
            `}
            onClick={clickHandler}
          >
            {imgPreview && (
              <img
                src={imgPreview}
                css={css`
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                `}
              />
            )}
          </div>
          <input
            type='file'
            ref={fileRef}
            css={css`
              display: none;
            `}
            onChange={handleFileChange}
          />

          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              color={Color.Secondary}
              text='완료'
              margin='60px 0 0 19px'
              onClick={() => setPage(2)}
            />
          </div>
        </div>
      )}
      {page === 2 && (
        <div
          css={css`
            width: 1080px;
            height: 531px;
            margin: 214px auto 0 auto;
            border: 1px solid #dadce2;
            border-radius: 24px;
            padding: 0 72px;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <p
            css={css`
              font-size: 22.5px;
              font-weight: 700;
              margin: 80px 0 12px 0;
            `}
          >
            글 작성을 완료하시겠습니까?
          </p>
          <p
            css={css`
              color: #9d9fa7;
              font-size: 15px;
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
              title='제목 어쩌고 저쩌고 블라블라'
              tag='프로젝트'
              date='2024.05.01'
              intro='여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야할 10가지 필수 아이템을 상세히 소개합니당'
              profile={Profile}
              name='Sunny'
              heart={2}
              comment={4}
            />
          </div>

          <Button
            color={Color.Primary}
            text='완료'
            margin='-15px 0 0 19px'
            onClick={submitHandler}
          />
        </div>
      )}
    </>
  )
}

export default Posting
