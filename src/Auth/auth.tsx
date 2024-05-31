import { createContext, useContext, FC, ReactNode, useState } from 'react'
import { useLocation } from 'wouter'

//@TODO: Add strict type / format check for fields
export interface User {
  studentId: string
  email: string
  name: string
  birth: Date
  phoneNumber: string
  profilePicture: string
}

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

export function useRegister(): (user: Omit<User, 'profilePicture'> & { password: string }) => Promise<boolean> {
  const [ , setLocation ] = useLocation()

  return async user => {
    const response = await fetch('register', {
      method: 'POST',
      body: JSON.stringify(user)
    })

    if (response.ok) {
      setLocation('/login')

      return true
    } else {
      return false
    }
  }
}