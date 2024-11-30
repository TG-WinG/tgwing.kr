import { FC, useState } from 'react'
import { css } from '@emotion/react'

import { Header } from '../common/Header.tsx'
import { InputBox } from '../common/InputBox.tsx'
import { mainButton, subButton } from '../common/ButtonStyle.ts'

import { register } from './auth.tsx'
import { useLocation } from 'wouter'
import { certifyEmail, verifyEmailCode } from '../api/auth.ts'
import { BeatLoader } from 'react-spinners'
import { Color } from '../palette.ts'
import { formatBirthDate, formatPhoneNumber } from '../utils/dateFormat.ts'

const RegisterStyle = {
  main: css`
    margin-bottom: 80px;
  `,
  title: css`
    font-size: 32px;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 60px;

    text-align: center;
  `,
  singleInput: css`
    margin-left: 50%;
    margin-bottom: 40px;
    transform: translateX(-50%);

    width: 25%;
  `,
  complexInputBox: css`
    display: flex;
    align-items: flex-end;

    margin-bottom: 40px;
  `,
  complexInput: css`
    display: inline-flex;
    margin-left: 37.5%;

    width: 25%;
  `,
  complexInputSideButton: css`
    display: inline-block;
    height: 3em;
    padding: 0 24px;

    margin-left: 10px;
  `,
  registerButton: css`
    margin-left: 50%;
    transform: translateX(-50%);

    height: 47px;
    width: 25%;
  `,
}

// 생년월일 포맷팅 함수

export const Register: FC = () => {
  const [, navigate] = useLocation()
  const [validity, setValidity] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirmCode, setEmailConfirmCode] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [emailVerifyStatus, setEmailVerifyStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle')
  const [emailSendStatus, setEmailSendStatus] = useState<
    'idle' | 'loading' | 'sent'
  >('idle')
  const [birth, setBirth] = useState('')
  const [phone, setPhone] = useState('')

  const handleCertifyEmail = async () => {
    try {
      setEmailSendStatus('loading')
      const res = await certifyEmail({ email })
      setEmailCode(res.data.data)
      setEmailSendStatus('sent')
    } catch (error) {
      console.error('Failed to certify email', error)
      setEmailSendStatus('idle')
    }
  }

  const handleVerifyEmailCode = async () => {
    try {
      await verifyEmailCode({ code: emailConfirmCode }, emailCode)
      setIsEmailVerified(true)
      setEmailVerifyStatus('success')
    } catch (error) {
      console.error('Failed to verify email code', error)
      setEmailVerifyStatus('error')
    }
  }

  const getEmailButtonText = () => {
    switch (emailSendStatus) {
      case 'loading':
        return <BeatLoader size={5} color={Color.Primary} />
      case 'sent':
        return '전송 완료'
      default:
        return '인증 요청'
    }
  }

  return (
    <>
      <Header num={4} />
      <main css={RegisterStyle.main}>
        <h1 css={RegisterStyle.title}>회원가입</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault()

            try {
              const formData = new FormData(event.currentTarget)

              formData.delete('password-confirm')
              formData.delete('email-confirm-code')

              const data = Object.fromEntries(formData.entries())

              await register(data)
              navigate('/')
            } catch {
              console.log('Failed to register')
            }
          }}
          onChange={(event) => {
            if (event.currentTarget.checkValidity() != validity)
              setValidity(!validity)
          }}
        >
          <InputBox
            name='studentNumber'
            label='학번'
            placeholder='학번 10자리를 입력해주세요'
            pattern={/\d{10}/}
            errorMessage='학번을 다시 확인해주세요'
            required
            css={RegisterStyle.singleInput}
          />
          <InputBox
            name='name'
            label='이름'
            placeholder='이름을 입력해주세요'
            errorMessage='이름을 입력해주세요'
            required
            css={RegisterStyle.singleInput}
          />
          <div css={RegisterStyle.complexInputBox}>
            <InputBox
              name='email'
              type='email'
              label='이메일'
              detailedLabel='경희메일만 가능합니다'
              placeholder='ex) tgwing@khu.ac.kr'
              pattern={/.+@khu\.ac\.kr/}
              errorMessage='올바른 이메일을 입력해주세요'
              successMessage={
                emailSendStatus === 'sent' && emailVerifyStatus !== 'success'
                  ? '이메일을 확인해주세요'
                  : undefined
              }
              required
              css={RegisterStyle.complexInput}
              onChange={({ target: { value } }) => {
                setEmail(value)
                setEmailSendStatus('idle')
              }}
              readOnly={isEmailVerified}
            />
            <button
              type='button'
              css={[subButton, RegisterStyle.complexInputSideButton]}
              onClick={handleCertifyEmail}
              disabled={emailSendStatus === 'sent'}
            >
              {getEmailButtonText()}
            </button>
          </div>
          <div css={RegisterStyle.complexInputBox}>
            <InputBox
              name='email-confirm-code'
              label='인증번호'
              placeholder='인증번호를 입력해주세요'
              errorMessage='인증번호가 일치하지 않습니다'
              required
              css={RegisterStyle.complexInput}
              onChange={({ target: { value } }) => {
                setEmailConfirmCode(value)
                setEmailVerifyStatus('idle')
              }}
              readOnly={isEmailVerified}
              isError={emailVerifyStatus === 'error'}
            />
            <button
              type='button'
              css={[subButton, RegisterStyle.complexInputSideButton]}
              onClick={handleVerifyEmailCode}
              disabled={isEmailVerified || emailSendStatus !== 'sent'}
            >
              {isEmailVerified ? '인증 완료' : '인증번호 확인'}
            </button>
          </div>
          <InputBox
            type='password'
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요'
            value={password}
            required
            onChange={({ target: { value } }) => setPassword(value)}
            css={RegisterStyle.singleInput}
          />
          <InputBox
            type='password'
            name='password-confirm'
            label='비밀번호 확인'
            placeholder='비밀번호를 한 번 더 입력해주세요'
            errorMessage='비밀번호가 일치하지 않습니다'
            pattern={new RegExp(password)}
            required
            css={RegisterStyle.singleInput}
          />
          <InputBox
            name='birth'
            label='생년월일'
            placeholder='YYYYMMDD'
            errorMessage='입력 형식에 맞게 입력해주세요'
            pattern={/\d{4}-\d{2}-\d{2}/}
            required
            css={RegisterStyle.singleInput}
            value={birth}
            onChange={({ target: { value } }) => {
              setBirth(formatBirthDate(value))
            }}
            maxLength={10}
          />
          <InputBox
            type='tel'
            name='phoneNumber'
            label='전화번호'
            placeholder='01000000000'
            errorMessage='입력 형식에 맞게 입력해주세요'
            pattern={/010-\d{4}-\d{4}/}
            required
            css={[
              RegisterStyle.singleInput,
              css`
                margin-bottom: 60px;
              `,
            ]}
            value={phone}
            onChange={({ target: { value } }) => {
              setPhone(formatPhoneNumber(value))
            }}
            maxLength={13}
          />

          <button
            disabled={!validity || !isEmailVerified}
            css={[mainButton, RegisterStyle.registerButton]}
          >
            가입 완료
          </button>
        </form>
      </main>
    </>
  )
}
