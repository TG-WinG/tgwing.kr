import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Color } from '../platte.ts'

interface Props {
  children: ReactNode
  className?: string
}

const PanelBackgroundStyle = css`
  border-radius: 16px;
  box-shadow: 0px 0px 16px ${Color.Black}4D;
`

export const Panel: FC<Props> = ({ children, className}) => (
  <div
    css={PanelBackgroundStyle}
    className={className}
  >
    { children }
  </div>
)