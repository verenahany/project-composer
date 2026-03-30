import type { ProjectConfig } from '../../config/schema'

interface IconItem { id: string; label: string; lucideName: string }

export function buildAppComponent(
  config: ProjectConfig,
  sidebarVariant: string,
  _activeIcons: IconItem[],
): string {
  const isHorizontal = sidebarVariant === 'horizontal'
  const hasTopBar = config.sidebar.props.showProfile || config.sidebar.props.showNotifications
  const showTopBarInMain = hasTopBar && !isHorizontal

  const imports = [`import Sidebar from './components/Sidebar'`, `import Chatbot from './components/Chatbot'`]
  if (showTopBarInMain) {
    imports.push(`import TopBar from './components/TopBar'`)
  }

  const topBarJsx = showTopBarInMain ? `\n          <TopBar />` : ''

  return `${imports.join('\n')}

export default function App() {
  return (
    <div className="app${isHorizontal ? ' app--horizontal' : ''}">
      <Sidebar />
      <main className="main">${topBarJsx}
        <div className="main__content">
          <Chatbot />
        </div>
      </main>
    </div>
  )
}
`
}
