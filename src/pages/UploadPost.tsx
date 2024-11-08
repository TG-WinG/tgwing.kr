import { useRef, useState, FC, ChangeEvent } from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import { Color } from '../palette'

import icon_delete from '../assets/icon_delete_tag.svg'
import { uploadImageApi, uploadPostAPi } from '../api/post'
import { UploadPostModal } from '../components/UploadPostModal'
import { Header } from '../common/Header'
import { useLocation } from 'wouter'

const Posting: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [imgPreview, setImgPreview] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>('')

  const fileRef = useRef<HTMLInputElement>(null)

  const [, navigate] = useLocation()

  const addTag = (newTag: string) => {
    if (tags.length > 4) {
      alert('태그는 최대 5개까지 등록할 수 있습니다.')
      return
    }
    const sanitizedTag = newTag.replace(/\s+/g, '')

    if (sanitizedTag && !tags.includes(sanitizedTag)) {
      setTags([...tags, sanitizedTag])
    }

    setTagInput('')
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const clickHandler = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const submitHandler = async () => {
    try {
      if (!thumbnail) {
        throw new Error('No file selected')
      }
      const formdata = new FormData()
      formdata.append('image', thumbnail)
      const imgurl = await uploadImageApi(formdata)
      const postData = {
        title,
        content,
        thumbnail: imgurl,
        hashtags: tags,
      }

      await uploadPostAPi(postData)
      navigate('/blog')
    } catch (error) {
      console.error('Failed to post data:', error)
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnail(file)
      setFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNextClick = () => {
    setPage(1)
  }

  const handleFinalClick = async () => {
    setIsOpen(true)
  }

  const clickDeleteFile = () => {
    setFileName('')
    setImgPreview('')
  }

  return (
    <>
      <Header num={1} />
      {page === 0 && (
        <div
          css={css`
            width: 942px;
            margin: 0 auto;
          `}
        >
          <TextBox
            value={title}
            margin='80px 0 30px 0'
            fontSize='24px'
            padding='5px 8px'
            height='48px'
            placeholder='제목을 입력해주세요.'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor value={content} onChange={(content) => setContent(content)} />
          <Button
            color={Color.Primary}
            text='다음'
            margin='80px 0 0 auto'
            onClick={handleNextClick}
            disabled={
              title.trim() === '' ||
              content.trim() === '' ||
              content === '<p><br></p>'
            }
          />
        </div>
      )}
      {page === 1 && (
        <>
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
                value={tagInput}
                maxLength={10}
                onChange={(e) => setTagInput(e.target.value)}
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
                onClick={() => addTag(tagInput)}
              >
                Enter
              </button>
            </div>
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 20px;
              `}
            >
              {tags.map((item, idx) => (
                <div
                  key={idx}
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 5px;
                    padding: 4px 9px;
                    background-color: ${Color.Primary};
                    border-radius: 1000px;
                  `}
                >
                  <button onClick={() => removeTag(item)}>
                    <img src={icon_delete} alt='' />
                  </button>
                  <span
                    css={css`
                      font-size: 14px;
                      font-weight: 400;
                      line-height: 16.8px;
                      color: #fff;
                    `}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p
              css={css`
                font-size: 24px;
                font-weight: 500;
                margin-top: 88px;
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
                  flex-shrink: 0;
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
              <div
                css={css`
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin-right: 20px;
                `}
              >
                {!fileName ? '파일을 첨부해주세요.' : fileName}
              </div>
              <button
                css={css`
                  margin-left: auto;
                `}
                onClick={clickDeleteFile}
              >
                <img
                  src={icon_delete}
                  alt='x'
                  css={css`
                    width: 14px;
                    height: 14px;
                    filter: brightness(50%);
                  `}
                />
              </button>
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
                justify-content: space-between;
                width: 100%;
                margin-top: 60px;
              `}
            >
              <Button
                color={Color.Gray100}
                text='이전'
                onClick={() => setPage(0)}
                back
              />
              <Button
                color={Color.Primary}
                text='완료'
                onClick={handleFinalClick}
                disabled={!imgPreview}
              />
            </div>
          </div>
          {isOpen && (
            <UploadPostModal
              onClose={() => setIsOpen(false)}
              setPage={setPage}
              submit={submitHandler}
              title={title}
              tags={tags}
              content={content}
              img={imgPreview}
            />
          )}
        </>
      )}
    </>
  )
}

export default Posting
