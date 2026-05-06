import { Link, useParams } from 'react-router-dom'

/**
 * Overview serie/corso prima del playback (EP-03). Stub US-EP02-02.
 * Convenzione path: `/series/:seriesId` — `seriesId` mock dall’item catalogo.
 */
export function SeriesOverviewWipPage() {
  const { seriesId } = useParams<{ seriesId: string }>()

  return (
    <div className="space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Contenuto</h1>
        <p className="text-sm text-muted-foreground">
          Overview episodi: work in progress. Id serie:{' '}
          <span className="font-mono text-foreground">{seriesId ?? '—'}</span>
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
