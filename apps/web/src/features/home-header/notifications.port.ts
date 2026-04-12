/**
 * Port notifiche lato client — implementazione mock oggi, sostituibile con API Strapi.
 */

export type NotificationItem = {
  id: string
  title: string
  read: boolean
}

export type NotificationPort = {
  listNotifications(): NotificationItem[]
}
