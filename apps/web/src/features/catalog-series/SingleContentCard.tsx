import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { buildSingleContentDetailHref } from './catalogRoutes'
import type { CatalogSingleItem } from './catalog-series.types'
import { PLACEHOLDER_THUMB } from './fixtures/home-series-sections.mock'

export type SingleContentCardProps = {
  item: CatalogSingleItem
  className?: string
}

/**
 * Card contenuto singolo (US-EP02-03): niente badge webinar, tab episodi, pill HD/CC.
 * Caption: titolo 1 riga + descrizione 1 riga (vedi fixture).
 */
export function SingleContentCard({ item, className }: SingleContentCardProps) {
  const fullLabel = `${item.title} — ${item.shortDescription}`
  return (
    <Link
      to={buildSingleContentDetailHref(item.id)}
      title={fullLabel}
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
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1 rounded-b-xl bg-black p-3">
        <p className="line-clamp-1 text-sm font-semibold leading-snug text-foreground">
          {item.title}
        </p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {item.shortDescription}
        </p>
      </div>
    </Link>
  )
}
