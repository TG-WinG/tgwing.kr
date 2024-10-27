import PlusButtonIcon from '../assets/icon_plus_btn.svg'
import { css } from '@emotion/react'
import { Color } from '../palette'

type CustomPlusButtonProps = {
  onClick: () => void
  text: string
  disabled?: boolean
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

  &:disabled {
    border-color: ${Color.Gray400};
    color: ${Color.Gray400};
    cursor: not-allowed;

    &:hover {
      background-color: #fff;
    }

    &:active {
      background-color: #fff;
    }

    img {
      filter: invert(71%) sepia(7%) saturate(330%) hue-rotate(193deg)
        brightness(93%) contrast(85%);
    }
  }
`

export const CustomPlusButton = ({
  onClick,
  text,
  disabled,
}: CustomPlusButtonProps) => {
  return (
    <button onClick={onClick} css={buttonStyle} disabled={disabled}>
      <img src={PlusButtonIcon} alt='+' /> <div>{text}</div>
    </button>
  )
}
