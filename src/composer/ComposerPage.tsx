/**
 * ComposerPage — main entry point for the visual project composer.
 *
 * Three-panel layout:
 *   Left:   component & theme selection
 *   Center: live preview canvas
 *   Right:  properties & icon toggles
 *
 * Toolbar: save/load, export/import, reset, push to GitHub
 */

import { useState, useRef, type ChangeEvent } from 'react'
import { Download, Upload, RotateCcw, Save, Github } from 'lucide-react'
import { useComposerStore } from './state/useComposerStore'
import { ComposerProvider } from './state/ComposerContext'
import ComponentPanel from './panels/ComponentPanel'
import PreviewPanel from './panels/PreviewPanel'
import PropertiesPanel from './panels/PropertiesPanel'
import GitHubModal from './components/GitHubModal'
import { saveConfigToStorage, loadConfigFromStorage, STORAGE_KEY } from './generator/persistence'
import { exportConfigAsJson } from './generator/generate-project'
import type { ProjectConfig } from './config/schema'
import './composer.css'
import './preview/preview.css'

function ComposerInner() {
  const store = useComposerStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [ghModalOpen, setGhModalOpen] = useState(false)

  const handleSave = () => {
    saveConfigToStorage(store.config)
    alert('Configuration saved to local storage.')
  }

  const handleLoad = () => {
    const saved = loadConfigFromStorage()
    if (saved) {
      store.loadConfig(saved)
    } else {
      alert('No saved configuration found.')
    }
  }

  const handleExportJson = () => {
    exportConfigAsJson(store.config)
  }

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as ProjectConfig
        store.loadConfig(parsed)
      } catch {
        alert('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const hasSaved = !!localStorage.getItem(STORAGE_KEY)

  return (
    <ComposerProvider value={store}>
      <div className="composer">
        {/* Toolbar */}
        <header className="composer__toolbar">
          <div className="composer__toolbar-left">
            <h2 className="composer__title">Project Composer</h2>
          </div>
          <div className="composer__toolbar-actions">
            <button className="composer__btn" onClick={handleSave} title="Save to browser">
              <Save size={15} />
              <span>Save</span>
            </button>
            <button
              className="composer__btn"
              onClick={handleLoad}
              disabled={!hasSaved}
              title="Load from browser"
            >
              <Upload size={15} />
              <span>Load</span>
            </button>
            <button className="composer__btn" onClick={handleExportJson} title="Download config JSON">
              <Download size={15} />
              <span>Export</span>
            </button>
            <button className="composer__btn" onClick={() => fileInputRef.current?.click()} title="Import config JSON">
              <Upload size={15} />
              <span>Import</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportJson}
            />
            <button className="composer__btn composer__btn--secondary" onClick={store.reset} title="Reset to defaults">
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
            <button className="composer__btn composer__btn--github" onClick={() => setGhModalOpen(true)} title="Push project to GitHub">
              <Github size={15} />
              <span>Push to GitHub</span>
            </button>
          </div>
        </header>

        {/* Three-panel layout */}
        <div className="composer__layout">
          <aside className="composer__panel composer__panel--left">
            <ComponentPanel />
          </aside>
          <div className="composer__panel composer__panel--center">
            <PreviewPanel />
          </div>
          <aside className="composer__panel composer__panel--right">
            <PropertiesPanel />
          </aside>
        </div>
      </div>

      <GitHubModal
        config={store.config}
        open={ghModalOpen}
        onClose={() => setGhModalOpen(false)}
      />
    </ComposerProvider>
  )
}

export default function ComposerPage() {
  return <ComposerInner />
}
