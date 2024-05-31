import { FC } from 'react'
import { css } from '@emotion/react'

import SmallArrowImg from '../assets/small-arrow.png'

const BackwardButtonStyle = css`    
  object-fit: cover;
        
  cursor: pointer;
`

export const BackwardButton: FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src={SmallArrowImg}
      css={BackwardButtonStyle}
      className={className}
    />
  )
}