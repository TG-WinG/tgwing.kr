import { useParams, useLocation } from 'wouter'
import { useGetPostDetail } from '../hooks/query/post.api'
import { ServerError } from './error/ServerError'
import Editor from '../posting/Editor'
import { css } from '@emotion/react'
import TextBox from '../components/TextBox'
import { useState, useEffect } from 'react'
import { Header } from '../common/Header'
import { PostTags } from '../components/PostTags'
import { PostThumbnailUpload } from '../components/PostThumbnailUpload'
import { Color } from '../palette'
import Button from '../components/Button'
import { SelectModal } from '../components/SelectModal'
import { updatePostApi, uploadImageApi } from '../api/post'

export const UpdatePost = () => {
  const { post_id } = useParams()
  const { data: post, isLoading, error } = useGetPostDetail(post_id!)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [imgPreview, setImgPreview] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string | File>('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [, navigate] = useLocation()

  useEffect(() => {
    if (post) {
      setTitle(post.title)

      // 코드 블록 사이에 강제로 구분자 추가
      const cleanContent = post.content
        .replace(/<\/pre>/g, '</pre><p><br></p><p>\u200B</p>') // 보이지 않는 문자 추가
        .replace(/<pre/g, '<p><br></p><pre')

      setContent(cleanContent)
      setTags(post.hashtags)
      setImgPreview(post.thumbnail)
      setThumbnail(post.thumbnail)
    }
  }, [post])

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
    setThumbnail('')
  }

  if (isLoading) return <></>
  if (error || !post) return <ServerError />

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

  const handleUpdatePost = async () => {
    try {
      let imgurl = post.thumbnail // 기존 썸네일 URL 유지

      // 새로운 썸네일이 있는 경우에만 이미지 업로드
      if (typeof thumbnail !== 'string') {
        const formdata = new FormData()
        formdata.append('image', thumbnail)
        imgurl = await uploadImageApi(formdata)
      }

      const postData = {
        title,
        content,
        thumbnail: imgurl,
        hashtags: tags,
      }

      console.log(postData)

      await updatePostApi(post_id!, postData) // post_id와 함께 업데이트 API 호출
      setIsModalOpen(false)
      navigate(`/post/${post_id}`) // 수정 완료 후 블로그 페이지로 이동
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  return (
    <>
      <Header num={1} />
      <div css={Wrapper}>
        <div css={ContentContainer}>
          <TextBox
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin='0 0 30px 0'
            fontSize='24px'
            padding='5px 8px'
            height='48px'
          />
          <Editor value={content} onChange={(value) => setContent(value)} />
        </div>
        <div css={Divider} />
        <div css={TagsContainer}>
          <PostTags
            tags={tags}
            onAddTag={addTag}
            onRemoveTag={(tag) => setTags(tags.filter((t) => t !== tag))}
          />
          <div css={ThumbnailContainer}>
            <PostThumbnailUpload
              fileName={fileName}
              imgPreview={imgPreview}
              onFileChange={handleFileChange}
              onFileDelete={handleFileDelete}
            />
          </div>
          <div css={ButtonContainer}>
            <Button color={Color.Gray100} text='이전' back />
            <Button
              color={Color.Primary}
              text='완료'
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <SelectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div css={PostStyle.modal}>
          <h2>게시글 수정</h2>
          <p>정말 수정하시겠습니까?</p>
          <div css={PostStyle.buttonContainer}>
            <button
              onClick={() => setIsModalOpen(false)}
              css={[PostStyle.cancelButton, PostStyle.modalButton]}
            >
              아니오
            </button>
            <button
              onClick={handleUpdatePost}
              css={[PostStyle.confirmButton, PostStyle.modalButton]}
            >
              예
            </button>
          </div>
        </div>
      </SelectModal>
    </>
  )
}

const Wrapper = css`
  width: 100%;
  height: 100%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  gap: 40px;
`

const ContentContainer = css`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Divider = css`
  width: 1px;
  margin-top: 49px;
  background-color: ${Color.Gray100};
`

const TagsContainer = css`
  width: 20%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`

const ThumbnailContainer = css`
  margin-top: 100px;
`

const ButtonContainer = css`
  margin-top: auto;
  display: flex;
  gap: 10px;
`

const PostStyle = {
  modal: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  buttonContainer: css`
    margin-top: 16px;
    display: flex;
    gap: 16px;
    width: 100%;
  `,
  modalButton: css`
    padding: 8px 16px;
    border-radius: 4px;
    flex: 1;
    transition: all 0.2s ease-in-out;
  `,
  cancelButton: css`
    border: 1px solid ${Color.Gray400};

    :hover {
      background: ${Color.Gray100};
    }

    :active {
      background: ${Color.Gray200};
    }
  `,
  confirmButton: css`
    background: ${Color.Primary};
    color: white;

    :hover {
      background: ${Color.Main700};
    }

    :active {
      background: ${Color.Main800};
    }
  `,
}
