import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { css } from '@emotion/react'

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
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
  `
}

// We may use <dialog> but it may hurt performance.
// In addition, it is tricky to use <dialog> well in React.

export const Modal: FC<Props> = ({ onClose, children, className }) => createPortal(
  <div css={ModalStyle.background} onClick={onClose}>
    <div
      css={ModalStyle.popup}
      className={className}
      onClick={event => event.stopPropagation()}
    >
      {children}
    </div>
  </div>,
  document.getElementById('modal')!
)