import { useState } from 'react'

import type { AuthUser } from '@/features/auth/contracts/auth.contract'
import { cn } from '@/lib/utils'

import { defaultHomeNotificationPort } from './notifications.mock'
import type { NotificationPort } from './notifications.port'
import { getUserInitials } from './getUserInitials'
import { NotificationTray } from './NotificationTray'
import { useNotificationSummary } from './useNotificationSummary'

export type HomeHeaderProps = {
  user: AuthUser
  onLogout: () => void
  /** Override per test o demo; default fixture positiva. */
  notificationPort?: NotificationPort
}

export function HomeHeader({
  user,
  onLogout,
  notificationPort = defaultHomeNotificationPort,
}: HomeHeaderProps) {
  const [open, setOpen] = useState(false)
  const { unreadCount, titles, showBadge } = useNotificationSummary(notificationPort)
  const initials = getUserInitials(user)

  const triggerLabel =
    unreadCount === 0
      ? 'Apri notifiche, nessuna non letta'
      : unreadCount === 1
        ? 'Apri notifiche, 1 notifica non letta'
        : `Apri notifiche, ${unreadCount} notifiche non lette`

  return (
    <header
      data-testid="home-header"
      className={cn(
        'flex w-full items-center justify-between gap-3 px-4 py-3',
        'bg-zinc-950 text-zinc-50',
      )}
    >
      <span
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
        aria-label="Learnn"
      >
        Learnn
      </span>
      <div className="relative shrink-0">
        <button
          type="button"
          className={cn(
            'relative flex h-11 w-11 items-center justify-center rounded-full',
            'bg-zinc-700 text-sm font-semibold text-zinc-50 outline-none ring-offset-2 ring-offset-zinc-950',
            'focus-visible:ring-2 focus-visible:ring-zinc-400',
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={triggerLabel}
          onClick={() => setOpen(true)}
        >
          {initials}
          {showBadge ? (
            <span
              data-testid="home-header-badge"
              className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-zinc-950"
              aria-hidden
            />
          ) : null}
        </button>
      </div>
      <NotificationTray open={open} onOpenChange={setOpen} titles={titles} onLogout={onLogout} />
    </header>
  )
}
