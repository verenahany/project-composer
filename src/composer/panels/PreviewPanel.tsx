/**
 * PreviewPanel — center canvas that renders the live preview.
 */

import { useState, useEffect, useCallback } from 'react'
import { Maximize2, X } from 'lucide-react'
import { useComposer } from '../state/ComposerContext'
import PreviewRenderer from '../preview/PreviewRenderer'

export default function PreviewPanel() {
  const { config } = useComposer()
  const [fullscreen, setFullscreen] = useState(false)

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setFullscreen(false)
  }, [])

  useEffect(() => {
    if (fullscreen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [fullscreen, handleEsc])

  return (
    <>
      <div className="preview-panel">
        <div className="preview-panel__header">
          <h3>Live Preview</h3>
          <span className="preview-panel__theme-badge">{config.themeId}</span>
          <button
            className="preview-panel__fullscreen-btn"
            onClick={() => setFullscreen(true)}
            title="Full preview"
          >
            <Maximize2 size={14} />
            <span>Full Preview</span>
          </button>
        </div>
        <div className="preview-panel__canvas">
          <PreviewRenderer config={config} />
        </div>
      </div>

      {fullscreen && (
        <div className="fullprev__overlay">
          <div className="fullprev__toolbar">
            <span className="fullprev__title">
              Full App Preview — {config.projectName || 'Untitled'}
            </span>
            <span className="fullprev__theme-badge">{config.themeId}</span>
            <button
              className="fullprev__close"
              onClick={() => setFullscreen(false)}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
          <div className="fullprev__canvas">
            <PreviewRenderer config={config} />
          </div>
        </div>
      )}
    </>
  )
}
