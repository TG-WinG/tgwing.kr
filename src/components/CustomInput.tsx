import { css } from '@emotion/react'
import { Color } from '../palette'
import { RefObject, useEffect, useState } from 'react'
import icon_search from '../assets/icons/icon_search.svg'
import useSWR from 'swr'
import { fetcher } from '../api'
import { Loading } from './Loading'

type CustomInputProps = {
  inputRef: RefObject<HTMLInputElement>
  clickHandler: () => void
  placeholder?: string
  setHashtag?: (hashtag: string[]) => void
}

export const CustomInput = ({
  inputRef,
  clickHandler,
  placeholder,
  setHashtag,
}: CustomInputProps) => {
  const [keyword, setKeyword] = useState('')
  const [isTagSearch, setIsTagSearch] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    if (keyword.startsWith('#') && setHashtag) {
      setIsTagSearch(true)
      return
    }
    setIsTagSearch(false)
  }, [keyword, setHashtag])

  const { data } = useSWR(`hashtag?keyword=${keyword.substring(1)} `, fetcher)

  const handleTagClick = (tagName: string) => {
    if (!setHashtag) return

    if (selectedTags.length === 2) {
      alert('태그는 한 번에 두 개만 등록할 수 있습니다.')
      return
    }
    setSelectedTags((prevTags) => [...prevTags, tagName])
    setHashtag([...selectedTags, tagName] as string[])
    setKeyword('')
  }

  const handleTagRemove = (tagName: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagName))
  }

  return (
    <div css={Wrapper}>
      <div css={Style}>
        {setHashtag &&
          selectedTags.map((item, idx) => (
            <div key={idx} css={TagCard}>
              {item}
              <button css={TagDeleteBtn} onClick={() => handleTagRemove(item)}>
                X
              </button>
            </div>
          ))}
        <input
          ref={inputRef}
          type='text'
          placeholder={setHashtag ? placeholder : '검색어를 입력하세요'}
          onChange={handleChange}
          value={keyword}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault()
              clickHandler()
            }
          }}
        />
        <button onClick={clickHandler}>
          <img className='SearchIcon' src={icon_search} alt='' />
        </button>
      </div>
      {isTagSearch && setHashtag && (
        <div css={TagLists}>
          {data ? (
            data.content.map((item: { id: number; name: string }) => (
              <div
                key={item.id}
                css={TagItem}
                onClick={() => handleTagClick(item.name)}
              >
                <div css={TagCard}>{item.name}</div>
              </div>
            ))
          ) : (
            <div css={[TagItem, Spinner]}>
              <Loading color={Color.Primary} size={30} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const Wrapper = css`
  position: relative;
`

const Style = css`
  display: flex;
  min-width: 340px;
  border: 1px solid ${Color.Primary};
  padding: 10px 15px;
  border-radius: 999px;
  gap: 10px;

  input {
    flex: 1;
    border: 0;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    min-width: 240px;

    :focus {
      outline: 0;
    }
  }

  :focus-within .SearchIcon {
    filter: invert(47%) sepia(39%) saturate(1009%) hue-rotate(193deg)
      brightness(101%) contrast(96%);
  }
`

const TagLists = css`
  background-color: #fff;
  position: absolute;
  margin-top: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  min-height: 40px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 10000;
`

const TagItem = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  :hover {
    background-color: #eeeeee;
  }
`

const TagCard = css`
  background-color: ${Color.Primary};
  color: #fff;
  padding: 2px 9px; // 4px로 할 시 폰트 밀림
  border-radius: 7500px;
  font-size: 12px;
`

const Spinner = css`
  padding: 30px 0;
  justify-content: center;
`

const TagDeleteBtn = css`
  color: #fff;
  font-weight: 600;
  margin-left: 5px;
`
