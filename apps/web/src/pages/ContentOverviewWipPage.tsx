import { Link, useParams } from 'react-router-dom'

/**
 * Dettaglio contenuto singolo prima del playback (EP-03). Stub US-EP02-03.
 * Convenzione path: `/content/:contentId` — id mock dall’item catalogo.
 */
export function ContentOverviewWipPage() {
  const { contentId } = useParams<{ contentId: string }>()

  return (
    <div className="space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Contenuto</h1>
        <p className="text-sm text-muted-foreground">
          Player e metadati: work in progress. Id contenuto:{' '}
          <span className="font-mono text-foreground">{contentId ?? '—'}</span>
        </p>
      </div>
      <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        Qui andrà il percorso verso il player (EP-03) quando disponibile.
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
