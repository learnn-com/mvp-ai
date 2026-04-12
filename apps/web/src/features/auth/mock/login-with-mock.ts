import type {
  AuthSession,
  LoginCredentials,
  LoginResult,
} from '@/features/auth/contracts/auth.contract'
import { GENERIC_INVALID_CREDENTIALS_MESSAGE } from '@/features/auth/contracts/auth.contract'
import { buildMockJwt, parseMockJwt } from '@/features/auth/token/mock-jwt'

import { isMockValidCredential } from './mock-credentials'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function canonicalEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function loginWithMock(
  credentials: LoginCredentials,
): Promise<LoginResult> {
  await Promise.resolve()

  const email = credentials.email.trim()
  const password = credentials.password

  if (!email) {
    return {
      ok: false,
      errorCode: 'validation_email',
      message: 'Inserisci la tua email.',
    }
  }

  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      errorCode: 'validation_email_format',
      message: 'Inserisci un indirizzo email valido.',
    }
  }

  if (!password) {
    return {
      ok: false,
      errorCode: 'validation_password',
      message: 'Inserisci la password.',
    }
  }

  if (!isMockValidCredential(email, password)) {
    return {
      ok: false,
      errorCode: 'invalid_credentials',
      message: GENERIC_INVALID_CREDENTIALS_MESSAGE,
    }
  }

  const user = {
    id: 'mock-user-1',
    email: canonicalEmail(email),
    username: 'abbone_test',
  }

  const expSeconds = Math.floor(Date.now() / 1000) + 60 * 60 * 24
  const token = buildMockJwt(user, expSeconds)

  return {
    ok: true,
    session: {
      user,
      token,
      expiresAtMs: expSeconds * 1000,
    },
  }
}

export function sessionFromStoredToken(
  token: string,
  nowMs = Date.now(),
): AuthSession | null {
  const payload = parseMockJwt(token)
  if (!payload) return null
  if (nowMs >= payload.exp * 1000) return null
  return {
    user: { id: payload.sub, email: payload.email },
    token,
    expiresAtMs: payload.exp * 1000,
  }
}
