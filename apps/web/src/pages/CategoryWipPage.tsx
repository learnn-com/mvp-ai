import { Link, useParams, useSearchParams } from 'react-router-dom'

import { getCategoryLabelForSlug } from '@/features/catalog-series/fixtures/home-series-sections.mock'

/**
 * Lista categoria paginata — WIP (US-EP02-02). Nessuna paginazione reale.
 * Convenzione path: `/category/:slug` — contenuti singoli: `?view=singles` (US-EP02-03).
 */
export function CategoryWipPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const view = searchParams.get('view')
  const label = slug ? getCategoryLabelForSlug(slug) : 'Categoria'

  return (
    <div className="space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{label}</h1>
        <p className="text-sm text-muted-foreground">
          Elenco contenuti con paginazione: in lavorazione. Slug:{' '}
          <span className="font-mono text-foreground">{slug ?? '—'}</span>
          {view === 'singles' ? (
            <>
              {' '}
              ·{' '}
              <span data-testid="category-wip-view-singles">
                Vista: contenuti singoli
              </span>
            </>
          ) : null}
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        Paginazione e lista completa saranno disponibili con integrazione
        catalogo.
      </div>
      <p>
        <Link
          to="/"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Torna alla Home
        </Link>
      </p>
    </div>
  )
}
