import type { ThemeEntry } from '../../registries/theme-registry'

export function buildThemeCss(theme: ThemeEntry | undefined): string {
  const vars = theme
    ? (Object.entries(theme.tokens) as [string, string][])
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n')
    : ''

  return `/* Theme: ${theme?.displayName ?? 'default'} */
/* Source: ${theme?.source ?? 'none'} */

:root {
${vars}
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--composer-foreground);
  background: var(--composer-background);
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
}
`
}
