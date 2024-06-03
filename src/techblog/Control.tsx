import React from 'react'
import { css } from '@emotion/react'
import { Color } from '../platte'

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
    border: 1.5px solid ${Color.Primary};
    padding: 10px 15px;
    margin-right: 20px;
  `,
}

const Control: React.FC = () => {
  return (
    <div
      css={css`
        width: 945px;
        margin: 20px auto;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <input
        css={TempStyle.input}
        placeholder='위에 배너랑 margin이 좀 짧은 느낌이지않나'
      />
      <label css={TempStyle.label}>+ 글쓰기</label>
    </div>
  )
}

export default Control
