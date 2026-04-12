/**
 * Limite massimo card per sezione slider (US-EP02-02).
 * Unica policy: slice lato UI — i mock possono avere N > 5 per testare il trimming.
 */
export const MAX_SERIES_SLIDER_ITEMS = 5

export function takeVisibleItems<T>(
  items: T[],
  max: number = MAX_SERIES_SLIDER_ITEMS,
): T[] {
  return items.slice(0, max)
}
