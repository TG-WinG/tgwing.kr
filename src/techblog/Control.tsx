import { useRef, useState } from 'react'
import { css } from '@emotion/react'
import { CustomPlusButton } from '../components/CustomPlusButton'
import userStore from '../store/User'
import { useLocation } from 'wouter'
import { CustomInput } from '../components/CustomInput'

const ControlStyle = {
  Wrapper: css`
    display: flex;
    gap: 20px;
  `,
}

type ControlProps = {
  setKeyword?: (keyword: string) => void
  setHashtag?: (hashtag: string[]) => void
  project?: boolean
}

const Control = ({ setKeyword, setHashtag, project }: ControlProps) => {
  const [searchTag, setSearchTag] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const [, navigate] = useLocation()

  const { user } = userStore()

  const clickHandler = () => {
    if (!inputRef.current) return

    if (setKeyword) {
      setKeyword(inputRef.current.value)
    }

    if (setHashtag && searchTag.length > 0) {
      setHashtag(searchTag)
    }

    inputRef.current.value = ''
  }

  return (
    <div
      css={css`
        width: 945px;
        margin: 50px auto 40px auto;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div css={ControlStyle.Wrapper}>
        <CustomInput
          inputRef={inputRef}
          clickHandler={clickHandler}
          placeholder='검색어를 입력하세요'
          setHashtag={setHashtag ? setSearchTag : undefined}
        />
        <CustomPlusButton
          onClick={() => navigate(project ? '/newproject' : '/posting')}
          text={project ? '새 프로젝트' : '글쓰기'}
          disabled={Boolean(!user)}
        />
      </div>
    </div>
  )
}

export default Control
