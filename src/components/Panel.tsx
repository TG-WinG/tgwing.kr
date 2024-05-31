import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Color } from '../platte.ts'

import SmallArrowImg from '../assets/small-arrow.png'

const BackwardButtonStyle = css`
  position: relative;
  bottom: 37px;
  right: 100px;
      
  object-fit: cover;
        
  width: 16px;
        
  cursor: pointer;
`

const BackwardButton: FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src={SmallArrowImg}
      css={BackwardButtonStyle}
      className={className}
    />
  )
}

interface Props {
  children: ReactNode
  className?: string
  showsBackwardButton?: boolean
}

const PanelBackgroundStyle = css`
  padding: 77px 140px 77px 140px;
  border: 1px solid ${Color.LightGrey2}CC;
  border-radius: 32px;
  box-shadow: 1px 1px 20px ${Color.Black}1A;
`

export const Panel: FC<Props> = ({ children, className, showsBackwardButton = false }) => (
  <div
    css={PanelBackgroundStyle}
    className={className}
  >
    { showsBackwardButton && <BackwardButton />}
    { children }
  </div>
)