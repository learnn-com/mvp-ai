import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type {
  CatalogSeriesItem,
  CatalogSeriesSection,
} from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'
import { SeriesCategorySlider } from './SeriesCategorySlider'

function mkItem(
  id: string,
  kind: CatalogSeriesItem['kind'],
): CatalogSeriesItem {
  return {
    id,
    kind,
    title: `T ${id}`,
    authorName: 'A',
    authorRole: 'B',
    totalDurationLabel: '1h',
    episodeCount: 1,
    thumbnailUrl: PLACEHOLDER_THUMB,
    categoryKey: 'k',
    categorySlug: 'cat',
  }
}

describe('SeriesCategorySlider', () => {
  it('mostra titolo sezione e link Vedi tutto', () => {
    const section: CatalogSeriesSection = {
      id: '1',
      categoryLabel: 'Marketing',
      slug: 'marketing',
      items: [mkItem('a', 'course')],
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SeriesCategorySlider section={section} /> }],
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
    ).toHaveAttribute('href', '/category/marketing')
  })

  it('mostra al massimo 5 card se N > 5', () => {
    const items = Array.from({ length: 7 }, (_, i) =>
      mkItem(`id-${i}`, 'course'),
    )
    const section: CatalogSeriesSection = {
      id: 'big',
      categoryLabel: 'Big',
      slug: 'big',
      items,
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SeriesCategorySlider section={section} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(
      screen
        .getAllByRole('link')
        .filter((a) => a.getAttribute('href')?.startsWith('/series/')),
    ).toHaveLength(5)
  })

  it('non renderizza nulla se 0 item', () => {
    const section: CatalogSeriesSection = {
      id: 'empty',
      categoryLabel: 'Vuota',
      slug: 'vuota',
      items: [],
    }
    const router = createMemoryRouter(
      [{ path: '/', element: <SeriesCategorySlider section={section} /> }],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })
})
