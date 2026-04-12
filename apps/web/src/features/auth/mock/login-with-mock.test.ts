import { describe, expect, it } from 'vitest'

import { loginWithMock, sessionFromStoredToken } from './login-with-mock'
import { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD } from './mock-credentials'

describe('loginWithMock', () => {
  it('login ok con credenziali mock', async () => {
    const r = await loginWithMock({
      email: MOCK_VALID_EMAIL,
      password: MOCK_VALID_PASSWORD,
    })
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.session.token.split('.')).toHaveLength(3)
      expect(r.session.user.email).toBe(MOCK_VALID_EMAIL)
    }
  })

  it('rifiuta credenziali errate con messaggio generico', async () => {
    const r = await loginWithMock({
      email: MOCK_VALID_EMAIL,
      password: 'wrong',
    })
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.errorCode).toBe('invalid_credentials')
      expect(r.message).toMatch(/non valide/i)
    }
  })

  it('validazione email vuota', async () => {
    const r = await loginWithMock({ email: '   ', password: 'x' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errorCode).toBe('validation_email')
  })

  it('validazione formato email', async () => {
    const r = await loginWithMock({ email: 'bad', password: 'x' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errorCode).toBe('validation_email_format')
  })
})

describe('sessionFromStoredToken', () => {
  it('ricostruisce sessione da token valido', async () => {
    const r = await loginWithMock({
      email: MOCK_VALID_EMAIL,
      password: MOCK_VALID_PASSWORD,
    })
    if (!r.ok) throw new Error('expected ok')
    const restored = sessionFromStoredToken(r.session.token)
    expect(restored?.user.email).toBe(MOCK_VALID_EMAIL)
  })

  it('null se token corrotto', () => {
    expect(sessionFromStoredToken('x.y.z')).toBeNull()
  })
})
