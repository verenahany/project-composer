/**
 * Typed project configuration schema.
 * Represents the full composed result that can be saved, loaded, and used to generate a project.
 */

export interface IconConfig {
  [key: string]: boolean
}

export interface SidebarConfig {
  componentId: string
  props: {
    collapsible: boolean
    showLogo: boolean
    showVersion: boolean
    brandName: string
    showProfile: boolean
    showNotifications: boolean
  }
}

export interface ChatbotConfig {
  componentId: string
  props: {
    showHeader: boolean
    showAvatar: boolean
    showInput: boolean
    showTimestamps: boolean
    showMic: boolean
  }
}

export interface ProjectConfig {
  projectName: string
  themeId: string
  sidebar: SidebarConfig
  chatbot: ChatbotConfig
  icons: IconConfig
  createdAt: string
  updatedAt: string
}

export const DEFAULT_ICONS: IconConfig = {
  dashboard: true,
  users: true,
  settings: true,
  messages: true,
  analytics: false,
  billing: false,
  notifications: true,
  search: true,
}

export function createDefaultConfig(): ProjectConfig {
  return {
    projectName: 'my-project',
    themeId: 'instapay-purple',
    sidebar: {
      componentId: 'sidebar-goai',
      props: {
        collapsible: true,
        showLogo: true,
        showVersion: true,
        brandName: 'My App',
        showProfile: false,
        showNotifications: false,
      },
    },
    chatbot: {
      componentId: 'chatbot-haive',
      props: {
        showHeader: true,
        showAvatar: true,
        showInput: true,
        showTimestamps: true,
        showMic: false,
      },
    },
    icons: { ...DEFAULT_ICONS },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
