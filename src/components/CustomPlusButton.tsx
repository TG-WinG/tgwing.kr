import React from 'react'
import PlusButtonIcon from '../assets/icon_plus_btn.svg'
import { css } from '@emotion/react'
import { Color } from '../palette'

type CustomPlusButtonProps = {
  onClick: () => void
  text: string
}

const buttonStyle = css`
  display: flex;
  align-items: center;
  padding: 7.5px 15px;
  border: 1px solid ${Color.Primary};
  border-radius: 20px;
  gap: 6px;
  background-color: ${Color.White};
  font-size: 14px;
  font-weight: 400;
  line-height: 22.5px;
  color: ${Color.Primary};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Color.Secondary};
  }

  &:active {
    background-color: ${Color.Primary};
    color: ${Color.White};

    img {
      filter: brightness(0) invert(100%);
    }
  }
`

export const CustomPlusButton = ({ onClick, text }: CustomPlusButtonProps) => {
  return (
    <button onClick={onClick} css={buttonStyle}>
      <img src={PlusButtonIcon} alt='+' /> <div>{text}</div>
    </button>
  )
}
