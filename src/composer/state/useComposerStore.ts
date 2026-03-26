/**
 * Composer state management via useReducer.
 * Holds the full ProjectConfig and exposes typed dispatch actions.
 */

import { useReducer, useCallback } from 'react'
import type { ProjectConfig, SidebarConfig, ChatbotConfig, IconConfig } from '../config/schema'
import { createDefaultConfig } from '../config/schema'

// ── Actions ──────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PROJECT_NAME'; payload: string }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_SIDEBAR'; payload: Partial<SidebarConfig> }
  | { type: 'SET_SIDEBAR_COMPONENT'; payload: string }
  | { type: 'SET_SIDEBAR_PROP'; payload: { key: string; value: boolean | string } }
  | { type: 'SET_CHATBOT'; payload: Partial<ChatbotConfig> }
  | { type: 'SET_CHATBOT_COMPONENT'; payload: string }
  | { type: 'SET_CHATBOT_PROP'; payload: { key: string; value: boolean | string } }
  | { type: 'SET_ICON'; payload: { id: string; enabled: boolean } }
  | { type: 'SET_ICONS'; payload: IconConfig }
  | { type: 'LOAD_CONFIG'; payload: ProjectConfig }
  | { type: 'RESET' }

// ── Reducer ──────────────────────────────────────────────────────────

function composerReducer(state: ProjectConfig, action: Action): ProjectConfig {
  const now = new Date().toISOString()

  switch (action.type) {
    case 'SET_PROJECT_NAME':
      return { ...state, projectName: action.payload, updatedAt: now }

    case 'SET_THEME':
      return { ...state, themeId: action.payload, updatedAt: now }

    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebar: { ...state.sidebar, ...action.payload },
        updatedAt: now,
      }

    case 'SET_SIDEBAR_COMPONENT':
      return {
        ...state,
        sidebar: { ...state.sidebar, componentId: action.payload },
        updatedAt: now,
      }

    case 'SET_SIDEBAR_PROP':
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          props: {
            ...state.sidebar.props,
            [action.payload.key]: action.payload.value,
          },
        },
        updatedAt: now,
      }

    case 'SET_CHATBOT':
      return {
        ...state,
        chatbot: { ...state.chatbot, ...action.payload },
        updatedAt: now,
      }

    case 'SET_CHATBOT_COMPONENT':
      return {
        ...state,
        chatbot: { ...state.chatbot, componentId: action.payload },
        updatedAt: now,
      }

    case 'SET_CHATBOT_PROP':
      return {
        ...state,
        chatbot: {
          ...state.chatbot,
          props: {
            ...state.chatbot.props,
            [action.payload.key]: action.payload.value,
          },
        },
        updatedAt: now,
      }

    case 'SET_ICON':
      return {
        ...state,
        icons: { ...state.icons, [action.payload.id]: action.payload.enabled },
        updatedAt: now,
      }

    case 'SET_ICONS':
      return { ...state, icons: { ...action.payload }, updatedAt: now }

    case 'LOAD_CONFIG':
      return { ...action.payload }

    case 'RESET':
      return createDefaultConfig()

    default:
      return state
  }
}

// ── Hook ─────────────────────────────────────────────────────────────

export function useComposerStore(initial?: ProjectConfig) {
  const [config, dispatch] = useReducer(composerReducer, initial ?? createDefaultConfig())

  const setProjectName = useCallback((name: string) => {
    dispatch({ type: 'SET_PROJECT_NAME', payload: name })
  }, [])

  const setTheme = useCallback((themeId: string) => {
    dispatch({ type: 'SET_THEME', payload: themeId })
  }, [])

  const setSidebarComponent = useCallback((componentId: string) => {
    dispatch({ type: 'SET_SIDEBAR_COMPONENT', payload: componentId })
  }, [])

  const setSidebarProp = useCallback((key: string, value: boolean | string) => {
    dispatch({ type: 'SET_SIDEBAR_PROP', payload: { key, value } })
  }, [])

  const setChatbotComponent = useCallback((componentId: string) => {
    dispatch({ type: 'SET_CHATBOT_COMPONENT', payload: componentId })
  }, [])

  const setChatbotProp = useCallback((key: string, value: boolean | string) => {
    dispatch({ type: 'SET_CHATBOT_PROP', payload: { key, value } })
  }, [])

  const setIcon = useCallback((id: string, enabled: boolean) => {
    dispatch({ type: 'SET_ICON', payload: { id, enabled } })
  }, [])

  const loadConfig = useCallback((cfg: ProjectConfig) => {
    dispatch({ type: 'LOAD_CONFIG', payload: cfg })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return {
    config,
    dispatch,
    setProjectName,
    setTheme,
    setSidebarComponent,
    setSidebarProp,
    setChatbotComponent,
    setChatbotProp,
    setIcon,
    loadConfig,
    reset,
  }
}

export type ComposerStore = ReturnType<typeof useComposerStore>
