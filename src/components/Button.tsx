import { css } from '@emotion/react'
import React from 'react'

interface ButtonProps {
  color: string
  text: string
  margin?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ color, text, margin, onClick }) => {
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
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
