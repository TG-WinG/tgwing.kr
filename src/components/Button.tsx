import { css } from '@emotion/react'
import React from 'react'

interface ButtonProps {
  color: string
  text: string
  margin?: string
}

const Button: React.FC<ButtonProps> = ({ color, text, margin }) => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <button
        css={css`
          background: ${color};
          width: 99px;
          height: 48px;
          margin: ${margin};
          right: 0;
          border: 0;
          border-radius: 29.5px;
          font-size: 20px;
          color: #fff;
        `}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
