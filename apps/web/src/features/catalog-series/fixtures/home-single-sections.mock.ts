import type {
  CatalogSingleItem,
  CatalogSingleSection,
} from '../catalog-series.types'
import { funCatalogThumb, PLACEHOLDER_THUMB } from './home-series-sections.mock'

/**
 * US-EP02-03 — fixture contenuti singoli (nessun fetch Strapi).
 *
 * **Caption (AC5):** titolo `line-clamp-1` + descrizione `line-clamp-1` (due righe totali).
 *
 * **Limite 10:** applicato in UI con `takeVisibleSingleItems` — i mock possono avere N > 10
 * (es. sezione Sviluppo) per testare lo slice.
 *
 * **Sezione 0 item:** come EP02-02 — non renderizzare (filtrare in Home).
 */

function singleItem(
  partial: Omit<CatalogSingleItem, 'categorySlug' | 'categoryTitle'> & {
    categorySlug?: string
    categoryTitle?: string
  },
  categorySlug: string,
  categoryTitle: string,
): CatalogSingleItem {
  return {
    categorySlug,
    categoryTitle,
    ...partial,
  }
}

/** 12 elementi → UI ne mostra 10. */
const sviluppoSingles: CatalogSingleItem[] = Array.from(
  { length: 12 },
  (_, i) =>
    singleItem(
      {
        id: `single-dev-${i}`,
        title:
          i === 0
            ? 'Titolo lunghissimo che verrà troncato dalla prima riga di clamp'
            : `Snippet ${i}: pattern async`,
        shortDescription:
          i === 1
            ? 'Descrizione molto lunga che occupa spazio ma resta su una riga grazie al clamp esplicito per il teaser.'
            : `Approfondimento ${i} minuti — tip e best practice.`,
        thumbnailUrl: funCatalogThumb(`single-dev-${i}`),
      },
      'sviluppo',
      'Sviluppo',
    ),
)

const designSingles: CatalogSingleItem[] = [
  singleItem(
    {
      id: 'single-design-0',
      title: 'Palette e token',
      shortDescription: 'Sistema colore e semantic tokens.',
      thumbnailUrl: funCatalogThumb('single-design-0'),
    },
    'design',
    'Design',
  ),
  singleItem(
    {
      id: 'single-design-1',
      title: 'Micro-interazioni',
      shortDescription: 'Feedback visivo senza rumore.',
      thumbnailUrl: PLACEHOLDER_THUMB,
    },
    'design',
    'Design',
  ),
  singleItem(
    {
      id: 'single-design-2',
      title: 'Tipografia fluida',
      shortDescription: 'Clamp e scale responsive.',
      thumbnailUrl: funCatalogThumb('single-design-2'),
    },
    'design',
    'Design',
  ),
  singleItem(
    {
      id: 'single-design-3',
      title: 'Accessibilità colore',
      shortDescription: 'Contrasto e stati focus.',
      thumbnailUrl: funCatalogThumb('single-design-3'),
    },
    'design',
    'Design',
  ),
]

export const homeSingleSectionsMock: CatalogSingleSection[] = [
  {
    id: 'sec-single-sviluppo',
    categoryLabel: 'Sviluppo',
    slug: 'sviluppo',
    items: sviluppoSingles,
  },
  {
    id: 'sec-single-design',
    categoryLabel: 'Design',
    slug: 'design',
    items: designSingles,
  },
]
