import { createContext } from 'react'

import type {
  AuthSession,
  LoginCredentials,
  LoginResult,
} from '@/features/auth/contracts/auth.contract'

export type AuthContextValue = {
  session: AuthSession | null
  login: (credentials: LoginCredentials) => Promise<LoginResult>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
