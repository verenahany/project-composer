/**
 * Project generator — builds a complete Vite + React project from the composed config.
 * The output is a full runnable template with the selected sidebar, chatbot, theme, and icons.
 */

import type { ProjectConfig } from '../config/schema'
import { getThemeById, type ThemeEntry } from '../registries/theme-registry'
import { getSidebarById } from '../registries/sidebar-registry'
import { getChatbotById } from '../registries/chatbot-registry'
import { iconRegistry } from '../registries/icon-registry'
import { buildSidebarComponent } from './templates/sidebar-template'
import { buildChatbotComponent } from './templates/chatbot-template'
import { buildAppComponent } from './templates/app-template'
import { buildThemeCss } from './templates/theme-template'
import { buildComponentsCss } from './templates/components-css-template'

export interface GeneratedFile {
  path: string
  content: string
  /** If true, content is already base64-encoded binary */
  binary?: boolean
}

export async function buildProjectFiles(config: ProjectConfig): Promise<GeneratedFile[]> {
  const theme = getThemeById(config.themeId)
  const sidebar = getSidebarById(config.sidebar.componentId)
  const chatbot = getChatbotById(config.chatbot.componentId)
  const activeIcons = iconRegistry.filter((ic) => config.icons[ic.id])

  const logoFileName = theme?.logo.fileName ?? 'logo.png'

  const files: GeneratedFile[] = [
    { path: 'package.json', content: buildPackageJson(config) },
    { path: 'tsconfig.json', content: TSCONFIG },
    { path: 'vite.config.ts', content: VITE_CONFIG },
    { path: 'index.html', content: buildIndexHtml(config) },
    { path: '.gitignore', content: 'node_modules/\ndist/\n.vite/\n' },
    { path: 'project-config.json', content: JSON.stringify(config, null, 2) },
    { path: 'README.md', content: buildReadme(config, theme, sidebar?.displayName, chatbot?.displayName) },

    { path: 'src/main.tsx', content: MAIN_TSX },
    { path: 'src/App.tsx', content: buildAppComponent(config, sidebar?.variant ?? 'vertical', activeIcons) },
    { path: 'src/App.css', content: buildComponentsCss() },
    { path: 'src/theme.css', content: buildThemeCss(theme) },

    { path: 'src/components/Logo.tsx', content: buildLogoComponent(theme) },
    { path: 'src/components/Sidebar.tsx', content: buildSidebarComponent(config, sidebar?.variant ?? 'vertical', activeIcons) },
    { path: 'src/components/Chatbot.tsx', content: buildChatbotComponent(config) },
  ]

  // Fetch the logo image and include it as a binary file in public/
  if (theme) {
    try {
      const logoBase64 = await fetchAsBase64(theme.logo.url)
      files.push({
        path: `public/${logoFileName}`,
        content: logoBase64,
        binary: true,
      })
    } catch {
      // If the logo can't be fetched, skip it
    }
  }

  return files
}

export function exportConfigAsJson(config: ProjectConfig): void {
  const json = JSON.stringify(config, null, 2)
  downloadFile(config.projectName + '-config.json', json, 'application/json')
}

/**
 * Fetch a URL (served from public/) and return the content as a base64 string.
 */
async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl.split(',')[1]
      if (base64) resolve(base64)
      else reject(new Error('Failed to encode file'))
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// ── Static file contents ─────────────────────────────────────────────

function buildPackageJson(config: ProjectConfig): string {
  return JSON.stringify({
    name: config.projectName,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      'lucide-react': '^0.577.0',
      react: '^19.2.4',
      'react-dom': '^19.2.4',
    },
    devDependencies: {
      '@types/react': '^19.2.14',
      '@types/react-dom': '^19.2.3',
      '@vitejs/plugin-react': '^5.1.4',
      typescript: '~5.9.3',
      vite: '^7.3.1',
    },
  }, null, 2)
}

const TSCONFIG = JSON.stringify({
  compilerOptions: {
    target: 'ES2022',
    jsx: 'react-jsx',
    module: 'ESNext',
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    types: ['vite/client'],
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: true,
    verbatimModuleSyntax: true,
    moduleDetection: 'force',
    noEmit: true,
    strict: true,
  },
  include: ['src'],
}, null, 2)

const VITE_CONFIG = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
})
`

function buildIndexHtml(config: ProjectConfig): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.projectName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
}

const MAIN_TSX = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './theme.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

function buildReadme(
  config: ProjectConfig,
  theme: ThemeEntry | undefined,
  sidebarName: string | undefined,
  chatbotName: string | undefined,
): string {
  const icons = Object.entries(config.icons).filter(([, v]) => v).map(([k]) => '- ' + k).join('\n')
  return `# ${config.projectName}

Generated by **Project Composer**.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000

## Theme
**${theme?.displayName ?? config.themeId}** — ${theme?.description ?? ''}

## Components
- **Sidebar:** ${sidebarName ?? config.sidebar.componentId}
- **Chat UI:** ${chatbotName ?? config.chatbot.componentId}

## Active Nav Icons
${icons}

## Customizing
- Theme colors: edit CSS variables in \`src/theme.css\`
- Sidebar items: edit \`src/components/Sidebar.tsx\`
- Chat UI: edit \`src/components/Chatbot.tsx\`
- Layout: edit \`src/App.tsx\`
`
}

function buildLogoComponent(theme: ThemeEntry | undefined): string {
  const fileName = theme?.logo.fileName ?? 'logo.png'
  const w = theme?.logo.width ?? 100
  const h = theme?.logo.height ?? 40
  return `export default function Logo() {
  return (
    <img
      src="/${fileName}"
      alt="Logo"
      style={{ width: ${w}, height: ${h}, objectFit: 'contain' }}
    />
  )
}
`
}

// ── Helpers ──────────────────────────────────────────────────────────

function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
