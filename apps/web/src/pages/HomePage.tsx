import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/mock/use-auth'

export function HomePage() {
  const { session } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
        <p className="text-muted-foreground">
          Bentornato{session?.user.username ? `, ${session.user.username}` : ''}
          . Account:{' '}
          <span className="text-foreground">{session?.user.email ?? '—'}</span>
        </p>
      </div>
      <div>
        <Button type="button">Componente shadcn (Button)</Button>
      </div>
    </div>
  )
}
