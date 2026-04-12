import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type {
  CatalogSingleItem,
  CatalogSingleSection,
} from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'
import { SingleCategorySlider } from './SingleCategorySlider'

function mkItem(id: string): CatalogSingleItem {
  return {
    id,
    title: `T ${id}`,
    shortDescription: 'D',
    thumbnailUrl: PLACEHOLDER_THUMB,
    categorySlug: 'cat',
    categoryTitle: 'Cat',
  }
}

describe('SingleCategorySlider', () => {
  it('mostra titolo sezione e link Vedi tutto con view=singles', () => {
    const section: CatalogSingleSection = {
      id: '1',
      categoryLabel: 'Marketing',
      slug: 'marketing',
      items: [mkItem('a')],
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleCategorySlider section={section} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(
      screen.getByRole('heading', { name: 'Marketing' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /Vedi tutti i contenuti in Marketing/i,
      }),
    ).toHaveAttribute('href', '/category/marketing?view=singles')
  })

  it('mostra al massimo 10 card se N > 10', () => {
    const items = Array.from({ length: 14 }, (_, i) => mkItem(`id-${i}`))
    const section: CatalogSingleSection = {
      id: 'big',
      categoryLabel: 'Big',
      slug: 'big',
      items,
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleCategorySlider section={section} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(
      screen
        .getAllByRole('link')
        .filter((a) => a.getAttribute('href')?.startsWith('/content/')),
    ).toHaveLength(10)
  })

  it('non renderizza nulla se 0 item', () => {
    const section: CatalogSingleSection = {
      id: 'empty',
      categoryLabel: 'Vuota',
      slug: 'vuota',
      items: [],
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SingleCategorySlider section={section} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})
