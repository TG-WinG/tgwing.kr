import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Color } from '../platte.ts'

interface Props {
  children: ReactNode
  className?: string
}

const PanelBackgroundStyle = css`
  padding: 77px 140px 77px 140px;
  border-radius: 32px;
  box-shadow: 1px 1px 20px ${Color.Black}1A;
`

export const Panel: FC<Props> = ({ children, className}) => (
  <div
    css={PanelBackgroundStyle}
    className={className}
  >
    { children }
  </div>
)