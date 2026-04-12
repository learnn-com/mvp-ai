/**
 * Contratti auth frontend (Membership) — provider mock oggi, swap con client Strapi
 * (`/auth/local` o equivalente) dietro la stessa interfaccia applicativa.
 */

export type AuthUser = {
  id: string
  email: string
  username?: string
}

/** Sessione applicativa dopo login mock. */
export type AuthSession = {
  user: AuthUser
  /** Token JWT-like (tre segmenti base64url) — vedi `mock-jwt.ts`. */
  token: string
  expiresAtMs: number
}

export type LoginCredentials = {
  email: string
  password: string
}

export type LoginErrorCode =
  | 'invalid_credentials'
  | 'validation_email'
  | 'validation_password'
  | 'validation_email_format'

export type LoginFailure = {
  ok: false
  errorCode: LoginErrorCode
  /** Messaggio sicuro per UI (nessun dettaglio interno). */
  message: string
}

export type LoginSuccess = {
  ok: true
  session: AuthSession
}

export type LoginResult = LoginSuccess | LoginFailure

export const AUTH_SESSION_STORAGE_KEY = 'learnn.mock.auth.session.v1'

/** Messaggio generico allineato a futuro Strapi Users & Permissions (no leak). */
export const GENERIC_INVALID_CREDENTIALS_MESSAGE =
  'Credenziali non valide. Controlla email e password.'
