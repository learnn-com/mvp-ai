import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import type { CatalogSeriesItem } from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'

export type SeriesCardProps = {
  item: CatalogSeriesItem
  className?: string
}

export function SeriesCard({ item, className }: SeriesCardProps) {
  return (
    <Link
      to={`/series/${item.id}`}
      className={cn(
        'flex w-[42vw] max-w-[11rem] shrink-0 snap-start flex-col overflow-hidden rounded-xl text-left outline-none ring-offset-background',
        'transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring sm:max-w-[12rem]',
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-t-xl bg-muted">
        <img
          src={item.thumbnailUrl || PLACEHOLDER_THUMB}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            const el = e.currentTarget
            el.src = PLACEHOLDER_THUMB
            el.onerror = null
          }}
        />
        {item.kind === 'webinar' ? (
          <span
            className="absolute left-2 top-2 rounded border border-white/80 bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm"
            data-testid="series-card-webinar-badge"
          >
            WEBINAR
          </span>
        ) : null}
        <span
          className="absolute bottom-2 right-2 rounded bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white tabular-nums shadow-sm"
          data-testid="series-card-episode-count"
        >
          {item.episodeCount}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1 rounded-b-xl bg-black p-3">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {item.title}
        </p>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {item.authorName} — {item.authorRole}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.totalDurationLabel}
        </p>
      </div>
    </Link>
  )
}
