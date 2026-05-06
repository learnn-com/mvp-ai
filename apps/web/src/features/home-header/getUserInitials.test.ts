import { describe, expect, it } from 'vitest'

import { getUserInitials } from './getUserInitials'

describe('getUserInitials', () => {
  it('usa username su più parole', () => {
    expect(getUserInitials({ email: 'a@b.co', username: 'Mario Rossi' })).toBe(
      'MR',
    )
  })

  it('usa prime due lettere username singola', () => {
    expect(getUserInitials({ email: 'a@b.co', username: 'learnn' })).toBe('LE')
  })

  it('fallback su email se username assente', () => {
    expect(getUserInitials({ email: 'anna@example.com' })).toBe('AN')
  })
})
