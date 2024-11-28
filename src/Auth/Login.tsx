import { FC } from 'react'
import { css } from '@emotion/react'

import { Modal } from '../common/Modal.tsx'
import { InputBox } from '../common/InputBox.tsx'

import { Color } from '../platte.ts'
import { mainButton } from '../common/ButtonStyle.ts'
import verticalBar from '../assets/images/verticalBar.png'
import { Link } from 'wouter'
import { z } from 'zod'
import { useLogin } from './auth.tsx'

interface Props {
  onClose: () => void
  context?: string
}

const LoginModalStyle = {
  loginForm: css`
    display: flex;
    flex-direction: column;
    min-width: 416px;
  `,
  title: css`
    font-size: 32px;
    font-weight: 700;

    margin-bottom: 7px;

    :has(+ h2:empty) {
      margin-bottom: 50px;
    }
  `,
  context: css`
    font-size: 16px;
    font-weight: 400;
    color: ${Color.Gray500};

    margin-bottom: 24px;

    :empty {
      display: none;
    }
  `,
  loginButton: css`
    padding: 15px 187px;
  `,
  navBox: css`
    display: flex;

    justify-content: center;

    a {
      font-size: 15px;
      font-weight: 400;
      color: ${Color.Gray400};
      text-decoration: none;
    }
  `,
  verticalBar: css`
    margin-left: 14px;
    margin-right: 14px;
  `,
}

export const LoginModal: FC<Props> = ({ context, ...props }) => {
  const login = useLogin()

  return (
    <Modal {...props}>
      <main>
        <form
          css={LoginModalStyle.loginForm}
          onSubmit={async (event) => {
            event.preventDefault()

            try {
              const loginForm = new FormData(event.currentTarget)

              const studentId = loginForm.get('schoolId')?.toString()
              const password = loginForm.get('password')?.toString()

              const parsedPassword = z.string().parse(password)

              console.log('login try')

              await login(studentId!, parsedPassword)
              props.onClose()
            } catch {
              console.log('Failed to login')
            }
          }}
        >
          <h1 css={LoginModalStyle.title}>환영합니다!</h1>
          <h2 css={LoginModalStyle.context}>{context}</h2>

          <InputBox
            name='schoolId'
            label='학번'
            placeholder='학번을 입력해주세요'
            pattern={/^admin$|^\d{10}$/}
            errorMessage='학번은 숫자 열 자리여야 합니다'
            required
            css={css`
              margin-bottom: 20px;
            `}
            login
          />
          <InputBox
            name='password'
            label='비밀번호'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            errorMessage='비밀번호를 입력해주세요'
            required
            css={css`
              margin-bottom: 40px;
            `}
            login
          />

          <button
            css={[
              mainButton,
              LoginModalStyle.loginButton,
              css`
                margin-bottom: 20px;
              `,
            ]}
          >
            로그인
          </button>

          <nav css={LoginModalStyle.navBox}>
            <Link href='/reset-password'>비밀번호 재설정</Link>
            <img src={verticalBar} css={LoginModalStyle.verticalBar} />
            <Link href='/register'>회원가입</Link>
          </nav>
        </form>
      </main>
    </Modal>
  )
}
