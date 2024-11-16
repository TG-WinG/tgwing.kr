import { css } from '@emotion/react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const SelectModal = ({
  isOpen,
  onClose,
  children,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div css={styles.overlay} onClick={onClose}>
      <div css={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const styles = {
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  modal: css`
    background: white;
    padding: 48px;
    border-radius: 8px;
    min-width: 360px;
  `,
}
