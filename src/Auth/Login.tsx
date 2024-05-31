import { FC, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'wouter'

import { Panel } from '../components/Panel.tsx'

import { useLogin } from './auth.tsx'

import { Color } from '../platte.ts'
import sectionBarImg from '../assets/section-bar.png'
import { BackwardButton } from '../components/BackwardButton.tsx'

interface FormInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  pattern?: RegExp
  error?: boolean
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
    
    &[data-error="true"] {
      border-color: ${Color.Red};
    }
  `
}

const FormInput: FC<FormInputProps> = ({ name, label, type, placeholder, pattern, error, className }) => (
  <div className={className}>
    <label
      htmlFor={name}
      css={FormInputStyle.label}
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      pattern={pattern?.source}
      required
      css={FormInputStyle.input}
      data-error={error}
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
  const [ isFailed , setIsFailed ] = useState(false)
  const login = useLogin()

  return (
    <div css={LoginStyle.page}>
      <Panel css={[LoginStyle.panel, isFailed && css`border-color: ${Color.Red};`]}>
        <main>
          <BackwardButton css={LoginStyle.backwardButton} />
          <h1 css={LoginStyle.title}>환영합니다!</h1>

          {/* @TODO: Refactor form definition with new React 19 form primitives */}
          <form
            onSubmit={event => {
              event.preventDefault()

              login(new FormData(event.currentTarget)).then(success => setIsFailed(!success))
            }}
          >
            <FormInput
              name='studentId'
              label='학번'
              placeholder='학번을 입력해주세요.'
              pattern={/\d{10}/}
              error={isFailed}
              css={css`margin-bottom: 20px;`}
            />
            <FormInput
              name='studentId'
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              error={isFailed}
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