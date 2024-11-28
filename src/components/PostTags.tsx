import { css } from '@emotion/react'
import { Color } from '../palette'
import TextBox from './TextBox'
import icon_delete from '../assets/icons/icon_delete_tag.svg'
import { useState } from 'react'

interface PostTagsProps {
  tags: string[]
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
}

export const PostTags = ({ tags, onAddTag, onRemoveTag }: PostTagsProps) => {
  const [tagInput, setTagInput] = useState<string>('')

  const handleAddTag = () => {
    onAddTag(tagInput)
    setTagInput('')
  }

  return (
    <>
      <div css={styles.inputContainer}>
        <TextBox
          placeholder='# 태그를 추가해주세요 (최대 5개)'
          height='40px'
          padding='10px'
          value={tagInput}
          maxLength={10}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault()
              handleAddTag()
            }
          }}
        />
        <button css={styles.enterButton} onClick={handleAddTag}>
          Enter
        </button>
      </div>
      <div css={styles.tagsContainer}>
        {tags.map((item, idx) => (
          <div key={idx} css={styles.tag}>
            <button onClick={() => onRemoveTag(item)}>
              <img src={icon_delete} alt='' />
            </button>
            <span css={styles.tagText}>{item}</span>
          </div>
        ))}
      </div>
    </>
  )
}

const styles = {
  inputContainer: css`
    position: relative;
  `,
  enterButton: css`
    border: 0;
    background: none;
    color: ${Color.Gray500};
    position: absolute;
    height: 40px;
    padding: 10px;
    font-size: 12px;
    right: 0px;
  `,
  tagsContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  `,
  tag: css`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 5px;
    padding: 4px 9px;
    background-color: ${Color.Primary};
    border-radius: 1000px;
  `,
  tagText: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: #fff;
  `,
}
