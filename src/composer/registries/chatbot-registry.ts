/**
 * Chatbot UI registry — selectable chat interface variants for the composer.
 *
 * Each entry describes a chat UI pattern found in the workspace projects.
 */

export interface ChatbotPropDef {
  key: string
  label: string
  type: 'boolean' | 'string'
  defaultValue: boolean | string
}

export interface ChatbotEntry {
  id: string
  displayName: string
  description: string
  source: string
  configurableProps: ChatbotPropDef[]
}

export const chatbotRegistry: ChatbotEntry[] = [
  {
    id: 'chatbot-haive',
    displayName: 'HAIVE Chat',
    description:
      'Full messaging interface with avatars, rounded bubbles, channel header, and message input. From GoAI One HAIVE.',
    source: 'GoAi-one/haive/ChatInterface.tsx',
    configurableProps: [
      { key: 'showHeader', label: 'Show Header', type: 'boolean', defaultValue: true },
      { key: 'showAvatar', label: 'Show Avatars', type: 'boolean', defaultValue: true },
      { key: 'showInput', label: 'Show Input', type: 'boolean', defaultValue: true },
      { key: 'showTimestamps', label: 'Show Timestamps', type: 'boolean', defaultValue: true },
    ],
  },
  {
    id: 'chatbot-bubbles',
    displayName: 'WhatsApp Bubbles',
    description:
      'Read-only message display with sender grouping, badges, and stacked bubbles. From Instapay Sentiment.',
    source: 'insta_sentiment/chats/ChatBubbles.tsx',
    configurableProps: [
      { key: 'showHeader', label: 'Show Header', type: 'boolean', defaultValue: true },
      { key: 'showAvatar', label: 'Show Avatars', type: 'boolean', defaultValue: true },
      { key: 'showInput', label: 'Show Input', type: 'boolean', defaultValue: false },
      { key: 'showTimestamps', label: 'Show Timestamps', type: 'boolean', defaultValue: true },
    ],
  },
  {
    id: 'chatbot-support',
    displayName: 'Support Assistant',
    description:
      'AI-style assistant chat with streaming dots, markdown rendering, and action buttons.',
    source: 'custom',
    configurableProps: [
      { key: 'showHeader', label: 'Show Header', type: 'boolean', defaultValue: true },
      { key: 'showAvatar', label: 'Show Avatars', type: 'boolean', defaultValue: true },
      { key: 'showInput', label: 'Show Input', type: 'boolean', defaultValue: true },
      { key: 'showTimestamps', label: 'Show Timestamps', type: 'boolean', defaultValue: false },
    ],
  },
  {
    id: 'chatbot-presentation',
    displayName: 'Presentation AI Chat',
    description:
      'Full chat UI from Presentation AI with all original components: feedback buttons, web search, config popover, mic input, new chat, and streaming dots.',
    source: 'presentation-ai/PresentationInput.tsx + PresentationDashboard.tsx',
    configurableProps: [
      { key: 'showHeader', label: 'Show Header', type: 'boolean', defaultValue: true },
      { key: 'showAvatar', label: 'Show Avatars', type: 'boolean', defaultValue: true },
      { key: 'showInput', label: 'Show Input', type: 'boolean', defaultValue: true },
      { key: 'showTimestamps', label: 'Show Timestamps', type: 'boolean', defaultValue: false },
      { key: 'showMic', label: 'Mic (Voice Input)', type: 'boolean', defaultValue: true },
      { key: 'showFeedback', label: 'Feedback (Copy/Thumbs/Regen)', type: 'boolean', defaultValue: true },
      { key: 'showWebSearch', label: 'Web Search Toggle', type: 'boolean', defaultValue: true },
      { key: 'showNewChat', label: 'New Chat Button', type: 'boolean', defaultValue: true },
      { key: 'showConfigButton', label: 'Config Popover', type: 'boolean', defaultValue: true },
    ],
  },
]

export function getChatbotById(id: string): ChatbotEntry | undefined {
  return chatbotRegistry.find((c) => c.id === id)
}
