import { useRef } from 'react'
import { css } from '@emotion/react'
import { Color } from '../palette'
import { Link } from 'wouter'
import { CustomPlusButton } from '../components/CustomPlusButton'
import icon_search from '../assets/icon_search.svg'

const ControlStyle = {
  Wrapper: css`
    display: flex;
    gap: 20px;
  `,
  InputBox: css`
    display: flex;
    width: 340px;
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

      :focus {
        outline: 0;
      }
    }

    :focus-within .SearchIcon {
      filter: invert(47%) sepia(39%) saturate(1009%) hue-rotate(193deg)
        brightness(101%) contrast(96%);
    }
  `,
}

type ControlProps = {
  setKeyword?: (keyword: string) => void
}

const Control = ({ setKeyword }: ControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    if (inputRef.current && setKeyword) {
      setKeyword(inputRef.current.value)
      inputRef.current.value = ''
    }
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
        <div css={ControlStyle.InputBox}>
          <input ref={inputRef} type='text' placeholder='검색' />
          <button onClick={clickHandler}>
            <img className='SearchIcon' src={icon_search} alt='' />
          </button>
        </div>
        <Link to='/posting'>
          <CustomPlusButton onClick={() => console.log('hi')} text='글쓰기' />
        </Link>
      </div>
    </div>
  )
}

export default Control
