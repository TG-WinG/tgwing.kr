import { create } from 'zustand'
import { TUser } from '../types'

type TUserStore = {
  user: TUser | null
  setUser: (user: TUser | null) => void
  removeUser: () => void
}

const userStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}))

export default userStore
