import { css } from '@emotion/react'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  text: string
  margin?: string
  back?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type,
  color,
  text,
  margin,
  onClick,
  disabled,
  back = false,
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
          background-color: ${!back ? '#2c4bd1' : '#C3C5CB'};
        }

        &:active {
          background-color: ${!back ? ' #06208f' : '#9799A1'};
        }

        &:disabled {
          cursor: not-allowed;
          background-color: #cfd8ff;
        }
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
