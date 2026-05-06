import { describe, expect, it } from 'vitest'

import {
  buildCategorySeeAllHref,
  buildSingleContentDetailHref,
} from './catalogRoutes'

describe('catalogRoutes', () => {
  it('buildCategorySeeAllHref: serie senza query', () => {
    expect(buildCategorySeeAllHref('marketing', 'series')).toBe(
      '/category/marketing',
    )
  })

  it('buildCategorySeeAllHref: singoli con view=singles', () => {
    expect(buildCategorySeeAllHref('marketing', 'singles')).toBe(
      '/category/marketing?view=singles',
    )
  })

  it('buildCategorySeeAllHref: default serie', () => {
    expect(buildCategorySeeAllHref('x')).toBe('/category/x')
  })

  it('buildSingleContentDetailHref', () => {
    expect(buildSingleContentDetailHref('abc-1')).toBe('/content/abc-1')
  })
})
