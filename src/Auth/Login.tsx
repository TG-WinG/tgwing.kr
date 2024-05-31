import { FC } from 'react'
import { css } from '@emotion/react'
import { Link } from 'wouter'

import { Panel } from '../components/Panel.tsx'

import { useLogin } from './auth.tsx'

import { Color } from '../platte.ts'
import sectionBarImg from '../assets/section-bar.png'
import { BackwardButton } from '../components/BackwardButton.tsx'
import { LabelledInput } from '../components/LabelledInput.tsx'

const LoginStyle = {
  page: css`
    width: 100vw;
    height: 100vh;
        
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  panel: css`
    width: 780px;
    height: 536px;
  `,
  backwardButton: css`
    position: relative;
    bottom: 37px;
    right: 50px;
    
    width: 16px;
  `,
  title: css`
    font-size: 30px;
    
    margin-bottom: 60px;
  `,
  loginButton: css`
    height: 48px;
    width: 100%;
                
    background-color: ${Color.LightGrey};
    color: ${Color.DarkGrey};
    
    border: 1px solid ${Color.LightGrey};
    border-radius: 24px;
                
    font-size: 15px;
    text-align: center;
                
    margin-bottom: 20px;
  `,
  link: css`
    color: ${Color.DarkGrey};
    font-size: 15px;
    text-decoration: none;
  `,
  sectionBar: css`
    margin: 0 44px 0 44px;
    
    display: inline-block;
  `
}

export const Login: FC = () => {
  const login = useLogin()

  return (
    <div css={LoginStyle.page}>
      <Panel css={LoginStyle.panel}>
        <main>
          <BackwardButton css={LoginStyle.backwardButton} />
          <h1 css={LoginStyle.title}>환영합니다!</h1>

          {/* @TODO: Refactor form definition with new React 19 form primitives */}
          <form
            onSubmit={event => {
              event.preventDefault()

              //@TODO: Add failure notification
              login(new FormData(event.currentTarget))
            }}
          >
            <LabelledInput
              name='studentId'
              label='학번'
              placeholder='학번을 입력해주세요.'
              pattern={/\d{10}/}
              required
              errorMessage='학번을 다시 확인해주세요.'
              css={css`margin-bottom: 20px;`}
            />
            <LabelledInput
              name='studentId'
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              required
              css={css`margin-bottom: 32px;`}
            />

            <button css={LoginStyle.loginButton}>로그인</button>
          </form>

          <nav>
            <Link href='/reset-password' asChild><a css={[LoginStyle.link, css`margin-left: 96px;`]}>비밀번호 재설정</a></Link>
            <img css={LoginStyle.sectionBar} src={sectionBarImg} />
            <Link href='/register' asChild><a css={LoginStyle.link}>회원가입</a></Link>
          </nav>
        </main>
      </Panel>
    </div>
  )
}