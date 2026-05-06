import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { MockAuthProvider } from '@/features/auth/mock/MockAuthProvider'
import { appRoutes } from '@/router'
import { createMemorySessionStorage } from '@/features/auth/storage/auth-storage'
import { seedAuthenticatedSession } from '@/test/auth-test-helpers'

function renderApp(path: string, storage = createMemorySessionStorage()) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] })
  return render(
    <MockAuthProvider storage={storage}>
      <RouterProvider router={router} />
    </MockAuthProvider>,
  )
}

describe('webapp routes', () => {
  it('anonimo su / vede login', () => {
    renderApp('/')
    expect(
      screen.getByRole('heading', { name: 'Benvenuto' }),
    ).toBeInTheDocument()
  })

  it('mostra la home sulla root quando autenticato', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    renderApp('/', storage)

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Home' }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('home-header')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /componente shadcn/i }),
    ).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Sviluppo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Design' })).toBeInTheDocument()
  })

  it('route categoria WIP risponde senza 404', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/category/sviluppo'],
    })
    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Sviluppo' }),
    ).toBeInTheDocument()
  })

  it('route overview serie WIP risponde senza 404', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/series/s1'],
    })
    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )
    expect(await screen.findByRole('heading', { level: 1, name: 'Contenuto' })).toBeInTheDocument()
    expect(screen.getByText(/s1/)).toBeInTheDocument()
  })

  it('naviga alla route Info', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/about'] })
    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Info' }),
    ).toBeInTheDocument()
  })

  it('mostra 404 per path sconosciuti (autenticato)', async () => {
    const storage = createMemorySessionStorage()
    await seedAuthenticatedSession(storage)
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/non-esiste'],
    })
    render(
      <MockAuthProvider storage={storage}>
        <RouterProvider router={router} />
      </MockAuthProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: '404' }),
    ).toBeInTheDocument()
  })
})
