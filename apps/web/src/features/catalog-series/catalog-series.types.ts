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

/**
 * Contenuto singolo (non serializzato) — mock client, allineabile a Strapi.
 */
export type CatalogSingleItem = {
  id: string
  title: string
  /** Testo breve sotto il titolo (caption). */
  shortDescription: string
  thumbnailUrl: string
  /** Slug categoria per “Vedi tutti” / WIP. */
  categorySlug: string
  /** Nome categoria per label/accessibilità. */
  categoryTitle: string
}

export type CatalogSingleSection = {
  id: string
  categoryLabel: string
  slug: string
  items: CatalogSingleItem[]
}
