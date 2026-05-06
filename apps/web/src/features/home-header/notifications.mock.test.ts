import { describe, expect, it } from 'vitest'

import {
  MockNotificationAdapter,
  notificationsUnreadPositive,
  notificationsUnreadZero,
} from './notifications.mock'

describe('MockNotificationAdapter', () => {
  it('notificationsUnreadZero ha count non letti 0', () => {
    const port = new MockNotificationAdapter(notificationsUnreadZero)
    const unread = port.listNotifications().filter((n) => !n.read)
    expect(unread).toHaveLength(0)
  })

  it('notificationsUnreadPositive espone due non lette nello stesso ordine fixture', () => {
    const port = new MockNotificationAdapter(notificationsUnreadPositive)
    const titles = port
      .listNotifications()
      .filter((n) => !n.read)
      .map((n) => n.title)
    expect(titles).toEqual(['Nuovo corso disponibile', 'Webinar domani'])
  })
})
