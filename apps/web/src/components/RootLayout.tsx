import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/mock/use-auth'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-secondary text-foreground'
      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
  }`

export function RootLayout() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">Learnn</span>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {session?.user.email}
            </span>
            <nav className="flex gap-1" aria-label="Navigazione principale">
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                Info
              </NavLink>
            </nav>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
            >
              Esci
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
