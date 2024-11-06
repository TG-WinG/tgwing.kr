import { createContext, useContext, FC, ReactNode, useState } from 'react'

import { StudentId } from './User.ts'
import { addAccessTokenToServer } from '../api/index.ts'

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
  studentId: StudentId,
  password: string
) => Promise<boolean> {
  const [, setCredential] = useContext(Auth)

  return async (studentId, password) => {
    const loginInfo = new FormData()

    loginInfo.set('username', studentId)
    loginInfo.set('password', password)

    const response = await fetch('/api/login', {
      method: 'POST',
      body: loginInfo,
    })

    if (response.ok) {
      const token = response.headers.get('Authorization')?.split(' ')[1]
      if (token) {
        addAccessTokenToServer(token)
      }
      const credential = await response.text()
      console.log(response)

      setCredential(credential)
      window.location.reload()

      return true
    } else {
      return false
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
