import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'

export type NotificationTrayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  titles: string[]
  onLogout: () => void
}

export function NotificationTray({ open, onOpenChange, titles, onLogout }: NotificationTrayProps) {
  const titleId = useId()
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    closeBtnRef.current?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) {
    return null
  }

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Chiudi notifiche"
        className="absolute inset-0 bg-black/60"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] m-4 w-full max-w-md rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 id={titleId} className="text-base font-semibold">
            Notifiche
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Chiudi
          </button>
        </div>
        {titles.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nessuna notifica da mostrare.</p>
        ) : (
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {titles.map((t, index) => (
              <li key={`${index}-${t}`} className="text-sm font-medium leading-snug">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 border-t border-border pt-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-center text-muted-foreground hover:text-foreground"
            onClick={() => {
              onOpenChange(false)
              onLogout()
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
