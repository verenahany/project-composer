/**
 * ThemeCard — displays a theme option with color swatches.
 */

import type { ThemeEntry } from '../registries/theme-registry'

interface Props {
  theme: ThemeEntry
  selected: boolean
  onSelect: () => void
}

export default function ThemeCard({ theme, selected, onSelect }: Props) {
  return (
    <button
      className={`theme-card ${selected ? 'theme-card--selected' : ''}`}
      onClick={onSelect}
      type="button"
      title={theme.description}
    >
      <div className="theme-card__swatches">
        {theme.preview.swatch.map((color, i) => (
          <span
            key={i}
            className="theme-card__swatch"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="theme-card__info">
        <span className="theme-card__name">{theme.displayName}</span>
        <span className="theme-card__source">{theme.source}</span>
      </div>
    </button>
  )
}
