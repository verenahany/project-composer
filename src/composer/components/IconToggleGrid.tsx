/**
 * IconToggleGrid — per-icon boolean toggles displayed as a grid.
 */

import type { ComponentType } from 'react'
import {
  LayoutDashboard, Users, Settings, MessageCircle, BarChart3,
  CreditCard, Bell, Search, FolderKanban, BookOpen, Ticket, Grid3X3,
} from 'lucide-react'
import type { IconConfig } from '../config/schema'
import { iconRegistry } from '../registries/icon-registry'

const ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
  LayoutDashboard, Users, Settings, MessageCircle, BarChart3,
  CreditCard, Bell, Search, FolderKanban, BookOpen, Ticket, Grid3X3,
}

interface Props {
  icons: IconConfig
  onToggle: (id: string, enabled: boolean) => void
}

export default function IconToggleGrid({ icons, onToggle }: Props) {
  return (
    <div className="icon-toggle-grid">
      {iconRegistry.map((entry) => {
        const Icon = ICON_MAP[entry.lucideName]
        const enabled = icons[entry.id] ?? entry.defaultEnabled

        return (
          <label key={entry.id} className={`icon-toggle ${enabled ? 'icon-toggle--on' : ''}`}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggle(entry.id, e.target.checked)}
              className="icon-toggle__input"
            />
            <span className="icon-toggle__icon">
              {Icon && <Icon size={18} />}
            </span>
            <span className="icon-toggle__label">{entry.label}</span>
          </label>
        )
      })}
    </div>
  )
}
