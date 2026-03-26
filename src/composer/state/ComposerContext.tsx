import { createContext, useContext } from 'react'
import type { ComposerStore } from './useComposerStore'

const ComposerContext = createContext<ComposerStore | null>(null)

export const ComposerProvider = ComposerContext.Provider

export function useComposer(): ComposerStore {
  const ctx = useContext(ComposerContext)
  if (!ctx) {
    throw new Error('useComposer must be used inside <ComposerProvider>')
  }
  return ctx
}
