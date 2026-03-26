/**
 * ComponentPanel — left sidebar for selecting components and themes.
 */

import { useComposer } from '../state/ComposerContext'
import { sidebarRegistry } from '../registries/sidebar-registry'
import { chatbotRegistry } from '../registries/chatbot-registry'
import { themeRegistry } from '../registries/theme-registry'
import ThemeCard from '../components/ThemeCard'

export default function ComponentPanel() {
  const {
    config,
    setSidebarComponent,
    setChatbotComponent,
    setTheme,
  } = useComposer()

  return (
    <div className="comp-panel">
      <div className="comp-panel__header">
        <h3>Components</h3>
      </div>

      <div className="comp-panel__body">
        {/* Sidebar selection */}
        <section className="comp-panel__section">
          <h4 className="comp-panel__section-title">Sidebar</h4>
          <div className="comp-panel__options">
            {sidebarRegistry.map((entry) => (
              <button
                key={entry.id}
                className={`comp-panel__option ${config.sidebar.componentId === entry.id ? 'comp-panel__option--active' : ''}`}
                onClick={() => setSidebarComponent(entry.id)}
                type="button"
              >
                <span className="comp-panel__option-name">{entry.displayName}</span>
                <span className="comp-panel__option-desc">{entry.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Chatbot selection */}
        <section className="comp-panel__section">
          <h4 className="comp-panel__section-title">Chat UI</h4>
          <div className="comp-panel__options">
            {chatbotRegistry.map((entry) => (
              <button
                key={entry.id}
                className={`comp-panel__option ${config.chatbot.componentId === entry.id ? 'comp-panel__option--active' : ''}`}
                onClick={() => setChatbotComponent(entry.id)}
                type="button"
              >
                <span className="comp-panel__option-name">{entry.displayName}</span>
                <span className="comp-panel__option-desc">{entry.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Theme selection */}
        <section className="comp-panel__section">
          <h4 className="comp-panel__section-title">Theme</h4>
          <div className="comp-panel__themes">
            {themeRegistry.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                selected={config.themeId === theme.id}
                onSelect={() => setTheme(theme.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
