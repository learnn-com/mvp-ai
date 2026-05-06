import { describe, expect, it } from 'vitest'

import {
  MAX_SERIES_SLIDER_ITEMS,
  MAX_SINGLE_SLIDER_ITEMS,
  takeVisibleItems,
  takeVisibleSingleItems,
} from './takeVisibleItems'

describe('takeVisibleItems', () => {
  it('ritorna al massimo 5 elementi di default', () => {
    const items = [1, 2, 3, 4, 5, 6, 7]
    expect(takeVisibleItems(items)).toEqual([1, 2, 3, 4, 5])
    expect(takeVisibleItems(items).length).toBeLessThanOrEqual(
      MAX_SERIES_SLIDER_ITEMS,
    )
  })

  it('non duplica né inventa elementi se N ≤ 5', () => {
    const items = ['a', 'b']
    expect(takeVisibleItems(items)).toEqual(['a', 'b'])
  })
})

describe('takeVisibleSingleItems', () => {
  it('ritorna al massimo 10 elementi', () => {
    const items = Array.from({ length: 12 }, (_, i) => i)
    expect(takeVisibleSingleItems(items)).toHaveLength(MAX_SINGLE_SLIDER_ITEMS)
  })

  it('non duplica né inventa elementi se N ≤ 10', () => {
    const items = ['a', 'b']
    expect(takeVisibleSingleItems(items)).toEqual(['a', 'b'])
  })
})
