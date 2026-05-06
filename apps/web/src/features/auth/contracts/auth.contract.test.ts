import { describe, expect, it } from 'vitest'

import {
  AUTH_SESSION_STORAGE_KEY,
  GENERIC_INVALID_CREDENTIALS_MESSAGE,
} from './auth.contract'

describe('auth.contract', () => {
  it('espone chiave storage stabile', () => {
    expect(AUTH_SESSION_STORAGE_KEY).toMatch(/^learnn\./)
  })

  it('messaggio credenziali generiche non è vuoto', () => {
    expect(GENERIC_INVALID_CREDENTIALS_MESSAGE.length).toBeGreaterThan(8)
  })
})
