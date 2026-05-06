import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { MockAuthProvider } from '@/features/auth/mock/MockAuthProvider'
import { appRoutes } from '@/router'
import { createMemorySessionStorage } from '@/features/auth/storage/auth-storage'
import {
  MOCK_VALID_EMAIL,
  MOCK_VALID_PASSWORD,
} from '@/features/auth/mock/mock-credentials'

describe('LoginPage', () => {
  it('login ok naviga alla Home', async () => {
    const storage = createMemorySessionStorage()
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/login'] })

    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: MOCK_VALID_EMAIL },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: MOCK_VALID_PASSWORD },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Accedi' }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    })
  })

  it('credenziali errate mostrano errore', async () => {
    const storage = createMemorySessionStorage()
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/login'] })

    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: MOCK_VALID_EMAIL },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong-pass' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Accedi' }))

    expect(
      await screen.findByText(/Credenziali non valide/i),
    ).toBeInTheDocument()
  })
})
