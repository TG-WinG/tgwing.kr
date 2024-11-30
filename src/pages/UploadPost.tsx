import { useState, FC } from 'react'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import { Color } from '../palette'

import { uploadImageApi, uploadPostAPi } from '../api/post'
import { UploadPostModal } from '../components/UploadPostModal'
import { Header } from '../common/Header'
import { useLocation } from 'wouter'
import { PostTags } from '../components/PostTags'
import { PostThumbnailUpload } from '../components/PostThumbnailUpload'

const Posting: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const [imgPreview, setImgPreview] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

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
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
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

  const handleFileChange = (file: File) => {
    setThumbnail(file)
    setFileName(file.name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImgPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileDelete = () => {
    setFileName(null)
    setImgPreview('')
    setThumbnail(null)
  }

  const handleNextClick = () => {
    setPage(1)
  }

  const handleFinalClick = async () => {
    setIsOpen(true)
  }

  return (
    <>
      <Header num={1} />
      {page === 0 && (
        <div
          css={css`
            width: 942px;
            margin: 0 auto;
            padding-bottom: 100px;
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
              padding-bottom: 100px;
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
            <PostTags tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
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

            <PostThumbnailUpload
              fileName={fileName}
              imgPreview={imgPreview}
              onFileChange={handleFileChange}
              onFileDelete={handleFileDelete}
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
