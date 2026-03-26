/**
 * Config persistence — save/load project configs to localStorage.
 */

import type { ProjectConfig } from '../config/schema'

export const STORAGE_KEY = 'composer:project-config'
const STORAGE_LIST_KEY = 'composer:saved-projects'

export function saveConfigToStorage(config: ProjectConfig): void {
  const updated = { ...config, updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  const list = getSavedProjectList()
  const idx = list.findIndex((p) => p.projectName === config.projectName)
  const entry = { projectName: config.projectName, updatedAt: updated.updatedAt }
  if (idx >= 0) {
    list[idx] = entry
  } else {
    list.push(entry)
  }
  localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(list))
}

export function loadConfigFromStorage(): ProjectConfig | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ProjectConfig
  } catch {
    return null
  }
}

export function getSavedProjectList(): { projectName: string; updatedAt: string }[] {
  const raw = localStorage.getItem(STORAGE_LIST_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}
