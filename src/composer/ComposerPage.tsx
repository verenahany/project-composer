/**
 * ComposerPage — main entry point for the visual project composer.
 *
 * Three-panel layout:
 *   Left:   component & theme selection
 *   Center: live preview canvas
 *   Right:  properties & icon toggles
 *
 * Toolbar: project name, save/load, reset, generate/export
 */

import { useRef, type ChangeEvent } from 'react'
import { Download, Upload, RotateCcw, FolderOutput, Save } from 'lucide-react'
import { useComposerStore } from './state/useComposerStore'
import { ComposerProvider } from './state/ComposerContext'
import ComponentPanel from './panels/ComponentPanel'
import PreviewPanel from './panels/PreviewPanel'
import PropertiesPanel from './panels/PropertiesPanel'
import { saveConfigToStorage, loadConfigFromStorage, STORAGE_KEY } from './generator/persistence'
import { exportConfigAsJson, generateProjectZip } from './generator/generate-project'
import type { ProjectConfig } from './config/schema'
import './composer.css'
import './preview/preview.css'

function ComposerInner() {
  const store = useComposerStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleGenerate = () => {
    generateProjectZip(store.config)
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
            <button className="composer__btn composer__btn--primary" onClick={handleGenerate} title="Generate project">
              <FolderOutput size={15} />
              <span>Generate</span>
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
    </ComposerProvider>
  )
}

export default function ComposerPage() {
  return <ComposerInner />
}
