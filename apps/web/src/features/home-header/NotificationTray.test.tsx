import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationTray } from './NotificationTray'

describe('NotificationTray', () => {
  it('mostra solo i titoli quando aperto', () => {
    const onOpenChange = vi.fn()
    const onLogout = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={['Prima', 'Seconda']}
        onLogout={onLogout}
      />,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Prima')).toBeInTheDocument()
    expect(screen.getByText('Seconda')).toBeInTheDocument()
  })

  it('chiude con pulsante Chiudi', () => {
    const onOpenChange = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={['A']}
        onLogout={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Chiudi' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('chiude con click sul backdrop', () => {
    const onOpenChange = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={[]}
        onLogout={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Chiudi notifiche' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('chiude con Escape', () => {
    const onOpenChange = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={['A']}
        onLogout={() => {}}
      />,
    )
    fireEvent.keyDown(document, { key: 'Escape', bubbles: true })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('non renderizza nulla se chiuso', () => {
    render(
      <NotificationTray
        open={false}
        onOpenChange={() => {}}
        titles={['A']}
        onLogout={() => {}}
      />,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('Logout chiama onLogout e chiude', () => {
    const onOpenChange = vi.fn()
    const onLogout = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={['A']}
        onLogout={onLogout}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onLogout).toHaveBeenCalledTimes(1)
  })
})
