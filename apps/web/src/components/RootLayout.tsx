import { Outlet } from 'react-router-dom'

/**
 * Shell senza header globale: chrome Home (logo + avatar notifiche) solo in {@link HomePage}.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
