import type { AuthUser } from '@/features/auth/contracts/auth.contract'

export function getUserInitials(user: Pick<AuthUser, 'email' | 'username'>): string {
  const name = user.username?.trim()
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0]![0]!}${parts[1]![0]!}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  const local = user.email.split('@')[0] ?? ''
  if (local.length >= 2) {
    return local.slice(0, 2).toUpperCase()
  }
  return (local[0] ?? '?').toUpperCase()
}
