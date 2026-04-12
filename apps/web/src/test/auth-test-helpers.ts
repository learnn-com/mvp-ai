import type { AuthSessionStorage } from '@/features/auth/storage/auth-storage'

import { loginWithMock } from '@/features/auth/mock/login-with-mock'
import {
  MOCK_VALID_EMAIL,
  MOCK_VALID_PASSWORD,
} from '@/features/auth/mock/mock-credentials'

export async function seedAuthenticatedSession(
  storage: AuthSessionStorage,
): Promise<void> {
  const result = await loginWithMock({
    email: MOCK_VALID_EMAIL,
    password: MOCK_VALID_PASSWORD,
  })
  if (!result.ok) {
    throw new Error('seedAuthenticatedSession: login mock fallito')
  }
  storage.save(JSON.stringify({ version: 1, token: result.session.token }))
}

export { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD }
