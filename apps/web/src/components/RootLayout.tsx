import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-secondary text-foreground'
      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
  }`

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">Learnn</span>
          <nav className="flex gap-1" aria-label="Navigazione principale">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              Info
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
