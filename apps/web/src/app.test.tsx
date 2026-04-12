import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { appRoutes } from '@/router'

describe('webapp routes', () => {
  it('mostra la home sulla root', () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] })
    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Home' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /componente shadcn/i }),
    ).toBeInTheDocument()
  })

  it('naviga alla route Info', () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/about'],
    })
    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Info' }),
    ).toBeInTheDocument()
  })

  it('mostra 404 per path sconosciuti', () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/non-esiste'],
    })
    render(<RouterProvider router={router} />)

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })
})
