import { css } from '@emotion/react'
import { useEffect } from 'react'

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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen]) // isOpen을 의존성 배열에 추가

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

    animation: modalFadeIn 0.3s ease-out;

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
}
