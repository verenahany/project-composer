/**
 * PreviewPanel — center canvas that renders the live preview.
 */

import { useComposer } from '../state/ComposerContext'
import PreviewRenderer from '../preview/PreviewRenderer'

export default function PreviewPanel() {
  const { config } = useComposer()

  return (
    <div className="preview-panel">
      <div className="preview-panel__header">
        <h3>Live Preview</h3>
        <span className="preview-panel__theme-badge">
          {config.themeId}
        </span>
      </div>
      <div className="preview-panel__canvas">
        <PreviewRenderer config={config} />
      </div>
    </div>
  )
}
