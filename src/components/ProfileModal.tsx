import { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { Color } from '../palette'
import { useLocation } from 'wouter'
import { TUser } from '../types'
import icon_default_profile from '../assets/icon_default_profile.svg'
import { logout } from '../api/auth'

type ProfileModalProps = {
  user: TUser
  onClose: () => void
}

export const ProfileModal = ({ user, onClose }: ProfileModalProps) => {
  const [, navigate] = useLocation()

  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleLogout = async () => {
    const res = await logout()
    navigate('/')
    window.location.reload()
    console.log(res)
  }

  return (
    <div
      ref={modalRef}
      css={css`
        width: 300px;
        height: 181px;
        position: absolute;
        top: 65px;
        right: 75px;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 24px;
          padding: 33px 0 32px 24px;
        `}
      >
        <img
          src={user.profilePicture ?? icon_default_profile}
          alt='x'
          css={css`
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 999px;
          `}
        />
        <div
          css={css`
            font-size: 12px;
            font-weight: 400;
            line-height: 14.4px;
            color: ${Color.Gray500};
          `}
        >
          <div
            css={css`
              margin-bottom: 10px;
            `}
          >
            <span
              css={css`
                font-size: 20px;
                line-height: 24px;
                color: ${Color.Black};
              `}
            >
              {user.name}{' '}
            </span>
            님
          </div>
          <div
            css={css`
              margin-bottom: 2px;
            `}
          >
            {user.studentNumber}
          </div>
          <div>{user.email}</div>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          margin: 0 7px;
          flex-grow: 1;
          border-top: 1px solid ${Color.Gray100};
        `}
      >
        <button
          css={css`
            font-size: 14px;
            flex: 1;
          `}
          onClick={() => navigate('/profile')}
        >
          프로필
        </button>
        <div
          css={css`
            height: calc(100% - 7px);
            border-right: 1px solid ${Color.Gray100};
          `}
        />
        <button
          css={css`
            flex: 1;
            font-size: 14px;
            color: ${Color.Gray300};
            transition: 0.3s ease-in-out;

            :hover {
              color: ${Color.Gray800};
            }
          `}
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}
