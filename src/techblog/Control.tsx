import React from 'react'
import { css } from '@emotion/react'

const TempStyle = {
  label: css`
    width: 224px;
    height: 64px;
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
  `,

  input: css`
    width: 224px;
    height: 64px;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    border-radius: 32px;
    border: 0;
    padding: 0 20px;
  `,
}

const Control: React.FC = () => {
  return (
    <div
      css={css`
        width: 1280px;
        margin: 60px auto;
        display: flex;
      `}
    >
      <label css={TempStyle.label}>글쓰기</label>
      <input css={TempStyle.input} placeholder='검색' />
    </div>
  )
}

export default Control
