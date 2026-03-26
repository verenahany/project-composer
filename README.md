# Project Composer

A standalone visual project builder. Select reusable UI pieces from a menu, preview the result live, switch between themes from existing projects, and generate a new starter project from the assembled configuration.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5180](http://localhost:5180).

## What It Does

1. **Open the composer** — a three-panel builder loads
2. **Left panel** — pick a sidebar variant, chat UI, and color theme
3. **Right panel** — tweak component props and toggle nav icons on/off
4. **Center panel** — see the assembled app update live
5. **Toolbar** — save/load config, export JSON, or generate a full project

## Available Components

### Sidebars

| ID | Name | Layout |
|----|------|--------|
| `sidebar-goai` | GoAI Sidebar | Vertical collapsible |
| `sidebar-minimal` | Minimal Icon Bar | Vertical icon-only |
| `sidebar-header-tabs` | Header Tab Bar | Horizontal |

### Chat UIs

| ID | Name | Style |
|----|------|-------|
| `chatbot-haive` | HAIVE Chat | Full messaging with avatars |
| `chatbot-bubbles` | WhatsApp Bubbles | Grouped sender bubbles |
| `chatbot-support` | Support Assistant | AI chat with typing dots |

### Themes (from existing projects)

| ID | Name | Primary | Source |
|----|------|---------|--------|
| `instapay-purple` | Instapay Purple | `#512772` | insta_sentiment tokens |
| `goai-blue` | GoAI Blue | `#0077C8` | GoAI One CSS |
| `eand-red` | E& Red | `#c41e3a` | Presentation AI theme |
| `goai247-blue` | GoAI 247 Blue | `#2563eb` | Presentation AI theme |
| `goai-navy` | GoAI Navy | `#004080` | GoAI One Tailwind |

## Project Structure

```
project-composer/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                    # App entry
│   ├── App.tsx                     # Root component
│   ├── styles/
│   │   ├── tokens.css              # Design tokens
│   │   └── base.css                # Reset & globals
│   └── composer/
│       ├── ComposerPage.tsx        # Main page
│       ├── composer.css            # Layout styles
│       ├── config/
│       │   └── schema.ts           # ProjectConfig types
│       ├── registries/
│       │   ├── sidebar-registry.ts
│       │   ├── chatbot-registry.ts
│       │   ├── theme-registry.ts
│       │   └── icon-registry.ts
│       ├── state/
│       │   ├── useComposerStore.ts # State management
│       │   └── ComposerContext.tsx  # React context
│       ├── panels/
│       │   ├── ComponentPanel.tsx   # Left panel
│       │   ├── PreviewPanel.tsx     # Center panel
│       │   └── PropertiesPanel.tsx  # Right panel
│       ├── preview/
│       │   ├── PreviewRenderer.tsx  # Config → preview
│       │   ├── PreviewSidebar.tsx   # Sidebar variants
│       │   ├── PreviewChatbot.tsx   # Chat UI variants
│       │   └── preview.css         # Preview styles
│       ├── components/
│       │   ├── IconToggleGrid.tsx   # Icon toggles
│       │   └── ThemeCard.tsx        # Theme cards
│       ├── generator/
│       │   ├── persistence.ts      # Save/load
│       │   └── generate-project.ts # Export/generate
│       ├── example-config.json
│       └── README.md               # Detailed docs
```

## Config Schema

```json
{
  "projectName": "acme-dashboard",
  "themeId": "goai-blue",
  "sidebar": {
    "componentId": "sidebar-goai",
    "props": { "collapsible": true, "showLogo": true, "showVersion": true, "brandName": "Acme" }
  },
  "chatbot": {
    "componentId": "chatbot-haive",
    "props": { "showHeader": true, "showAvatar": true, "showInput": true, "showTimestamps": true }
  },
  "icons": { "dashboard": true, "users": true, "billing": false, "settings": true }
}
```

## Extending

- **Add a theme**: edit `registries/theme-registry.ts`
- **Add a sidebar**: edit `registries/sidebar-registry.ts` + `preview/PreviewSidebar.tsx`
- **Add a chat UI**: edit `registries/chatbot-registry.ts` + `preview/PreviewChatbot.tsx`
- **Add an icon**: edit `registries/icon-registry.ts` + import it in `PreviewSidebar.tsx` and `IconToggleGrid.tsx`

See `src/composer/README.md` for detailed guides.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- lucide-react icons
- CSS custom properties (no Tailwind, no extra UI libraries)
- Zero runtime dependencies beyond React and Lucide

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 5180 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
