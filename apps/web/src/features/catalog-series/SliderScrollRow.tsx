import type { ReactNode } from 'react'

type SliderScrollRowProps = {
  children: ReactNode
}

/**
 * Riga scrollabile orizzontale con fade a destra (“fine slider”) sullo sfondo app.
 */
export function SliderScrollRow({ children }: SliderScrollRowProps) {
  return (
    <div className="relative">
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-background to-transparent sm:w-14"
        aria-hidden
      />
    </div>
  )
}
