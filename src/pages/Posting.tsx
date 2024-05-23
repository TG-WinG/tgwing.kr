import React, { useRef, useState } from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'

const Posting: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [imgPreview, setImgPreview] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
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
            width: 1296px;
            margin: 0 auto;
          `}
        >
          <TextBox
            margin='80px 0 61px 0'
            fontSize='30px'
            padding='20px 0 0 0'
            height='83px'
            placeholder='제목을 입력해주세요.'
          />
          <Editor />
          <Button
            color='#DADCE2'
            text='다음'
            margin='80px 0 0 auto'
            onClick={() => setPage(1)}
          />
        </div>
      )}
      {page === 1 && (
        <div
          css={css`
            width: 500px;
            margin: 120px auto 0 auto;
          `}
        >
          <p
            css={css`
              font-size: 24px;
              font-weight: 600;
            `}
          >
            태그 등록
          </p>
          <TextBox placeholder='태그를 추가해주세요' margin='20px 0 0 0' />
          <p
            css={css`
              font-size: 24px;
              font-weight: 600;
              margin-top: 93px;
            `}
          >
            썸네일
          </p>
          <p
            css={css`
              color: #9d9fa7;
            `}
          >
            썸네일 이미지를 업로드 해주세요.
          </p>
          <div
            css={css`
              width: 100%;
              height: 333px;
              background: #d9d9d9;
              margin-top: 40px;
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
              color='#DADCE2'
              text='이전'
              margin='80px 0 0 auto'
              onClick={() => setPage(0)}
            />
            <Button
              color='#535459'
              text='완료'
              margin='80px 0 0 19px'
              onClick={() => setPage(2)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Posting
