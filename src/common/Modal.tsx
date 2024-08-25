import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { css } from '@emotion/react'

import { Panel } from './Panel.tsx'

import { imageButtonBase } from './ImageButton.tsx'
import { Color } from '../platte.ts'
import closeIcon from '../assets/close.png'

interface Props {
  onClose?: () => void
  children: ReactNode
  className?: string
}

const ModalStyle = {
  background: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    backdrop-filter: opacity(20%) blur(1px) brightness(70%);
  `,
  popup: css`
    position: absolute;
    top: 250px;
    left: 50vw;
    transform: translateX(-50%);
    
    padding: 80px 120px;
    
    background-color: ${Color.White};
  `,
  closeButton: css`
    ${imageButtonBase(closeIcon)}
  
    position: absolute;
    top: 32px;
    right: 32px;
    
    width: 16px;
    height: 16px;
  `
}

// We may use <dialog> but it may hurt performance.
// In addition, it is tricky to use <dialog> well in React.

export const Modal: FC<Props> = ({ onClose, children, className }) => createPortal(
  // We can't use Event#eventPhase since React incorrectly implemented it in SyntheticEvents: https://github.com/facebook/react/issues/9783
  <div
    css={ModalStyle.background}
    onClick={onClose && (event => event.currentTarget === event.target && onClose())}
  >
    <Panel css={ModalStyle.popup} className={className}>
      <button css={ModalStyle.closeButton} onClick={onClose} />
      { children }
    </Panel>
  </div>,
  document.getElementById('modal')!
)