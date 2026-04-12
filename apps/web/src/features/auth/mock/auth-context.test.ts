import { describe, expect, it } from 'vitest'

import { AuthContext } from './auth-context'

describe('auth-context', () => {
  it('espone un context React', () => {
    expect(AuthContext).toBeDefined()
    expect(AuthContext.Provider).toBeTruthy()
  })
})
