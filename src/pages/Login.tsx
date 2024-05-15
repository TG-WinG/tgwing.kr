import { FC, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'wouter'

import { Panel } from '../components/Panel.tsx'

import { useLogin } from '../auth.tsx'

import { Color } from '../platte.ts'
import sectionBarImg from '../assets/section-bar.png'

interface FormInputProps {
  name: string
  type?: string
  placeholder?: string
  pattern?: RegExp
  className?: string
}

const FormInputStyle = {
  label: css`
    display: block;
    
    font-size: 15px;
  `,
  input: css`
    border: 1px solid ${Color.Black};
    border-radius: 24px;
        
    width: 100%;
    height: 48px;
        
    font-size: 15px;
        
    padding-left: 20px;
  `
}

const FormInput: FC<FormInputProps> = ({ name, type, placeholder, pattern, className }) => (
  <div className={className}>
    <label
      htmlFor={name}
      css={FormInputStyle.label}
    >
      학번
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      pattern={pattern?.source}
      required
      css={FormInputStyle.input}
    />
  </div>
)

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
    color: ${Color.MiddleGrey};
    font-size: 15px;
    text-decoration: none;
  `,
  sectionBar: css`
    margin: 0 44px 0 44px;
    
    display: inline-block;
  `
}

export const Login: FC = () => {
  const [ , setIsFailed ] = useState(false)
  const login = useLogin()

  return (
    <div css={LoginStyle.page}>
      <Panel css={LoginStyle.panel} showsBackwardButton>
        <main>
          <h1 css={LoginStyle.title}>환영합니다!</h1>

          {/* @TODO: Refactor form definition with new React 19 form primitives */}
          <form
            onSubmit={event => {
              event.preventDefault()

              login(new FormData(event.currentTarget)).then(setIsFailed)
            }}
          >
            <FormInput name='studentId' placeholder='학번을 입력해주세요.' pattern={/\d{10}/} css={css`margin-bottom: 20px;`} />
            <FormInput name='studentId' type='password' placeholder='비밀번호를 입력해주세요.' css={css`margin-bottom: 32px;`} />

            <button css={LoginStyle.loginButton}>로그인</button>
          </form>

          <nav>
            <Link href='/reset-password' css={[LoginStyle.link, css`margin-left: 96px;`]}>비밀번호 재설정</Link>
            <img css={LoginStyle.sectionBar} src={sectionBarImg} />
            <Link href='/register' css={LoginStyle.link}>회원가입</Link>
          </nav>
        </main>
      </Panel>
    </div>
  )
}