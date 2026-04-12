import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  MockNotificationAdapter,
  notificationsUnreadZero,
} from './notifications.mock'
import {
  computeNotificationSummary,
  useNotificationSummary,
} from './useNotificationSummary'

describe('computeNotificationSummary', () => {
  it('count 0 e nessun badge se tutte lette', () => {
    const port = new MockNotificationAdapter(notificationsUnreadZero)
    const s = computeNotificationSummary(port)
    expect(s.unreadCount).toBe(0)
    expect(s.titles).toHaveLength(0)
    expect(s.showBadge).toBe(false)
  })

  it('count > 0 e badge se ci sono titoli non letti', () => {
    const port = new MockNotificationAdapter([
      { id: '1', title: 'Solo non letta', read: false },
    ])
    const s = computeNotificationSummary(port)
    expect(s.unreadCount).toBe(1)
    expect(s.titles).toEqual(['Solo non letta'])
    expect(s.showBadge).toBe(true)
  })

  it('edge: non lette ma titolo vuoto → nessun badge e lista titoli vuota', () => {
    const port: {
      listNotifications: () => { id: string; title: string; read: boolean }[]
    } = {
      listNotifications: () => [{ id: 'x', title: '', read: false }],
    }
    const s = computeNotificationSummary(port)
    expect(s.unreadCount).toBe(1)
    expect(s.titles).toEqual([])
    expect(s.showBadge).toBe(false)
  })
})

describe('useNotificationSummary', () => {
  it('allinea a computeNotificationSummary', () => {
    const port = new MockNotificationAdapter(notificationsUnreadZero)
    const { result } = renderHook(() => useNotificationSummary(port))
    expect(result.current).toEqual(computeNotificationSummary(port))
  })
})
