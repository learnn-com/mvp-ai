import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/mock/use-auth'
import { homeSeriesSectionsMock } from '@/features/catalog-series/fixtures/home-series-sections.mock'
import { SeriesCategorySlider } from '@/features/catalog-series/SeriesCategorySlider'
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
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 px-4">
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
          <div>
            <Button type="button">Componente shadcn (Button)</Button>
          </div>
        </div>
        {seriesSections.map((section) => (
          <SeriesCategorySlider key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
