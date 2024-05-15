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

const FormInput: FC<FormInputProps> = ({ name, type, placeholder, pattern, className }) => (
  <div className={className}>
    <label
      htmlFor={name}
      css={css`
        display: block; 
        font-size: 15px;
      `}
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
      css={css`
        border: 1px solid ${Color.Black};
        border-radius: 24px;
        
        width: 100%;
        height: 48px;
        
        font-size: 15px;
        
        padding-left: 20px;
      `}
    />
  </div>
)

export const Login: FC = () => {
  const [ , setIsFailed ] = useState(false)
  const login = useLogin()

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Panel css={css`width: 780px; height: 536px;`} showsBackwardButton>
        <main>
          <h1 css={css`font-size: 30px; display: block; margin-bottom: 60px;`}>환영합니다!</h1>

          {/* @TODO: Refactor form definition with new React 19 form primitives */}
          <form
            onSubmit={event => {
              event.preventDefault()

              login(new FormData(event.currentTarget)).then(setIsFailed)
            }}
          >
            <FormInput name='studentId' placeholder='학번을 입력해주세요.' pattern={/\d{10}/} css={css`margin-bottom: 20px;`} />
            <FormInput name='studentId' type='password' placeholder='비밀번호를 입력해주세요.' css={css`margin-bottom: 32px;`} />

            <button
              css={css`
                height: 48px;
                width: 100%;
                
                background-color: ${Color.LightGrey};
                color: ${Color.DarkGrey};
                border: 1px solid ${Color.LightGrey};
                border-radius: 24px;
                
                font-size: 15px;
                text-align: center;
                
                margin-bottom: 20px;
              `}
            >
              로그인
            </button>
          </form>

          <nav>
            <Link href='/reset-password' css={css`color: ${Color.MiddleGrey}; margin-left: 96px; font-size: 15px; text-decoration: none;`}>비밀번호 재설정</Link>
            <img css={css`margin-left: 44px; margin-right: 44px; display: inline-block;`} src={sectionBarImg} />
            <Link href='/reset-password' css={css`color: ${Color.MiddleGrey}; font-size: 15px; text-decoration: none;`}>회원가입</Link>
          </nav>
        </main>
      </Panel>
    </div>
  )
}