import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../palette'

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  height?: string
  margin?: string
  fontSize?: string
  padding?: string
  placeholder?: string
  position?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextBox: React.FC<TextBoxProps> = ({
  value,
  height,
  margin,
  fontSize,
  padding,
  placeholder,
  position,
  onChange,
  maxLength,
}) => {
  return (
    <input
      css={css`
        width: 100%;
        height: ${height};
        border: 0;
        border-bottom: 1.5px solid ${Color.Gray300};
        margin: ${margin};
        font-size: ${fontSize};
        padding: ${padding};
        position: ${position};
      `}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextBox
