import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
        <p className="text-muted-foreground">
          Placeholder webapp — US-EP00-05 (dev locale, nessun deploy cloud in
          questa merge).
        </p>
      </div>
      <div>
        <Button type="button">Componente shadcn (Button)</Button>
      </div>
    </div>
  )
}
