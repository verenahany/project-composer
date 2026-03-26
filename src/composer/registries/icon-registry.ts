/**
 * Icon registry — available nav icons that can be toggled on/off.
 *
 * Uses lucide-react icon names (present in all three workspace projects).
 * The icon component map avoids importing all of lucide at once by using a
 * lazy lookup from a curated set of nav-relevant icons.
 */

export interface IconEntry {
  id: string
  label: string
  /** lucide-react icon name for reference; rendered via the preview component */
  lucideName: string
  defaultEnabled: boolean
}

export const iconRegistry: IconEntry[] = [
  { id: 'dashboard', label: 'Dashboard', lucideName: 'LayoutDashboard', defaultEnabled: true },
  { id: 'users', label: 'Users', lucideName: 'Users', defaultEnabled: true },
  { id: 'settings', label: 'Settings', lucideName: 'Settings', defaultEnabled: true },
  { id: 'messages', label: 'Messages', lucideName: 'MessageCircle', defaultEnabled: true },
  { id: 'analytics', label: 'Analytics', lucideName: 'BarChart3', defaultEnabled: false },
  { id: 'billing', label: 'Billing', lucideName: 'CreditCard', defaultEnabled: false },
  { id: 'notifications', label: 'Notifications', lucideName: 'Bell', defaultEnabled: true },
  { id: 'search', label: 'Search', lucideName: 'Search', defaultEnabled: true },
  { id: 'folders', label: 'Projects', lucideName: 'FolderKanban', defaultEnabled: false },
  { id: 'book', label: 'Knowledge', lucideName: 'BookOpen', defaultEnabled: false },
  { id: 'tickets', label: 'Tickets', lucideName: 'Ticket', defaultEnabled: false },
  { id: 'apps', label: 'Applications', lucideName: 'Grid3X3', defaultEnabled: false },
]

export function getDefaultIcons(): Record<string, boolean> {
  const icons: Record<string, boolean> = {}
  for (const entry of iconRegistry) {
    icons[entry.id] = entry.defaultEnabled
  }
  return icons
}
