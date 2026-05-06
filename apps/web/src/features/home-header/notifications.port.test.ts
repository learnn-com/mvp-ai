import { describe, expect, it } from 'vitest'

import type { NotificationItem, NotificationPort } from './notifications.port'

describe('NotificationPort', () => {
  it('consente implementazione mock tipizzata', () => {
    const port: NotificationPort = {
      listNotifications: (): NotificationItem[] => [
        { id: '1', title: 'Titolo', read: false },
      ],
    }
    expect(port.listNotifications()[0]?.read).toBe(false)
  })
})
