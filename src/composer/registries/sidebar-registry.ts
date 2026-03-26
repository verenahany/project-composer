/**
 * Sidebar registry — selectable sidebar variants for the composer.
 *
 * Each entry describes a sidebar pattern found in the workspace projects.
 * The preview components render these based on the registry metadata.
 */

export interface SidebarPropDef {
  key: string
  label: string
  type: 'boolean' | 'string'
  defaultValue: boolean | string
}

export interface SidebarEntry {
  id: string
  displayName: string
  description: string
  source: string
  variant: 'vertical' | 'horizontal'
  configurableProps: SidebarPropDef[]
}

export const sidebarRegistry: SidebarEntry[] = [
  {
    id: 'sidebar-goai',
    displayName: 'GoAI Sidebar',
    description:
      'Collapsible vertical sidebar with icon nav, brand header, and version footer. Adapted from GoAI One.',
    source: 'GoAi-one/Sidebar.tsx + shared-ui/SidebarShared.tsx',
    variant: 'vertical',
    configurableProps: [
      { key: 'collapsible', label: 'Collapsible', type: 'boolean', defaultValue: true },
      { key: 'showLogo', label: 'Show Logo', type: 'boolean', defaultValue: true },
      { key: 'showVersion', label: 'Show Version', type: 'boolean', defaultValue: true },
      { key: 'brandName', label: 'Brand Name', type: 'string', defaultValue: 'My App' },
    ],
  },
  {
    id: 'sidebar-minimal',
    displayName: 'Minimal Icon Bar',
    description:
      'Permanently collapsed icon-only sidebar rail. Clean and space-efficient.',
    source: 'Derived from GoAI shared-ui with collapsed mode',
    variant: 'vertical',
    configurableProps: [
      { key: 'collapsible', label: 'Collapsible', type: 'boolean', defaultValue: false },
      { key: 'showLogo', label: 'Show Logo', type: 'boolean', defaultValue: false },
      { key: 'showVersion', label: 'Show Version', type: 'boolean', defaultValue: false },
      { key: 'brandName', label: 'Brand Name', type: 'string', defaultValue: '' },
    ],
  },
  {
    id: 'sidebar-header-tabs',
    displayName: 'Header Tab Bar',
    description:
      'Horizontal header navigation with tab buttons. From Instapay Sentiment.',
    source: 'insta_sentiment/ButtonTabs.tsx',
    variant: 'horizontal',
    configurableProps: [
      { key: 'collapsible', label: 'Collapsible', type: 'boolean', defaultValue: false },
      { key: 'showLogo', label: 'Show Logo', type: 'boolean', defaultValue: true },
      { key: 'showVersion', label: 'Show Version', type: 'boolean', defaultValue: false },
      { key: 'brandName', label: 'Brand Name', type: 'string', defaultValue: 'My App' },
    ],
  },
]

export function getSidebarById(id: string): SidebarEntry | undefined {
  return sidebarRegistry.find((s) => s.id === id)
}
