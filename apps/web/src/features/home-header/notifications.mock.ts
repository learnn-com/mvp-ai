import type { NotificationItem, NotificationPort } from './notifications.port'

/**
 * Ordine titoli: ordine fisso dell’array (stabile per test e demo).
 * `createdAt` mock non necessario in MVP — si può aggiungere quando arriva Strapi.
 */

export const notificationsUnreadZero: NotificationItem[] = [
  { id: 'n1', title: 'Messaggio archiviato', read: true },
  { id: 'n2', title: 'Altro già letto', read: true },
]

export const notificationsUnreadPositive: NotificationItem[] = [
  { id: 'a', title: 'Nuovo corso disponibile', read: false },
  { id: 'b', title: 'Webinar domani', read: false },
  { id: 'c', title: 'Letto in precedenza', read: true },
]

export class MockNotificationAdapter implements NotificationPort {
  constructor(private readonly items: NotificationItem[]) {}

  listNotifications(): NotificationItem[] {
    return [...this.items]
  }
}

export const defaultHomeNotificationPort = new MockNotificationAdapter(
  notificationsUnreadPositive,
)
