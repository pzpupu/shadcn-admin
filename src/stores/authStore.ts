import { authService } from '@/services/auth-service';
import { create } from 'zustand'

export interface AuthUser {
  id: string;
  username: string;
  authorities: {
    authority: string;
  }[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    reset: () => void
  }
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthState>()((set,get) => {

  const initUser = async () => {
    authService.getUserInfo().then((user) => {
      localStorage.setItem('user', JSON.stringify(user))
      set((state) => ({ ...state, auth: { ...state.auth, user } }))
    }).catch((error) => {
      console.error('获取用户信息失败:', error)
      if (error.response.status === 401) {  
        localStorage.removeItem('user')
        set((state) => ({ ...state, auth: { ...state.auth, user: null } }))
      }
    })
  };

  initUser();

  const localUser = localStorage.getItem('user')
  const user: AuthUser | null = localUser ? JSON.parse(localUser) : null

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
          }
        }),
    },
    isAdmin: () => {
      return get().auth.user?.authorities.some((authority) => authority.authority === 'ROLE_ADMIN') ?? false
    }
  }
})
