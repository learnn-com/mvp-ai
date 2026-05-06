import { type FormEvent, useId, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/mock/use-auth'

export function LoginPage() {
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const emailId = useId()
  const passwordId = useId()
  const errorId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (session) {
    return <Navigate to="/" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const result = await login({ email, password })
    setSubmitting(false)
    if (result.ok) {
      const from = (location.state as { from?: string } | null)?.from
      const target =
        from && from.startsWith('/') && !from.startsWith('//') ? from : '/'
      navigate(target, { replace: true })
      return
    }
    setError(result.message)
  }

  const invalid = Boolean(error)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-4 py-10">
      <div className="space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Benvenuto</h1>
          <p className="text-sm text-muted-foreground">
            Accedi con email e password (ambiente mock).
          </p>
        </header>

        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <label className="sr-only" htmlFor={emailId}>
              Email
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="Email"
              aria-invalid={invalid}
              aria-describedby={invalid ? errorId : undefined}
              className="w-full rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-2">
            <label className="sr-only" htmlFor={passwordId}>
              Password
            </label>
            <input
              id={passwordId}
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="Password"
              aria-invalid={invalid}
              aria-describedby={invalid ? errorId : undefined}
              className="w-full rounded-full border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {error ? (
            <p
              id={errorId}
              role="alert"
              className="text-center text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="outline"
            disabled={submitting}
            className="h-12 w-full rounded-full border-primary bg-transparent text-primary hover:bg-primary/10 active:bg-white active:text-black"
          >
            Accedi
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <button
            type="button"
            disabled
            className="underline-offset-4 hover:underline disabled:opacity-60"
            title="Disponibile in US-EP01-02"
          >
            Password dimenticata?
          </button>
          <span className="sr-only">Non disponibile in questo incremento.</span>
        </p>
      </div>
    </div>
  )
}
