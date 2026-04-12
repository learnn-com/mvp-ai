import { useMemo } from 'react'

import { defaultHomeNotificationPort } from './notifications.mock'
import type { NotificationPort } from './notifications.port'

export type NotificationSummary = {
  unreadCount: number
  /** Titoli delle sole notifiche non lette (coerente con badge). */
  titles: string[]
  showBadge: boolean
}

export function computeNotificationSummary(
  port: NotificationPort,
): NotificationSummary {
  const items = port.listNotifications()
  const unread = items.filter((n) => !n.read)
  const unreadCount = unread.length
  const titles = unread.map((n) => n.title).filter((t) => t.trim().length > 0)
  const showBadge = unreadCount > 0 && titles.length > 0
  return { unreadCount, titles, showBadge }
}

export function useNotificationSummary(
  port: NotificationPort = defaultHomeNotificationPort,
): NotificationSummary {
  return useMemo(() => computeNotificationSummary(port), [port])
}
