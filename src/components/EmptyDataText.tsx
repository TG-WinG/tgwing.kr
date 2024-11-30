import { css } from '@emotion/react'

interface EmptyDataTextProps {
  text: string
}

export const EmptyDataText = ({ text }: EmptyDataTextProps) => {
  return <div css={textStyle}>{text}</div>
}

const textStyle = css`
  width: 100%;
  text-align: center;
  margin: 30px 0;
  color: #888;
`
