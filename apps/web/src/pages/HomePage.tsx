import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth/mock/use-auth'
import { homeSingleSectionsMock } from '@/features/catalog-series/fixtures/home-single-sections.mock'
import { homeSeriesSectionsMock } from '@/features/catalog-series/fixtures/home-series-sections.mock'
import { SeriesCategorySlider } from '@/features/catalog-series/SeriesCategorySlider'
import { SingleCategorySlider } from '@/features/catalog-series/SingleCategorySlider'
import { HomeHeader } from '@/features/home-header/HomeHeader'

/**
 * Home è sotto RequireAuth (US-EP01-01): sessione presente per utente autenticato.
 */
export function HomePage() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  const seriesSections = homeSeriesSectionsMock.filter(
    (s) => s.items.length > 0,
  )
  const singleSections = homeSingleSectionsMock.filter(
    (s) => s.items.length > 0,
  )

  return (
    <div className="-mx-4 flex flex-col gap-8 sm:mx-0">
      {session ? (
        <HomeHeader
          user={session.user}
          onLogout={() => {
            logout()
            navigate('/login', { replace: true })
          }}
        />
      ) : null}
      <div className="flex flex-col gap-10 px-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
          <p className="text-muted-foreground">
            Bentornato
            {session?.user.username ? `, ${session.user.username}` : ''}.
            Account:{' '}
            <span className="text-foreground">
              {session?.user.email ?? '—'}
            </span>
          </p>
        </div>
        {/*
          Ordine verticale Home: prima slider serie (corsi/webinar), poi contenuti singoli (US-EP02-03).
        */}
        {seriesSections.map((section) => (
          <SeriesCategorySlider key={section.id} section={section} />
        ))}
        {singleSections.map((section) => (
          <SingleCategorySlider key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
