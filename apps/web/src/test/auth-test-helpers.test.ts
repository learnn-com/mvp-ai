import { describe, expect, it } from 'vitest'

import { createMemorySessionStorage } from '@/features/auth/storage/auth-storage'

import { seedAuthenticatedSession } from './auth-test-helpers'

describe('auth-test-helpers', () => {
  it('seedAuthenticatedSession scrive un token in storage', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    expect(storage.load()).toMatch(/"token"/)
  })
})
