import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NotificationTray } from './NotificationTray'

describe('NotificationTray', () => {
  it('mostra solo i titoli quando aperto', () => {
    const onOpenChange = vi.fn()
    render(
      <NotificationTray
        open
        onOpenChange={onOpenChange}
        titles={['Prima', 'Seconda']}
      />,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Prima')).toBeInTheDocument()
    expect(screen.getByText('Seconda')).toBeInTheDocument()
  })

  it('chiude con pulsante Chiudi', () => {
    const onOpenChange = vi.fn()
    render(<NotificationTray open onOpenChange={onOpenChange} titles={['A']} />)
    fireEvent.click(screen.getByRole('button', { name: 'Chiudi' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('chiude con click sul backdrop', () => {
    const onOpenChange = vi.fn()
    render(<NotificationTray open onOpenChange={onOpenChange} titles={[]} />)
    fireEvent.click(screen.getByRole('button', { name: 'Chiudi notifiche' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('chiude con Escape', () => {
    const onOpenChange = vi.fn()
    render(<NotificationTray open onOpenChange={onOpenChange} titles={['A']} />)
    fireEvent.keyDown(document, { key: 'Escape', bubbles: true })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('non renderizza nulla se chiuso', () => {
    render(<NotificationTray open={false} onOpenChange={() => {}} titles={['A']} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
