import { useCallback, useMemo, useState, type ReactNode } from 'react'

import type {
  AuthSession,
  LoginCredentials,
  LoginResult,
} from '@/features/auth/contracts/auth.contract'
import type { AuthSessionStorage } from '@/features/auth/storage/auth-storage'
import { createResilientSessionStorage } from '@/features/auth/storage/auth-storage'

import { AuthContext } from './auth-context'
import { loginWithMock, sessionFromStoredToken } from './login-with-mock'

const defaultBrowserStorage = createResilientSessionStorage()

type PersistedV1 = { version: 1; token: string }

function readSessionFromStorage(
  storage: AuthSessionStorage,
): AuthSession | null {
  const raw = storage.load()
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as PersistedV1
    if (data.version !== 1 || typeof data.token !== 'string') {
      storage.clear()
      return null
    }
    const session = sessionFromStoredToken(data.token)
    if (!session) {
      storage.clear()
      return null
    }
    return session
  } catch {
    storage.clear()
    return null
  }
}

export type MockAuthProviderProps = {
  children: ReactNode
  /** Iniettato nei test — default: localStorage resilient. */
  storage?: AuthSessionStorage
}

export function MockAuthProvider({
  children,
  storage = defaultBrowserStorage,
}: MockAuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    readSessionFromStorage(storage),
  )

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResult> => {
      const result = await loginWithMock(credentials)
      if (result.ok) {
        const payload: PersistedV1 = { version: 1, token: result.session.token }
        storage.save(JSON.stringify(payload))
        setSession(result.session)
      }
      return result
    },
    [storage],
  )

  const logout = useCallback(() => {
    storage.clear()
    setSession(null)
  }, [storage])

  const value = useMemo(
    () => ({
      session,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
