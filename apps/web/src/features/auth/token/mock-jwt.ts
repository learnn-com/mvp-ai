import type { AuthUser } from '@/features/auth/contracts/auth.contract'

export type MockJwtPayload = {
  sub: string
  email: string
  exp: number
}

function encodeSegment(obj: unknown): string {
  const json = JSON.stringify(obj)
  const b64 = btoa(json)
  return b64.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

function decodeSegment(segment: string): string {
  const padded = segment.replaceAll('-', '+').replaceAll('_', '/')
  const padLen = (4 - (padded.length % 4)) % 4
  const withPad = padded + '='.repeat(padLen)
  return atob(withPad)
}

/**
 * Token **JWT-like** (tre segmenti) per mock: header HS256-like fittizio, payload con `exp` in secondi.
 * Firma fissa `mock` — non usare per sicurezza reale.
 */
export function buildMockJwt(user: AuthUser, expSeconds: number): string {
  const header = encodeSegment({ alg: 'none', typ: 'JWT' })
  const payload = encodeSegment({
    sub: user.id,
    email: user.email,
    exp: expSeconds,
  } satisfies MockJwtPayload)
  return `${header}.${payload}.mock`
}

export function parseMockJwt(token: string): MockJwtPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const raw = decodeSegment(parts[1] ?? '')
    const data = JSON.parse(raw) as MockJwtPayload
    if (typeof data.sub !== 'string') return null
    if (typeof data.email !== 'string') return null
    if (typeof data.exp !== 'number') return null
    return data
  } catch {
    return null
  }
}

export function isMockJwtExpired(
  payload: MockJwtPayload,
  nowMs = Date.now(),
): boolean {
  return nowMs >= payload.exp * 1000
}
