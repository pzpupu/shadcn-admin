import { User, UserRoleEnum } from '@/features/users/data/schema';
import { authService } from '@/services/auth-service';
import { create } from 'zustand'

export interface AuthState {
  auth: {
    user: User | null
    setUser: (user: User | null) => void
    reset: () => void
  }
  isAdmin: () => boolean
  role: UserRoleEnum | null
}

export const useAuthStore = create<AuthState>()((set,get) => {

  const initUser = async () => {
    authService.getUserInfo().then((user) => {
      localStorage.setItem('user', JSON.stringify(user))
      const role = user?.role as UserRoleEnum
      set((state) => ({ ...state, auth: { ...state.auth, user }, role }))
    }).catch((error) => {
      if (error.response.status === 401) {  
        localStorage.removeItem('user')
        set((state) => ({ ...state, auth: { ...state.auth, user: null }, role: null }))
      }
    })
  };

  initUser();

  const localUser = localStorage.getItem('user')
  const user: User | null = localUser ? JSON.parse(localUser) : null
  const role: UserRoleEnum | null = user?.role as UserRoleEnum
  return {
    auth: {
      user: user,
      setUser: (user) => {
        set((state) => ({ ...state, auth: { ...state.auth, user } }))
      },
      reset: () =>
        set((state) => {
          localStorage.removeItem('user')
          return {
            ...state,
            auth: { ...state.auth, user: null },
            role: null,
          }
        }),
    },
    isAdmin: () => {
      return get().auth.user?.role === UserRoleEnum.enum.ADMIN || false
    },
    role: role
  }
})
