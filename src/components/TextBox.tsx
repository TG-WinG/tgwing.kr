import { css } from '@emotion/react'
import React from 'react'
import { Color } from '../palette'

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  height?: string
  margin?: string
  fontSize?: string
  padding?: string
  position?: string
}

const TextBox: React.FC<TextBoxProps> = ({
  height,
  margin,
  fontSize,
  padding,
  position,
  ...props
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

        :focus {
          outline: none;
          border-color: ${Color.PrimaryBorder};
        }
      `}
      {...props}
    />
  )
}

export default TextBox
