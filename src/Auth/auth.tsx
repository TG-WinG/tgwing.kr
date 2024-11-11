import { createContext, useContext, FC, ReactNode, useState } from 'react'

import { StudentId } from './User.ts'

import { addAccessTokenToServer } from '../api/index.ts'
import { useLocation } from 'wouter'

//@TODO: Refactor this when React 19 release.
const Auth = createContext<
  [
    credential: string | null,
    setCredential: (credential: string | null) => void
  ]
>([null, () => {}])

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [credential, setCredential] = useState<string | null>(null)

  return (
    <Auth.Provider value={[credential, setCredential]}>
      {children}
    </Auth.Provider>
  )
}

export function useCredential() {
  return useContext(Auth)[0]
}

//@TODO: Discriminate login failures.
export function useLogin(): (
  studentId: StudentId | string,
  password: string
) => Promise<boolean> {
  const [, setCredential] = useContext(Auth)
  const [, navigate] = useLocation()

  return async (studentId, password) => {
    const loginInfo = new FormData()
    loginInfo.set('username', studentId)
    loginInfo.set('password', password)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: loginInfo,
      })

      const data = await response.json()

      if (data) {
        // isAdmin 값을 sessionStorage에 저장
        sessionStorage.setItem('isAdmin', data.isAdmin.toString())
        console.log('어드민인가요?', data.isAdmin)

        // isAdmin이 true일 경우 /admin 페이지로 이동
        if (data.isAdmin) {
          navigate('/admin')
        }
      }

      if (response.ok) {
        const token = response.headers.get('Authorization')?.split(' ')[1]
        if (token) {
          addAccessTokenToServer(token)
        }
        setCredential(data.credential)
        window.location.reload()
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login request failed:', error)
      throw error
    }
  }
}

export function useLogout(): () => Promise<boolean> {
  const [, setCredential] = useContext(Auth)

  return async () => {
    setCredential(null)

    return true
  }
}

//@TODO: Discriminate registration failures.

export async function register(registrationForm: object): Promise<boolean> {
  const response = await fetch('api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationForm),
  })

  return response.ok
}
