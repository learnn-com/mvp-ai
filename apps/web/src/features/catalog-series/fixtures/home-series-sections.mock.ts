import type {
  CatalogSeriesItem,
  CatalogSeriesSection,
} from '../catalog-series.types'

/** Placeholder thumb locale (no rete) — 400×500 SVG grigio. */
export const PLACEHOLDER_THUMB =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect fill="#27272a" width="400" height="500"/><text x="50%" y="50%" fill="#a1a1aa" font-family="system-ui" font-size="14" text-anchor="middle" dominant-baseline="middle">thumb</text></svg>`,
  )

/**
 * Thumb mock “divertenti” — Picsum con seed stabile (stessa immagine per stesso seed).
 * In `SeriesCard`, `onError` ripiega su {@link PLACEHOLDER_THUMB} se la rete non c’è (test/offline).
 */
export function funCatalogThumb(seed: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/500`
}

function item(
  partial: Omit<CatalogSeriesItem, 'categoryKey' | 'categorySlug'> & {
    categoryKey?: string
    categorySlug?: string
  },
  categoryKey: string,
  categorySlug: string,
): CatalogSeriesItem {
  return {
    categoryKey,
    categorySlug,
    ...partial,
  }
}

/** Sezione con >5 item (trim a 5 in UI). Mix corsi + webinar. */
const sviluppoItems: CatalogSeriesItem[] = [
  item(
    {
      id: 's1',
      kind: 'webinar',
      title: 'TypeScript avanzato',
      authorName: 'Laura Bianchi',
      authorRole: 'Lead Developer',
      totalDurationLabel: '1h 20min',
      episodeCount: 16,
      thumbnailUrl: funCatalogThumb('duck-typescript'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's2',
      kind: 'course',
      title: 'React performance',
      authorName: 'Marco Verdi',
      authorRole: 'Frontend Engineer',
      totalDurationLabel: '45min',
      episodeCount: 8,
      thumbnailUrl: funCatalogThumb('corgi-react'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's3',
      kind: 'course',
      title: 'Node.js in produzione',
      authorName: 'Giulia Neri',
      authorRole: 'Backend Developer',
      totalDurationLabel: '2h 10min',
      episodeCount: 12,
      thumbnailUrl: funCatalogThumb('llama-node'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's4',
      kind: 'webinar',
      title: 'GraphQL pratico',
      authorName: 'Paolo Blu',
      authorRole: 'Solutions Architect',
      totalDurationLabel: '55min',
      episodeCount: 6,
      thumbnailUrl: funCatalogThumb('owl-graphql'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's5',
      kind: 'course',
      title: 'Testing E2E',
      authorName: 'Anna Rosa',
      authorRole: 'QA Lead',
      totalDurationLabel: '3h',
      episodeCount: 20,
      thumbnailUrl: funCatalogThumb('fox-testing'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's6',
      kind: 'course',
      title: 'Microservizi intro',
      authorName: 'Luca Grigi',
      authorRole: 'DevOps',
      totalDurationLabel: '1h 5min',
      episodeCount: 5,
      thumbnailUrl: funCatalogThumb('bee-micro'),
    },
    'dev',
    'sviluppo',
  ),
  item(
    {
      id: 's7',
      kind: 'webinar',
      title: 'Security OWASP',
      authorName: 'Elena Gialli',
      authorRole: 'Security Engineer',
      totalDurationLabel: '1h 40min',
      episodeCount: 10,
      thumbnailUrl: funCatalogThumb('hedgehog-security'),
    },
    'dev',
    'sviluppo',
  ),
]

const designItems: CatalogSeriesItem[] = [
  item(
    {
      id: 'd1',
      kind: 'course',
      title: 'UI motion base',
      authorName: 'Sara Conti',
      authorRole: 'Product Designer',
      totalDurationLabel: '50min',
      episodeCount: 4,
      thumbnailUrl: funCatalogThumb('parrot-ui-motion'),
    },
    'design',
    'design',
  ),
  item(
    {
      id: 'd2',
      kind: 'webinar',
      title: 'Design system in Figma',
      authorName: 'Tommaso Grigio',
      authorRole: 'UX Designer',
      totalDurationLabel: '1h 15min',
      episodeCount: 9,
      thumbnailUrl: funCatalogThumb('panda-figma'),
    },
    'design',
    'design',
  ),
  item(
    {
      id: 'd3',
      kind: 'course',
      title: 'Accessibilità WCAG',
      authorName: 'Chiara Viola',
      authorRole: 'Accessibility Specialist',
      totalDurationLabel: '2h',
      episodeCount: 7,
      thumbnailUrl: funCatalogThumb('raccoon-a11y'),
    },
    'design',
    'design',
  ),
]

/** Sezione vuota: usata solo in test — in Home le sezioni senza item sono nascoste. */
export const emptySeriesSectionMock: CatalogSeriesSection = {
  id: 'empty',
  categoryLabel: 'Vuota',
  slug: 'vuota',
  items: [],
}

/**
 * Ordine stabile sezioni Home. Policy sezione 0 item: **non renderizzare** (filtrare in Home).
 */
export const homeSeriesSectionsMock: CatalogSeriesSection[] = [
  {
    id: 'sec-sviluppo',
    categoryLabel: 'Sviluppo',
    slug: 'sviluppo',
    items: sviluppoItems,
  },
  {
    id: 'sec-design',
    categoryLabel: 'Design',
    slug: 'design',
    items: designItems,
  },
]

/** Lookup titolo categoria per pagina WIP (fino ad API). */
const slugToLabel: Record<string, string> = Object.fromEntries(
  homeSeriesSectionsMock.map((s) => [s.slug, s.categoryLabel]),
)

export function getCategoryLabelForSlug(slug: string): string {
  return slugToLabel[slug] ?? slug
}
