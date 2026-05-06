import { describe, expect, it } from 'vitest'

import {
  isMockValidCredential,
  MOCK_VALID_EMAIL,
  MOCK_VALID_PASSWORD,
} from './mock-credentials'

describe('mock-credentials', () => {
  it('accetta solo la coppia documentata', () => {
    expect(isMockValidCredential(MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD)).toBe(
      true,
    )
    expect(isMockValidCredential(MOCK_VALID_EMAIL, 'wrong')).toBe(false)
    expect(isMockValidCredential('other@test.local', MOCK_VALID_PASSWORD)).toBe(
      false,
    )
  })

  it('email case-insensitive', () => {
    expect(
      isMockValidCredential(
        MOCK_VALID_EMAIL.toUpperCase(),
        MOCK_VALID_PASSWORD,
      ),
    ).toBe(true)
  })
})
