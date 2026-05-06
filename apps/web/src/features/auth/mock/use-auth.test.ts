import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useAuth } from './use-auth'

describe('useAuth', () => {
  it('senza provider lancia errore', () => {
    expect(() => {
      renderHook(() => useAuth())
    }).toThrow(/MockAuthProvider/)
  })
})
