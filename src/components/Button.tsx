import { css } from '@emotion/react'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string
  text: string
  margin?: string
}

const Button: React.FC<ButtonProps> = ({
  type,
  color,
  text,
  margin,
  onClick,
}) => {
  return (
    <button
      css={css`
        background: ${color};
        width: 200px;
        height: 48px;
        margin: ${margin};
        right: 0;
        border: 0;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        transition: 0.2s ease-in-out;

        &:hover {
          background-color: #2c4bd1;
        }

        &:active {
          background-color: #06208f;
        }
      `}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}

export default Button
