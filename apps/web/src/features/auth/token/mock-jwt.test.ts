import { describe, expect, it } from 'vitest'

import { buildMockJwt, isMockJwtExpired, parseMockJwt } from './mock-jwt'

describe('mock-jwt', () => {
  const user = { id: 'u1', email: 'abbone.test@learnn.local' }

  it('costruisce e parsa un token a tre segmenti', () => {
    const exp = Math.floor(Date.now() / 1000) + 3600
    const token = buildMockJwt(user, exp)
    expect(token.split('.')).toHaveLength(3)
    const payload = parseMockJwt(token)
    expect(payload).toEqual({
      sub: 'u1',
      email: 'abbone.test@learnn.local',
      exp,
    })
  })

  it('restituisce null se token corrotto', () => {
    expect(parseMockJwt('not-a-jwt')).toBeNull()
    expect(parseMockJwt('a.b')).toBeNull()
  })

  it('rileva scadenza dal payload', () => {
    const past = Math.floor(Date.now() / 1000) - 10
    expect(isMockJwtExpired({ sub: 'x', email: 'x', exp: past })).toBe(true)
  })
})
