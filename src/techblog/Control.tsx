import { FC } from 'react'
import { css } from '@emotion/react'
import { Color } from '../palette'
import { Link } from 'wouter'
import { CustomPlusButton } from '../components/CustomPlusButton'
import icon_search from '../assets/icon_search.svg'

const TempStyle = {
  label: css`
    width: 85px;
    height: 38px;
    display: flex;
    justify-content: center;
    border: 1px solid ${Color.Primary};
    color: ${Color.Primary};
    align-items: center;
    border-radius: 32px;
  `,

  input: css`
    width: 340px;
    height: 38px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 32px;
    border: 1px solid ${Color.Primary};
    padding: 10px 15px;
    margin-right: 20px;
  `,
}

const Control: FC = () => {
  return (
    <div
      css={css`
        width: 945px;
        margin: 20px auto;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <input css={TempStyle.input} placeholder='검색' />
        <button
          css={css`
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 31px;
          `}
        >
          <img src={icon_search} alt='x' />
        </button>
      </div>
      <Link to='/posting'>
        <CustomPlusButton onClick={() => console.log('hi')} text='글쓰기' />
      </Link>
    </div>
  )
}

export default Control
