import { createContext, useContext, FC, ReactNode, useState } from 'react'

import { z } from 'zod'

export const User = z.object({
  studentId: z.string().regex(/\d{10}/),
  email: z.string().max(25).email().endsWith('@khu.ac.kr'),
  name: z.string(),
  birth: z.string().date(),
  phoneNumber: z.string().regex(/\d{3}-\d{4}-\d{4}/),
  profilePicture: z.string().url(),
})
export type User = z.infer<typeof User>

//@TODO: Refactor this when React 19 release.
const Auth
  = createContext<[ credential: string | null, setCredential: (credential: string | null) => void ]>([ null, () => {} ])

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ credential, setCredential ] = useState<string | null>(null)

  return (
    <Auth.Provider value={[ credential, setCredential ]}>
      { children }
    </Auth.Provider>
  )
}

export function useCredential() {
  return useContext(Auth)[0]
}

//@TODO: Discriminate login failures.
export function useLogin(): (loginFormData: FormData) => Promise<boolean> {
  const [ , setCredential ] = useContext(Auth)

  return async loginFormData => {
    const response = await fetch('login', {
      method: 'POST',
      body: loginFormData,
    })

    if (response.ok) {
      const credential = await response.text()

      setCredential(credential)

      return true
    } else {
      return false
    }
  }
}

export function useLogout(): () => Promise<boolean> {
  const [ , setCredential ] = useContext(Auth)

  return async () => {
    setCredential(null)

    return true
  }
}

//@TODO: Discriminate registration failures.
export async function register(user: Omit<User, 'profilePicture'> & { password: string }): Promise<boolean> {
  const response = await fetch('register', {
    method: 'POST',
    body: JSON.stringify(user)
  })

  return response.ok
}