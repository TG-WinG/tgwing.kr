import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Color } from '../platte.ts'

import SmallArrowImg from '../assets/small-arrow.png'

const BackwardButton: FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src={SmallArrowImg}
      css={css`
        position: relative;
        bottom: 37px;
        right: 100px;
      
        object-fit: cover;
        
        width: 16px;
        
        cursor: pointer;
      `}
      className={className}
    />
  )
}

interface Props {
  children: ReactNode
  className?: string
  showsBackwardButton?: boolean
}

export const Panel: FC<Props> = ({ children, className, showsBackwardButton = false }) => (
  <div
    css={css`
      padding: 77px 140px 77px 140px;
      
      border: 1px solid ${Color.Black};
      border-radius: 32px;
    `}
    className={className}
  >
    { showsBackwardButton && <BackwardButton />}
    { children }
  </div>
)