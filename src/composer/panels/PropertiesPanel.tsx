/**
 * PropertiesPanel — right sidebar for editing properties of selected components.
 */

import { useComposer } from '../state/ComposerContext'
import { getSidebarById } from '../registries/sidebar-registry'
import { getChatbotById } from '../registries/chatbot-registry'
import IconToggleGrid from '../components/IconToggleGrid'

export default function PropertiesPanel() {
  const {
    config,
    setProjectName,
    setSidebarProp,
    setChatbotProp,
    setIcon,
  } = useComposer()

  const sidebarEntry = getSidebarById(config.sidebar.componentId)
  const chatbotEntry = getChatbotById(config.chatbot.componentId)

  return (
    <div className="props-panel">
      <div className="props-panel__header">
        <h3>Properties</h3>
      </div>

      <div className="props-panel__body">
        {/* Project name */}
        <section className="props-panel__section">
          <h4 className="props-panel__section-title">Project</h4>
          <label className="props-panel__field">
            <span className="props-panel__label">Project Name</span>
            <input
              type="text"
              className="props-panel__input"
              value={config.projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-project"
            />
          </label>
        </section>

        {/* Sidebar props */}
        {sidebarEntry && (
          <section className="props-panel__section">
            <h4 className="props-panel__section-title">
              Sidebar: {sidebarEntry.displayName}
            </h4>
            {sidebarEntry.configurableProps.map((prop) => (
              <label key={prop.key} className="props-panel__field">
                {prop.type === 'boolean' ? (
                  <span className="props-panel__toggle-row">
                    <input
                      type="checkbox"
                      checked={
                        (config.sidebar.props as Record<string, boolean | string>)[prop.key] as boolean
                        ?? prop.defaultValue
                      }
                      onChange={(e) => setSidebarProp(prop.key, e.target.checked)}
                    />
                    <span>{prop.label}</span>
                  </span>
                ) : (
                  <>
                    <span className="props-panel__label">{prop.label}</span>
                    <input
                      type="text"
                      className="props-panel__input"
                      value={
                        (config.sidebar.props as Record<string, boolean | string>)[prop.key] as string
                        ?? prop.defaultValue
                      }
                      onChange={(e) => setSidebarProp(prop.key, e.target.value)}
                    />
                  </>
                )}
              </label>
            ))}
          </section>
        )}

        {/* Chatbot props */}
        {chatbotEntry && (
          <section className="props-panel__section">
            <h4 className="props-panel__section-title">
              Chat: {chatbotEntry.displayName}
            </h4>
            {chatbotEntry.configurableProps.map((prop) => (
              <label key={prop.key} className="props-panel__field">
                {prop.type === 'boolean' ? (
                  <span className="props-panel__toggle-row">
                    <input
                      type="checkbox"
                      checked={
                        (config.chatbot.props as Record<string, boolean | string>)[prop.key] as boolean
                        ?? prop.defaultValue
                      }
                      onChange={(e) => setChatbotProp(prop.key, e.target.checked)}
                    />
                    <span>{prop.label}</span>
                  </span>
                ) : (
                  <>
                    <span className="props-panel__label">{prop.label}</span>
                    <input
                      type="text"
                      className="props-panel__input"
                      value={
                        (config.chatbot.props as Record<string, boolean | string>)[prop.key] as string
                        ?? prop.defaultValue
                      }
                      onChange={(e) => setChatbotProp(prop.key, e.target.value)}
                    />
                  </>
                )}
              </label>
            ))}
          </section>
        )}

        {/* Icon toggles */}
        <section className="props-panel__section">
          <h4 className="props-panel__section-title">Nav Icons</h4>
          <IconToggleGrid icons={config.icons} onToggle={setIcon} />
        </section>
      </div>
    </div>
  )
}
