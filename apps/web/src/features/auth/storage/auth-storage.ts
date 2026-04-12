import { AUTH_SESSION_STORAGE_KEY } from '@/features/auth/contracts/auth.contract'

export type AuthSessionStorage = {
  load(): string | null
  save(serialized: string): void
  clear(): void
}

/**
 * localStorage con fallback in-memory se storage bloccato (es. modalità privata restrittiva).
 */
export function createMemorySessionStorage(): AuthSessionStorage {
  let value: string | null = null
  return {
    load: () => value,
    save(serialized) {
      value = serialized
    },
    clear() {
      value = null
    },
  }
}

export function createResilientSessionStorage(
  key: string = AUTH_SESSION_STORAGE_KEY,
): AuthSessionStorage {
  let memory: string | null = null
  return {
    load() {
      try {
        const v = globalThis.localStorage?.getItem(key)
        if (v) {
          memory = v
          return v
        }
      } catch {
        /* private mode / disabled */
      }
      return memory
    },
    save(serialized: string) {
      try {
        globalThis.localStorage?.setItem(key, serialized)
      } catch {
        /* ignore — sessione resta solo in RAM */
      }
      memory = serialized
    },
    clear() {
      try {
        globalThis.localStorage?.removeItem(key)
      } catch {
        /* ignore */
      }
      memory = null
    },
  }
}
