import { describe, expect, it } from 'vitest'

import {
  createMemorySessionStorage,
  createResilientSessionStorage,
} from './auth-storage'

describe('createResilientSessionStorage', () => {
  it('persiste, legge e pulisce su localStorage (jsdom)', () => {
    const key = `test-key-${Math.random().toString(16).slice(2)}`
    const storage = createResilientSessionStorage(key)
    storage.save('{"version":1}')
    expect(storage.load()).toBe('{"version":1}')
    storage.clear()
    expect(storage.load()).toBeNull()
  })
})

describe('createMemorySessionStorage', () => {
  it('mantiene i dati solo in RAM', () => {
    const storage = createMemorySessionStorage()
    storage.save('x')
    expect(storage.load()).toBe('x')
    storage.clear()
    expect(storage.load()).toBeNull()
  })
})
