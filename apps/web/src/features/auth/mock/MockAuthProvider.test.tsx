import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { createMemorySessionStorage } from '@/features/auth/storage/auth-storage'
import { seedAuthenticatedSession } from '@/test/auth-test-helpers'

import { MockAuthProvider } from './MockAuthProvider'
import { useAuth } from './use-auth'
import { MOCK_VALID_EMAIL, MOCK_VALID_PASSWORD } from './mock-credentials'

function Consumer() {
  const { session, logout } = useAuth()
  return (
    <div>
      <span data-testid="email">{session?.user.email ?? 'anon'}</span>
      <button type="button" onClick={logout}>
        esci
      </button>
    </div>
  )
}

describe('MockAuthProvider', () => {
  it('idrata sessione da storage', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)

    render(
      <MockAuthProvider storage={storage}>
        <Consumer />
      </MockAuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('email')).toHaveTextContent(MOCK_VALID_EMAIL)
    })
  })

  it('logout pulisce storage', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)

    render(
      <MockAuthProvider storage={storage}>
        <Consumer />
      </MockAuthProvider>,
    )

    await screen.findByText(MOCK_VALID_EMAIL)
    fireEvent.click(screen.getByRole('button', { name: /esci/i }))
    expect(storage.load()).toBeNull()
    expect(screen.getByTestId('email')).toHaveTextContent('anon')
  })

  it('login aggiorna sessione e storage', async () => {
    const storage = createMemorySessionStorage()

    function LoginProbe() {
      const { session, login } = useAuth()
      return (
        <div>
          <span data-testid="email">{session?.user.email ?? 'anon'}</span>
          <button
            type="button"
            onClick={async () => {
              await login({
                email: MOCK_VALID_EMAIL,
                password: MOCK_VALID_PASSWORD,
              })
            }}
          >
            login
          </button>
        </div>
      )
    }

    render(
      <MockAuthProvider storage={storage}>
        <LoginProbe />
      </MockAuthProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByTestId('email')).toHaveTextContent(MOCK_VALID_EMAIL)
    })
    expect(storage.load()).toContain('token')
  })
})
