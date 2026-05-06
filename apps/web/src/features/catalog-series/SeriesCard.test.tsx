import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { CatalogSeriesItem } from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'
import { SeriesCard } from './SeriesCard'

function renderCard(item: CatalogSeriesItem) {
  const router = createMemoryRouter(
    [{ path: '/', element: <SeriesCard item={item} /> }],
    { initialEntries: ['/'] },
  )
  return render(<RouterProvider router={router} />)
}

const baseItem = (over: Partial<CatalogSeriesItem>): CatalogSeriesItem => ({
  id: 'x1',
  kind: 'course',
  title: 'Titolo serie',
  authorName: 'Nome',
  authorRole: 'Ruolo',
  totalDurationLabel: '1h',
  episodeCount: 3,
  thumbnailUrl: PLACEHOLDER_THUMB,
  categoryKey: 'k',
  categorySlug: 'slug',
  ...over,
})

describe('SeriesCard', () => {
  it('mostra badge WEBINAR per webinar', () => {
    renderCard(baseItem({ kind: 'webinar' }))
    expect(screen.getByTestId('series-card-webinar-badge')).toHaveTextContent(
      'WEBINAR',
    )
  })

  it('non mostra badge WEBINAR per corso', () => {
    renderCard(baseItem({ kind: 'course' }))
    expect(
      screen.queryByTestId('series-card-webinar-badge'),
    ).not.toBeInTheDocument()
  })

  it('mostra conteggio episodi sulla thumb', () => {
    renderCard(baseItem({ episodeCount: 16 }))
    expect(screen.getByTestId('series-card-episode-count')).toHaveTextContent(
      '16',
    )
  })

  it('mostra titolo, autore e durata', () => {
    renderCard(
      baseItem({
        title: 'Corso Alpha',
        authorName: 'Mario',
        authorRole: 'Dev',
        totalDurationLabel: '1h 20min',
      }),
    )
    expect(screen.getByText('Corso Alpha')).toBeInTheDocument()
    expect(screen.getByText(/Mario — Dev/)).toBeInTheDocument()
    expect(screen.getByText('1h 20min')).toBeInTheDocument()
  })

  it('non mostra indicatori fuori scope HD/CC/AU/TX', () => {
    renderCard(baseItem({}))
    expect(screen.queryByText(/HD/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/CC/i)).not.toBeInTheDocument()
  })

  it('link verso overview serie', () => {
    renderCard(baseItem({ id: 'abc-123' }))
    const link = screen.getByRole('link', { name: /Titolo serie/i })
    expect(link).toHaveAttribute('href', '/series/abc-123')
  })
})
