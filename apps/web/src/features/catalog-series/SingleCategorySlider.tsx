import { Link } from 'react-router-dom'

import { buildCategorySeeAllHref } from './catalogRoutes'
import type { CatalogSingleSection } from './catalog-series.types'
import { SingleContentCard } from './SingleContentCard'
import { SliderScrollRow } from './SliderScrollRow'
import { takeVisibleSingleItems } from './takeVisibleItems'

export type SingleCategorySliderProps = {
  section: CatalogSingleSection
  headingLevel?: 2 | 3
}

export function SingleCategorySlider({
  section,
  headingLevel = 2,
}: SingleCategorySliderProps) {
  const visible = takeVisibleSingleItems(section.items)
  if (visible.length === 0) {
    return null
  }

  const titleId = `single-section-${section.id}`
  const HeadingTag = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <section
      className="flex flex-col gap-3"
      role="region"
      aria-labelledby={titleId}
      data-testid={`single-slider-${section.slug}`}
    >
      <div className="flex items-center justify-between gap-3">
        <HeadingTag
          id={titleId}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {section.categoryLabel}
        </HeadingTag>
        <Link
          to={buildCategorySeeAllHref(section.slug, 'singles')}
          className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
          aria-label={`Vedi tutti i contenuti in ${section.categoryLabel}`}
        >
          Vedi tutto &gt;
        </Link>
      </div>
      <SliderScrollRow>
        {visible.map((item) => (
          <SingleContentCard key={item.id} item={item} className="snap-start" />
        ))}
      </SliderScrollRow>
    </section>
  )
}
