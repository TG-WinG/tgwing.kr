import { css } from '@emotion/react'
import React from 'react'

interface TextBoxProps {
  height?: string
  margin?: string
  fontSize?: string
  padding?: string
  placeholder?: string
}

const TextBox: React.FC<TextBoxProps> = ({
  height,
  margin,
  fontSize,
  padding,
  placeholder,
}) => {
  return (
    <input
      css={css`
        width: 100%;
        height: ${height};
        border: 0;
        border-bottom: 3px solid #c4c6cc;
        margin: ${margin};
        font-size: ${fontSize};
        padding: ${padding};
      `}
      placeholder={placeholder}
    />
  )
}

export default TextBox
