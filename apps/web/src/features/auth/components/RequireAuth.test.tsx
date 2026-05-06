import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { MockAuthProvider } from '@/features/auth/mock/MockAuthProvider'
import { createMemorySessionStorage } from '@/features/auth/storage/auth-storage'
import { appRoutes } from '@/router'
import { seedAuthenticatedSession } from '@/test/auth-test-helpers'

describe('RequireAuth', () => {
  it('reindirizza anonimi verso /login', () => {
    const storage = createMemorySessionStorage()
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] })

    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    expect(
      screen.getByRole('heading', { name: 'Benvenuto' }),
    ).toBeInTheDocument()
  })

  it('consente area protetta con sessione valida', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] })

    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Home' }),
    ).toBeInTheDocument()
  })
})
