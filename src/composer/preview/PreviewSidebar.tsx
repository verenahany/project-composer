/**
 * Preview sidebar — renders a sidebar variant inside the composer preview area.
 * Adapted from GoAI One Sidebar.tsx and shared-ui/SidebarShared.tsx.
 * Uses composer CSS variables for theming (no Tailwind dependency).
 */

import { useState, type ComponentType } from 'react'
import {
  LayoutDashboard, Users, Settings, MessageCircle, BarChart3,
  CreditCard, Bell, Search, FolderKanban, BookOpen, Ticket, Grid3X3,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import type { SidebarConfig, IconConfig } from '../config/schema'
import type { SidebarEntry } from '../registries/sidebar-registry'
import type { ThemeLogo } from '../registries/theme-registry'

const ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
  LayoutDashboard, Users, Settings, MessageCircle, BarChart3,
  CreditCard, Bell, Search, FolderKanban, BookOpen, Ticket, Grid3X3,
}

interface Props {
  entry: SidebarEntry
  sidebarConfig: SidebarConfig
  icons: IconConfig
  iconMeta: { id: string; label: string; lucideName: string }[]
  logo?: ThemeLogo
}

function LogoRenderer({ logo }: { logo?: ThemeLogo }) {
  if (!logo) return null
  return (
    <span
      className="prev-logo"
      dangerouslySetInnerHTML={{ __html: logo.svg }}
      style={{ display: 'inline-flex', width: logo.width * 0.7, height: logo.height * 0.7 }}
    />
  )
}

export default function PreviewSidebar({ entry, sidebarConfig, icons, iconMeta, logo }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const { props } = sidebarConfig
  const activeIcons = iconMeta.filter((ic) => icons[ic.id])

  if (entry.variant === 'horizontal') {
    return (
      <header className="prev-header-bar">
        {props.showLogo && (
          logo ? <LogoRenderer logo={logo} /> : <span className="prev-header-bar__brand">{props.brandName}</span>
        )}
        <nav className="prev-header-bar__nav">
          {activeIcons.map((ic) => {
            const Icon = ICON_MAP[ic.lucideName]
            return (
              <button key={ic.id} className="prev-header-bar__tab" title={ic.label}>
                {Icon && <Icon size={16} />}
                <span>{ic.label}</span>
              </button>
            )
          })}
        </nav>
      </header>
    )
  }

  const isCollapsed = props.collapsible ? collapsed : entry.id === 'sidebar-minimal'

  return (
    <aside
      className="prev-sidebar"
      data-collapsed={isCollapsed}
    >
      {/* Header */}
      <div className="prev-sidebar__header">
        {!isCollapsed && props.showLogo && (
          logo ? <LogoRenderer logo={logo} /> : <span className="prev-sidebar__brand">{props.brandName}</span>
        )}
        {props.collapsible && (
          <button
            className="prev-sidebar__toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="prev-sidebar__nav">
        {activeIcons.map((ic, idx) => {
          const Icon = ICON_MAP[ic.lucideName]
          const active = idx === 0
          return (
            <div
              key={ic.id}
              className={`prev-sidebar__item ${active ? 'prev-sidebar__item--active' : ''}`}
              title={isCollapsed ? ic.label : undefined}
            >
              {Icon && <Icon size={18} />}
              {!isCollapsed && <span>{ic.label}</span>}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {props.showVersion && (
        <div className="prev-sidebar__footer">
          <span>{isCollapsed ? 'v1' : 'Version 1.0'}</span>
        </div>
      )}
    </aside>
  )
}
