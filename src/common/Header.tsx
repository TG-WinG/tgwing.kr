import { FC, useState } from 'react'

import { css } from '@emotion/react'
import { Link } from 'wouter'

import logo from '../assets/logo.png'
import { Color } from '../platte.ts'
import { LoginModal } from '../Auth/Login.tsx'
import { ProfileModal } from '../components/ProfileModal.tsx'
import userStore from '../store/User.ts'
import icon_default_profile from '../assets/icon_default_profile.svg'

type HeaderProps = {
  num: number
}

const HeaderStyle = {
  header: css`
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 2px 0px ${Color.Black}1A;
    height: 60px;
  `,
  logoBox: css`
    flex: 4;
  `,
  logo: css`
    display: inline-block;
    width: 113px;
    height: 23px;
    margin-left: 75px;
  `,
  navBox: (activeIndex: number) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 16px;
      font-weight: 500;
      color: ${Color.Gray500};
      text-decoration: none;
      text-align: center;
      flex: 1;

      &:nth-of-type(${activeIndex + 1}) {
        color: ${Color.Primary};
      }
    }

    flex: 3;
  `,
  profileBox: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 4;
  `,
  loginButton: css`
    font-size: 16px;
    font-weight: 500;
    color: ${Color.Gray500};
    background-color: transparent;
    border: none;
    margin-right: 12px;
  `,
  profileButton: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    margin-right: 75px;
  `,
  profileImage: css`
    width: 24px;
    height: 24px;
    border-radius: 999px;
    object-fit: cover;
  `,
}

export const Header: FC<HeaderProps> = ({ num }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false)

  const { user } = userStore()

  return (
    <>
      <header css={HeaderStyle.header}>
        <div css={HeaderStyle.logoBox}>
          <img src={logo} css={HeaderStyle.logo} />
        </div>

        <nav css={HeaderStyle.navBox(num)}>
          <Link href='/'>About us</Link>
          <Link href='/blog'>Tech-blog</Link>
          <Link href='/project'>Project</Link>
        </nav>

        <div css={HeaderStyle.profileBox}>
          {!user && (
            <button
              css={HeaderStyle.loginButton}
              onClick={() => setIsOpen(true)}
            >
              Log-in
            </button>
          )}
          <button
            css={HeaderStyle.profileButton}
            onClick={() => setIsProfileOpen(true)}
          >
            {user && (
              <img
                src={user.profilePicture ?? icon_default_profile}
                css={HeaderStyle.profileImage}
              />
            )}
          </button>
        </div>
      </header>
      {isOpen && <LoginModal context='' onClose={() => setIsOpen(false)} />}
      {isProfileOpen && user && (
        <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  )
}
