/**
 * Theme registry — derived from existing project color schemas.
 *
 * Sources:
 *   - insta_sentiment/frontend/src/styles/tokens.css  (Instapay Purple)
 *   - GoAi-one/frontend/src/index.css                 (GoAI Blue)
 *   - presentation-ai-main/src/styles/theme.css       (E&and Red, GoAI247 Blue)
 */

export interface ThemeTokens {
  '--composer-primary': string
  '--composer-primary-hover': string
  '--composer-primary-foreground': string
  '--composer-secondary': string
  '--composer-accent': string
  '--composer-background': string
  '--composer-foreground': string
  '--composer-card': string
  '--composer-card-foreground': string
  '--composer-muted': string
  '--composer-muted-foreground': string
  '--composer-border': string
  '--composer-sidebar-bg': string
  '--composer-sidebar-fg': string
  '--composer-sidebar-active': string
  '--composer-sidebar-active-fg': string
  '--composer-sidebar-hover': string
  '--composer-sidebar-border': string
}

export interface ThemeLogo {
  svg: string
  width: number
  height: number
}

export interface ThemeEntry {
  id: string
  displayName: string
  description: string
  source: string
  brandName: string
  logo: ThemeLogo
  tokens: ThemeTokens
  preview: {
    swatch: string[]
  }
}

// ── Inline SVG logos from each source repo ───────────────────────────

const LOGO_INSTAPAY: ThemeLogo = {
  width: 130,
  height: 30,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="30" viewBox="0 0 130 30">
  <circle cx="13" cy="15" r="11" fill="#512772"/>
  <text x="9" y="20" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#fff">I</text>
  <text x="28" y="21" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="currentColor">Instapay</text>
</svg>`,
}

const LOGO_GOAI: ThemeLogo = {
  width: 110,
  height: 35,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="110" height="35" viewBox="0 0 110 35">
  <text x="0" y="26" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="currentColor">GoAI</text>
  <g transform="translate(55,2)">
    <path d="M0 8 L8 0" stroke="#0077C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M0 0 L8 0" stroke="#0077C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M-2 12 L6 4" stroke="#0077C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M-2 4 L6 4" stroke="#0077C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
</svg>`,
}

const LOGO_EAND: ThemeLogo = {
  width: 60,
  height: 30,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 60 30">
  <text x="0" y="23" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#c41e3a">e&amp;</text>
</svg>`,
}

const LOGO_GOAI247: ThemeLogo = {
  width: 120,
  height: 30,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" viewBox="0 0 120 30">
  <text x="0" y="22" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="currentColor">GoAI</text>
  <text x="52" y="22" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#2563eb">247</text>
</svg>`,
}

