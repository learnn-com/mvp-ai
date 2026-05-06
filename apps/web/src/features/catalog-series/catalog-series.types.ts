/**
 * Modelli discovery Home — serie/corsi multi-episodio (mock client).
 * Allineabile a aggregati Strapi Catalog & Publishing.
 */

export type CatalogSeriesKind = 'course' | 'webinar'

export type CatalogSeriesItem = {
  id: string
  kind: CatalogSeriesKind
  title: string
  authorName: string
  authorRole: string
  /** Es. `1h 20min` — già formattato per UI. */
  totalDurationLabel: string
  episodeCount: number
  thumbnailUrl: string
  categoryKey: string
  /** Slug categoria per route `/category/:slug` e “Vedi tutti”. */
  categorySlug: string
}

export type CatalogSeriesSection = {
  id: string
  /** Titolo sezione (nome categoria/tema). */
  categoryLabel: string
  slug: string
  items: CatalogSeriesItem[]
}
