import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/mock/use-auth'

export function AboutPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Info</h1>
        <p className="text-muted-foreground">
          Route di esempio per verificare la navigazione client-side.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Link
          to="/"
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Torna alla Home
        </Link>
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
          Logout
        </Button>
      </div>
    </div>
  )
}