const LOGO_GOAI_NAVY: ThemeLogo = {
  width: 110,
  height: 35,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="110" height="35" viewBox="0 0 110 35">
  <text x="0" y="26" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="currentColor">GoAI</text>
  <g transform="translate(55,2)">
    <path d="M0 8 L8 0" stroke="#004080" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M0 0 L8 0" stroke="#004080" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M-2 12 L6 4" stroke="#004080" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M-2 4 L6 4" stroke="#004080" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
</svg>`,
}

// ── Registry ─────────────────────────────────────────────────────────

export const themeRegistry: ThemeEntry[] = [
  {
    id: 'instapay-purple',
    displayName: 'Instapay Purple',
    description: 'Purple & orange palette from the Instapay Sentiment project',
    source: 'insta_sentiment/tokens.css',
    brandName: 'Instapay',
    logo: LOGO_INSTAPAY,
    tokens: {
      '--composer-primary': '#512772',
      '--composer-primary-hover': '#43205f',
      '--composer-primary-foreground': '#ffffff',
      '--composer-secondary': '#7d569e',
      '--composer-accent': '#d96628',
      '--composer-background': '#f3f2f7',
      '--composer-foreground': '#1c1c22',
      '--composer-card': '#ffffff',
      '--composer-card-foreground': '#1c1c22',
      '--composer-muted': '#f7f5fa',
      '--composer-muted-foreground': '#68707f',
      '--composer-border': '#e4deeb',
      '--composer-sidebar-bg': '#512772',
      '--composer-sidebar-fg': '#ffffff',
      '--composer-sidebar-active': '#7d569e',
      '--composer-sidebar-active-fg': '#ffffff',
      '--composer-sidebar-hover': 'rgba(255,255,255,0.12)',
      '--composer-sidebar-border': 'rgba(255,255,255,0.15)',
    },
    preview: {
      swatch: ['#512772', '#7d569e', '#d96628', '#f6a394', '#f3f2f7'],
    },
  },
  {
    id: 'goai-blue',
    displayName: 'GoAI Blue',
    description: 'Corporate blue palette from the GoAI One project',
    source: 'GoAi-one/index.css',
    brandName: 'GoAI One',
    logo: LOGO_GOAI,
    tokens: {
      '--composer-primary': '#0077C8',
      '--composer-primary-hover': '#005fa0',
      '--composer-primary-foreground': '#ffffff',
      '--composer-secondary': '#00263E',
      '--composer-accent': '#E6F2F8',
      '--composer-background': '#f8fafb',
      '--composer-foreground': '#1a2332',
      '--composer-card': '#ffffff',
      '--composer-card-foreground': '#1a2332',
      '--composer-muted': '#f1f5f9',
      '--composer-muted-foreground': '#64748b',
      '--composer-border': '#e2e8f0',
      '--composer-sidebar-bg': '#ffffff',
      '--composer-sidebar-fg': '#1e293b',
      '--composer-sidebar-active': '#0077C8',
      '--composer-sidebar-active-fg': '#ffffff',
      '--composer-sidebar-hover': '#e6f2f8',
      '--composer-sidebar-border': '#e2e8f0',
    },
    preview: {
      swatch: ['#0077C8', '#00263E', '#E6F2F8', '#004080', '#f8fafb'],
    },
  },
  {
    id: 'eand-red',
    displayName: 'E& Red',
    description: 'Red & grey brand from the Presentation AI project (E& Telecom)',
    source: 'presentation-ai/theme.css',
    brandName: 'e&',
    logo: LOGO_EAND,
    tokens: {
      '--composer-primary': '#c41e3a',
      '--composer-primary-hover': '#a31830',
      '--composer-primary-foreground': '#ffffff',
      '--composer-secondary': '#374151',
      '--composer-accent': '#6b7280',
      '--composer-background': '#ffffff',
      '--composer-foreground': '#2b3544',
      '--composer-card': '#ffffff',
      '--composer-card-foreground': '#2b3544',
      '--composer-muted': '#e8e6ed',
      '--composer-muted-foreground': '#5d6470',
      '--composer-border': '#dfe1e6',
      '--composer-sidebar-bg': '#ffffff',
      '--composer-sidebar-fg': '#2b3544',
      '--composer-sidebar-active': '#c41e3a',
      '--composer-sidebar-active-fg': '#ffffff',
      '--composer-sidebar-hover': '#fef2f2',
      '--composer-sidebar-border': '#dfe1e6',
    },
    preview: {
      swatch: ['#c41e3a', '#374151', '#6b7280', '#dfe1e6', '#ffffff'],
    },
  },
  {
    id: 'goai247-blue',
    displayName: 'GoAI 247 Blue',
    description: 'Blue brand variant from the Presentation AI project (GoAI247)',
    source: 'presentation-ai/theme.css',
    brandName: 'GoAI247',
    logo: LOGO_GOAI247,
    tokens: {
      '--composer-primary': '#2563eb',
      '--composer-primary-hover': '#1d4ed8',
      '--composer-primary-foreground': '#ffffff',
      '--composer-secondary': '#1e293b',
      '--composer-accent': '#dbeafe',
      '--composer-background': '#ffffff',
      '--composer-foreground': '#1e293b',
      '--composer-card': '#ffffff',
      '--composer-card-foreground': '#1e293b',
      '--composer-muted': '#dbeafe',
      '--composer-muted-foreground': '#4b5e78',
      '--composer-border': '#dce5f0',
      '--composer-sidebar-bg': '#ffffff',
      '--composer-sidebar-fg': '#1e293b',
      '--composer-sidebar-active': '#2563eb',
      '--composer-sidebar-active-fg': '#ffffff',
      '--composer-sidebar-hover': '#eff6ff',
      '--composer-sidebar-border': '#dce5f0',
    },
    preview: {
      swatch: ['#2563eb', '#1e293b', '#dbeafe', '#3b82f6', '#ffffff'],
    },
  },
  {
    id: 'goai-navy',
    displayName: 'GoAI Navy',
    description: 'Deep navy palette from the GoAI One Tailwind config',
    source: 'GoAi-one/tailwind.config.ts',
    brandName: 'GoAI',
    logo: LOGO_GOAI_NAVY,
    tokens: {
      '--composer-primary': '#004080',
      '--composer-primary-hover': '#003060',
      '--composer-primary-foreground': '#ffffff',
      '--composer-secondary': '#e2e8f0',
      '--composer-accent': '#eef2ff',
      '--composer-background': '#f8fafc',
      '--composer-foreground': '#0f172a',
      '--composer-card': '#ffffff',
      '--composer-card-foreground': '#0f172a',
      '--composer-muted': '#f8fafc',
      '--composer-muted-foreground': '#475569',
      '--composer-border': '#e2e8f0',
      '--composer-sidebar-bg': '#f9fafb',
      '--composer-sidebar-fg': '#1e293b',
      '--composer-sidebar-active': '#004080',
      '--composer-sidebar-active-fg': '#ffffff',
      '--composer-sidebar-hover': '#e0e7ff',
      '--composer-sidebar-border': '#e2e8f0',
    },
    preview: {
      swatch: ['#004080', '#002a5c', '#2563eb', '#e0e7ff', '#f8fafc'],
    },
  },
]

export function getThemeById(id: string): ThemeEntry | undefined {
  return themeRegistry.find((t) => t.id === id)
}
