import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../platte'

interface TextBoxProps {
  height?: string
  margin?: string
  fontSize?: string
  padding?: string
  placeholder?: string
  position?: string
}

const TextBox: React.FC<TextBoxProps> = ({
  height,
  margin,
  fontSize,
  padding,
  placeholder,
  position,
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
    />
  )
}

export default TextBox
