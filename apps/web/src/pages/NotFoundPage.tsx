import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground">Pagina non trovata.</p>
      <Button asChild variant="secondary">
        <Link to="/">Torna alla Home</Link>
      </Button>
    </div>
  )
}
