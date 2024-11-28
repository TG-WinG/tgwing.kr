import { useRef, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import { Color } from '../palette'
import icon_delete from '../assets/icons/icon_delete_tag.svg'

interface PostThumbnailUploadProps {
  fileName: string | null
  imgPreview: string
  onFileChange: (file: File) => void
  onFileDelete: () => void
}

export const PostThumbnailUpload = ({
  fileName,
  imgPreview,
  onFileChange,
  onFileDelete,
}: PostThumbnailUploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    if (fileRef.current) fileRef.current.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileChange(file)
    }
  }

  return (
    <>
      <div css={styles.fileInputContainer}>
        <button css={styles.attachButton} onClick={clickHandler}>
          파일첨부
        </button>
        <div css={styles.fileNameText}>
          {!fileName ? '파일을 첨부해주세요.' : fileName}
        </div>
        <button css={styles.deleteButton} onClick={onFileDelete}>
          <img src={icon_delete} alt='x' css={styles.deleteIcon} />
        </button>
      </div>

      <div css={styles.previewContainer} onClick={clickHandler}>
        {imgPreview && (
          <img
            src={imgPreview}
            css={styles.previewImage}
            alt='Thumbnail preview'
          />
        )}
      </div>
      <input
        type='file'
        ref={fileRef}
        css={styles.hiddenInput}
        onChange={handleFileChange}
      />
    </>
  )
}

const styles = {
  fileInputContainer: css`
    display: flex;
    color: ${Color.Gray400};
    align-items: center;
    margin-bottom: 20px;
  `,
  attachButton: css`
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
  `,
  fileNameText: css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  `,
  deleteButton: css`
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
  `,
  deleteIcon: css`
    width: 14px;
    height: 14px;
    filter: brightness(50%);
  `,
  previewContainer: css`
    margin: 0 auto;
    width: 240px;
    height: 160px;
    background: #d9d9d9;
    cursor: pointer;
  `,
  previewImage: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  hiddenInput: css`
    display: none;
  `,
}
