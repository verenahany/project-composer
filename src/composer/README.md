# Project Composer

A visual project builder that lets you assemble a new application from reusable components, switch between themes derived from existing projects, and generate a downloadable starter project.

## Quick Start

1. Run the frontend dev server (`npm run dev` / `pnpm dev` from `frontend/`)
2. Log in to the Instapay Sentiment app
3. Click the **Composer** tab in the header navigation
4. Start composing your project

## User Flow

1. **Open the Composer** — an empty three-panel page loads
2. **Left panel — Components** — select a sidebar variant, a chat UI variant, and a theme
3. **Right panel — Properties** — configure component-specific props (collapsible, brand name, etc.) and toggle nav icons on/off
4. **Center panel — Preview** — see the assembled result update live as you make changes
5. **Toolbar — Save/Export/Generate** — persist your config or generate a new project

## Architecture

```
composer/
├── ComposerPage.tsx         # Main entry — toolbar + three-panel layout
├── composer.css              # Layout & panel styles
├── config/
│   └── schema.ts            # TypeScript types for ProjectConfig
├── registries/
│   ├── sidebar-registry.ts  # Available sidebar variants
│   ├── chatbot-registry.ts  # Available chat UI variants
│   ├── theme-registry.ts    # Themes from existing project color schemas
│   └── icon-registry.ts     # Toggleable nav icons
├── state/
│   ├── useComposerStore.ts  # useReducer-based state management
│   └── ComposerContext.tsx  # React context provider
├── panels/
│   ├── ComponentPanel.tsx   # Left: component & theme selection
│   ├── PreviewPanel.tsx     # Center: live preview canvas
│   └── PropertiesPanel.tsx  # Right: properties & icon toggles
├── preview/
│   ├── PreviewRenderer.tsx  # Assembles the preview from config
│   ├── PreviewSidebar.tsx   # Sidebar preview (vertical + horizontal)
│   ├── PreviewChatbot.tsx   # Chat UI preview (3 variants)
│   └── preview.css          # Scoped preview styles
├── components/
│   ├── IconToggleGrid.tsx   # Per-icon boolean toggle grid
│   └── ThemeCard.tsx        # Theme selection card with swatches
├── generator/
│   ├── persistence.ts       # localStorage save/load
│   └── generate-project.ts  # Export config JSON + generate project files
├── example-config.json      # Example saved configuration
└── README.md                # This file
```

## Theme Registry

Themes are derived from existing project color schemas:

| Theme ID | Source Project | Primary Color |
|----------|---------------|--------------|
| `instapay-purple` | insta_sentiment | `#512772` |
| `goai-blue` | GoAI One | `#0077C8` |
| `eand-red` | Presentation AI (E&) | `#c41e3a` |
| `goai247-blue` | Presentation AI (GoAI247) | `#2563eb` |
| `goai-navy` | GoAI One Tailwind | `#004080` |

### Adding a New Theme

1. Open `registries/theme-registry.ts`
2. Add a new entry to the `themeRegistry` array:
   ```ts
   {
     id: 'my-theme',
     displayName: 'My Theme',
     description: 'Description of the theme',
     source: 'where/it/came/from',
     tokens: {
       '--composer-primary': '#hex',
       '--composer-primary-hover': '#hex',
       // ... all ThemeTokens keys
     },
     preview: { swatch: ['#hex1', '#hex2', '#hex3', '#hex4', '#hex5'] },
   }
   ```

## Sidebar Registry

| Sidebar ID | Variant | Source |
|-----------|---------|--------|
| `sidebar-goai` | vertical | GoAI One Sidebar + shared-ui |
| `sidebar-minimal` | vertical | Collapsed icon-only rail |
| `sidebar-header-tabs` | horizontal | Instapay Sentiment ButtonTabs |

### Adding a New Sidebar

1. Open `registries/sidebar-registry.ts`
2. Add an entry with `id`, `displayName`, `variant`, and `configurableProps`
3. If needed, add a new rendering branch in `preview/PreviewSidebar.tsx`

## Chatbot Registry

| Chatbot ID | Source |
|-----------|--------|
| `chatbot-haive` | GoAI One HAIVE ChatInterface |
| `chatbot-bubbles` | Instapay Sentiment ChatBubbles |
| `chatbot-support` | Presentation AI dashboard assistant |

### Adding a New Chatbot UI

1. Open `registries/chatbot-registry.ts`
2. Add an entry with `id`, `displayName`, and `configurableProps`
3. Create a new component in `preview/PreviewChatbot.tsx` and add it to `CHATBOT_COMPONENTS`

## Icon Toggles

The icon toggle grid lets you enable/disable nav icons. Each icon maps to a `lucide-react` icon component. The config stores them as:

```json
{
  "icons": {
    "dashboard": true,
    "users": true,
    "billing": false,
    "settings": true
  }
}
```

### Adding a New Icon

1. Open `registries/icon-registry.ts`
2. Add an entry with `id`, `label`, `lucideName`, and `defaultEnabled`
3. Import the icon in `preview/PreviewSidebar.tsx` and `components/IconToggleGrid.tsx`

## Config Schema

The `ProjectConfig` type (in `config/schema.ts`) represents the composed result:

```ts
interface ProjectConfig {
  projectName: string
  themeId: string
  sidebar: { componentId: string; props: { ... } }
  chatbot: { componentId: string; props: { ... } }
  icons: Record<string, boolean>
  createdAt: string
  updatedAt: string
}
```

## Save / Load / Export

- **Save**: Stores config in `localStorage` (browser-local)
- **Load**: Reads the last saved config from `localStorage`
- **Export**: Downloads the config as a `.json` file
- **Import**: Loads a previously exported `.json` file
- **Generate**: Downloads a set of project files (HTML, CSS, README, config JSON) that form a runnable starter project using the selected theme and components

## Generating a Project from Saved Config

1. Compose your project in the visual builder
2. Click **Generate** in the toolbar
3. The browser downloads four files:
   - `index.html` — base template with your selected sidebar, chat, and theme
   - `styles.css` — generated CSS with theme variables
   - `README.md` — project documentation
   - `project-config.json` — the full config for reference/re-import
4. Open `index.html` in a browser to see the result
5. Customize from there

## Design Decisions

- **No Tailwind added** — uses the existing CSS custom property system from `tokens.css`
- **No new dependencies** — uses only `lucide-react` and `react` (already in `package.json`)
- **Config-driven rendering** — all preview components read from the config state
- **Scoped styles** — composer CSS uses `composer__`, `comp-panel__`, `props-panel__`, `prev-*` prefixes to avoid conflicts with existing app styles
- **Lazy loading** — `ComposerPage` is loaded via `React.lazy()` so it doesn't increase the initial bundle
