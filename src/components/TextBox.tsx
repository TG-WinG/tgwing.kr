import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../palette'

interface TextBoxProps {
  height?: string
  margin?: string
  fontSize?: string
  padding?: string
  placeholder?: string
  position?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextBox: React.FC<TextBoxProps> = ({
  height,
  margin,
  fontSize,
  padding,
  placeholder,
  position,
  onChange,
}) => {
  return (
    <input
      css={css`
        width: 100%;
        height: ${height};
        border: 0;
        border-bottom: 1px solid ${Color.Gray300};
        margin: ${margin};
        font-size: ${fontSize};
        padding: ${padding};
        position: ${position};
      `}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextBox
