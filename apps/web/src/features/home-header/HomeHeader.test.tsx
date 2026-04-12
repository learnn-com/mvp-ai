import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomeHeader } from './HomeHeader'
import { MockNotificationAdapter, notificationsUnreadZero } from './notifications.mock'

const user = { id: '1', email: 'test@example.com', username: 'Mario Rossi' }

describe('HomeHeader', () => {
  it('mostra wordmark Learnn e iniziali utente', () => {
    render(<HomeHeader user={user} notificationPort={new MockNotificationAdapter(notificationsUnreadZero)} />)
    const header = screen.getByTestId('home-header')
    expect(within(header).getByText('Learnn')).toBeInTheDocument()
    expect(within(header).getByText('MR')).toBeInTheDocument()
  })

  it('senza non lette non mostra badge', () => {
    render(<HomeHeader user={user} notificationPort={new MockNotificationAdapter(notificationsUnreadZero)} />)
    expect(screen.queryByTestId('home-header-badge')).not.toBeInTheDocument()
  })

  it('con non lette mostra badge rosso', () => {
    render(
      <HomeHeader
        user={user}
        notificationPort={
          new MockNotificationAdapter([{ id: 'x', title: 'Avviso', read: false }])
        }
      />,
    )
    expect(screen.getByTestId('home-header-badge')).toBeInTheDocument()
  })

  it('non contiene link centrali Home / My Learnn nello header', () => {
    render(<HomeHeader user={user} notificationPort={new MockNotificationAdapter(notificationsUnreadZero)} />)
    const header = screen.getByTestId('home-header')
    expect(within(header).queryByRole('link', { name: 'Home' })).not.toBeInTheDocument()
    expect(within(header).queryByRole('link', { name: 'My Learnn' })).not.toBeInTheDocument()
    expect(within(header).queryByText('My Learnn')).not.toBeInTheDocument()
  })

  it('apre modale con titoli non letti e chiude con Chiudi', () => {
    render(
      <HomeHeader
        user={user}
        notificationPort={
          new MockNotificationAdapter([
            { id: '1', title: 'Titolo uno', read: false },
            { id: '2', title: 'Titolo due', read: false },
          ])
        }
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: /Apri notifiche/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Titolo uno')).toBeInTheDocument()
    expect(screen.getByText('Titolo due')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Chiudi' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
