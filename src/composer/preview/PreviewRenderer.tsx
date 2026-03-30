/**
 * PreviewRenderer — assembles the composed preview from config.
 * Applies theme tokens as CSS variables on the container,
 * then renders the selected sidebar and chatbot.
 */

import { useMemo, type CSSProperties } from 'react'
import type { ProjectConfig } from '../config/schema'
import { getThemeById } from '../registries/theme-registry'
import { getSidebarById } from '../registries/sidebar-registry'
import { iconRegistry } from '../registries/icon-registry'
import PreviewSidebar from './PreviewSidebar'
import PreviewChatbot from './PreviewChatbot'
import PreviewTopBar, { TopBarActions } from './PreviewTopBar'

interface Props {
  config: ProjectConfig
}

export default function PreviewRenderer({ config }: Props) {
  const theme = getThemeById(config.themeId)
  const sidebarEntry = getSidebarById(config.sidebar.componentId)

  const themeStyles = useMemo(() => {
    if (!theme) return {} as CSSProperties
    const vars: Record<string, string> = {}
    for (const [key, value] of Object.entries(theme.tokens)) {
      vars[key] = value
    }
    return vars as unknown as CSSProperties
  }, [theme])

  const iconMeta = iconRegistry.map((ic) => ({
    id: ic.id,
    label: ic.label,
    lucideName: ic.lucideName,
  }))

  const isHorizontalNav = sidebarEntry?.variant === 'horizontal'
  const logo = theme?.logo
  const hasTopBarActions = config.sidebar.props.showProfile || config.sidebar.props.showNotifications

  return (
    <div className="prev-app" style={themeStyles}>
      {isHorizontalNav && sidebarEntry && (
        <PreviewSidebar
          entry={sidebarEntry}
          sidebarConfig={config.sidebar}
          icons={config.icons}
          iconMeta={iconMeta}
          logo={logo}
          headerActions={hasTopBarActions ? <TopBarActions sidebarConfig={config.sidebar} /> : undefined}
        />
      )}
      <div className="prev-app__body" data-layout={isHorizontalNav ? 'horizontal' : 'vertical'}>
        {!isHorizontalNav && sidebarEntry && (
          <PreviewSidebar
            entry={sidebarEntry}
            sidebarConfig={config.sidebar}
            icons={config.icons}
            iconMeta={iconMeta}
            logo={logo}
          />
        )}
        <main className="prev-app__main">
          {!isHorizontalNav && <PreviewTopBar sidebarConfig={config.sidebar} />}
          <div className="prev-app__content-area">
            <div className="prev-app__chatbot-area">
              <PreviewChatbot chatbotConfig={config.chatbot} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
