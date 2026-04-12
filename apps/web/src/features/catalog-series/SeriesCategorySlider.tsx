import { Link } from 'react-router-dom'

import { buildCategorySeeAllHref } from './catalogRoutes'
import type { CatalogSeriesSection } from './catalog-series.types'
import { SeriesCard } from './SeriesCard'
import { SliderScrollRow } from './SliderScrollRow'
import { takeVisibleItems } from './takeVisibleItems'

export type SeriesCategorySliderProps = {
  section: CatalogSeriesSection
  headingLevel?: 2 | 3
}

export function SeriesCategorySlider({
  section,
  headingLevel = 2,
}: SeriesCategorySliderProps) {
  const visible = takeVisibleItems(section.items)
  if (visible.length === 0) {
    return null
  }

  const titleId = `series-section-${section.id}`
  const HeadingTag = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <section
      className="flex flex-col gap-3"
      role="region"
      aria-labelledby={titleId}
      data-testid={`series-slider-${section.slug}`}
    >
      <div className="flex items-center justify-between gap-3">
        <HeadingTag
          id={titleId}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {section.categoryLabel}
        </HeadingTag>
        <Link
          to={buildCategorySeeAllHref(section.slug, 'series')}
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Vedi tutti i contenuti in ${section.categoryLabel}`}
        >
          Vedi tutto &gt;
        </Link>
      </div>
      <SliderScrollRow>
        {visible.map((item) => (
          <SeriesCard key={item.id} item={item} className="snap-start" />
        ))}
      </SliderScrollRow>
    </section>
  )
}
