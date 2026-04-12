/**
 * Routing discovery catalogo Home (US-EP02-02 / US-EP02-03).
 *
 * Strategia unica “Vedi tutti”:
 * - **Serie** → `/category/:slug` (nessuna query).
 * - **Contenuti singoli** → stesso path con `?view=singles` così la WIP categoria può
 *   discriminare la lista senza duplicare route.
 *
 * Dettaglio contenuto singolo (stub fino a EP-03): `/content/:contentId`.
 */

export type CategorySeeAllKind = 'series' | 'singles'

export function buildCategorySeeAllHref(
  slug: string,
  kind: CategorySeeAllKind = 'series',
): string {
  const base = `/category/${encodeURIComponent(slug)}`
  if (kind === 'singles') {
    return `${base}?view=singles`
  }
  return base
}

export function buildSingleContentDetailHref(contentId: string): string {
  return `/content/${encodeURIComponent(contentId)}`
}
