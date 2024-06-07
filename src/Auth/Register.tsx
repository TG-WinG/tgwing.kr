import { FC, useState } from 'react'
import { css } from '@emotion/react'

import { Header } from '../common/Header.tsx'
import { InputBox } from '../common/InputBox.tsx'
import { mainButton, subButton } from '../common/ButtonStyle.ts'

import { register } from './auth.tsx'
import { RegistrationForm } from './User.ts'
import { useLocation } from 'wouter'

const RegisterStyle = {
  form: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  title: css`
    font-size: 32px;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 60px;
    
    text-align: center;
  `,
  inputBox: css`
    margin-bottom: 40px;
    
    width: 25%;
  `,
  inputWithButtonBox: css`
    width: 50%; 
    
    display:flex; 
    align-items: flex-end; 
    
    margin-bottom: 40px;
  `,
  registrationButton: css`
    width: 25%;
    height: 47px;
  `
}

export const Register: FC = () => {
  const [ , navigate ] = useLocation()
  const [ validity, setValidity ] = useState(false)
  const [ password, setPassword ] = useState('')

  return (
    <>
      <Header />
      <main>
        <h1 css={RegisterStyle.title}>회원가입</h1>

        <form
          css={RegisterStyle.form}
          onSubmit={async event => {
            event.preventDefault()

            try {
              const formData = new FormData(event.currentTarget)
              const registrationForm = RegistrationForm.parse({
                studentId: formData.get('studentId'),
                email: formData.get('email'),
                name: formData.get('name'),
                birth: formData.get('birth'),
                phoneNumber: formData.get('phoneNumber'),
                password: formData.get('password')
              })

              await register(registrationForm)

              //@TODO open login modal
              navigate('/')
            } catch {
              //@TODO inform user that login has failed
              console.log('Failed to register')
            }
          }}
          onChange={event => {
            if (event.currentTarget.checkValidity() != validity) setValidity(!validity)
          }}>
          <InputBox
            name="studentId"
            label="학번"
            placeholder="학번 10자리를 입력해주세요"
            pattern={/\d{10}/}
            errorMessage="학번을 다시 확인해주세요"
            required
            css={RegisterStyle.inputBox}
          />
          <InputBox
            name="name"
            label="이름"
            placeholder="이름을 입력해주세요"
            errorMessage="이름을 입력해주세요"
            required
            css={RegisterStyle.inputBox}
          />
          <div css={RegisterStyle.inputWithButtonBox}>
            <div css={css`width: 25%; display: inline-block`}></div>
            <InputBox
              name="email"
              type="email"
              label="이메일"
              detailedLabel="경희메일만 가능합니다"
              placeholder="ex) tgwing@khu.ac.kr"
              pattern={/.+@khu\.ac\.kr/}
              errorMessage="올바른 이메일을 입력해주세요"
              required
              css={[RegisterStyle.inputBox, css`display: inline-flex; width: 50%; margin-bottom: 0px;`]}
            />
            <button css={[subButton, css`display: inline-block; width: 25%; height: 3rem; margin-left: 10px;`]}>인증 요청</button>
          </div>
          <div css={RegisterStyle.inputWithButtonBox}>
            <div css={css`width: 25%; display: inline-block`}></div>
            <InputBox
              name="email-confirm-code"
              label="인증번호"
              placeholder="인증번호를 입력해주세요"
              errorMessage="인증번호가 일치하지 않습니다."
              required
              css={[RegisterStyle.inputBox, css`display: inline-flex; width: 50%; margin-bottom: 0px;`]}
            />
            <button css={[subButton, css`display: inline-block; width: 25%; height: 3rem; margin-left: 10px;`]}>인증번호 확인</button>
          </div>
          <InputBox
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            required
            css={RegisterStyle.inputBox}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <InputBox
            type='password'
            name="password-confirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            errorMessage="비밀번호가 일치하지 않습니다"
            pattern={new RegExp(password)}
            required
            css={RegisterStyle.inputBox}
          />
          <InputBox
            name="birth"
            label="생년월일"
            placeholder="YYYY-MM-DD"
            errorMessage="입력 형식에 맞게 입력해주세요"
            pattern={/\d{4}-\d{2}-\d{2}/}
            required
            css={RegisterStyle.inputBox}
          />
          <InputBox
            type="tel"
            name="phoneNumber"
            label="전화번호"
            placeholder="010-0000-0000"
            errorMessage="입력 형식에 맞게 입력해주세요"
            pattern={/010-\d{4}-\d{4}/}
            required
            css={[RegisterStyle.inputBox, css`margin-bottom: 60px;`]}
          />

          <button disabled={!validity} css={[mainButton, RegisterStyle.registrationButton]}>가입 완료</button>
        </form>
      </main>
    </>
  )
}