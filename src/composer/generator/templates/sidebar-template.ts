import type { ProjectConfig } from '../../config/schema'

interface IconItem { id: string; label: string; lucideName: string }

export function buildSidebarComponent(
  config: ProjectConfig,
  variant: string,
  activeIcons: IconItem[],
): string {
  const imports = buildIconImports(activeIcons, variant === 'vertical' && config.sidebar.props.collapsible)
  const iconMapEntries = activeIcons.map((ic) => `  ${ic.lucideName},`).join('\n')

  if (variant === 'horizontal') {
    return buildHorizontalSidebar(config, activeIcons, imports, iconMapEntries)
  }

  return buildVerticalSidebar(config, activeIcons, imports, iconMapEntries)
}

function buildIconImports(icons: IconItem[], includeChevrons: boolean): string {
  const names = [...new Set(icons.map((ic) => ic.lucideName))]
  if (includeChevrons) {
    names.push('ChevronLeft', 'ChevronRight')
  }
  return `import { ${names.join(', ')} } from 'lucide-react'`
}

function buildVerticalSidebar(
  config: ProjectConfig,
  activeIcons: IconItem[],
  imports: string,
  _iconMapEntries: string,
): string {
  const { collapsible, showLogo, showVersion, brandName } = config.sidebar.props
  const navItems = activeIcons.map((ic) =>
    `    { id: '${ic.id}', label: '${ic.label}', icon: ${ic.lucideName} },`
  ).join('\n')

  return `${imports}
import { useState } from 'react'

const NAV_ITEMS = [
${navItems}
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const isCollapsed = ${collapsible ? 'collapsed' : 'false'}

  return (
    <aside className={\`sidebar \${isCollapsed ? 'sidebar--collapsed' : ''}\`}>
      <div className="sidebar__header">
        ${showLogo ? `{!isCollapsed && <span className="sidebar__brand">${brandName}</span>}` : ''}
        ${collapsible ? `<button
          className="sidebar__toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>` : ''}
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon
          const active = idx === 0
          return (
            <a
              key={item.id}
              href={\`#\${item.id}\`}
              className={\`sidebar__item \${active ? 'sidebar__item--active' : ''}\`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          )
        })}
      </nav>

      ${showVersion ? `{<div className="sidebar__footer">
        <span>{isCollapsed ? 'v1' : 'Version 1.0'}</span>
      </div>}` : ''}
    </aside>
  )
}
`
}

function buildHorizontalSidebar(
  config: ProjectConfig,
  activeIcons: IconItem[],
  imports: string,
  _iconMapEntries: string,
): string {
  const { showLogo, brandName } = config.sidebar.props
  const navItems = activeIcons.map((ic) =>
    `    { id: '${ic.id}', label: '${ic.label}', icon: ${ic.lucideName} },`
  ).join('\n')

  return `${imports}

const NAV_ITEMS = [
${navItems}
]

export default function Sidebar() {
  return (
    <header className="header-bar">
      ${showLogo ? `<span className="header-bar__brand">${brandName}</span>` : ''}
      <nav className="header-bar__nav">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href={\`#\${item.id}\`}
              className={\`header-bar__tab \${idx === 0 ? 'header-bar__tab--active' : ''}\`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>
    </header>
  )
}
`
}
