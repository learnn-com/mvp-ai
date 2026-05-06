import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { CatalogSingleItem } from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'
import { SingleContentCard } from './SingleContentCard'

function mkItem(overrides: Partial<CatalogSingleItem> = {}): CatalogSingleItem {
  return {
    id: 'c1',
    title: 'Titolo',
    shortDescription: 'Breve',
    thumbnailUrl: PLACEHOLDER_THUMB,
    categorySlug: 'cat',
    categoryTitle: 'Cat',
    ...overrides,
  }
}

describe('SingleContentCard', () => {
  it('collega al dettaglio contenuto stub', () => {
    const item = mkItem({ id: 'xyz' })
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleContentCard item={item} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByRole('link', { name: /Titolo/ })).toHaveAttribute(
      'href',
      '/content/xyz',
    )
  })

  it('applica line-clamp a titolo e descrizione', () => {
    const item = mkItem()
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleContentCard item={item} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    const title = screen.getByText('Titolo')
    const desc = screen.getByText('Breve')
    expect(title.className).toMatch(/line-clamp-1/)
    expect(desc.className).toMatch(/line-clamp-1/)
  })

  it('non mostra chrome serie (webinar, episodi, …)', () => {
    const item = mkItem()
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleContentCard item={item} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(
      screen.queryByTestId('series-card-webinar-badge'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('series-card-episode-count'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/WEBINAR/i)).not.toBeInTheDocument()
  })
})
