import type { ProjectConfig } from '../../config/schema'

export function buildChatbotComponent(config: ProjectConfig): string {
  const { componentId, props } = config.chatbot
  switch (componentId) {
    case 'chatbot-bubbles':
      return buildBubblesChat(props)
    case 'chatbot-support':
      return buildSupportChat(props)
    default:
      return buildHaiveChat(props)
  }
}

type ChatProps = ProjectConfig['chatbot']['props']

function buildHaiveChat(props: ChatProps): string {
  return `import { MessageCircle, Send, Bot, User } from 'lucide-react'

const MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'Hello! How can I help you today?', time: '10:30' },
  { id: 2, role: 'user' as const, text: 'I need help with my account settings.', time: '10:31' },
  { id: 3, role: 'assistant' as const, text: 'Sure! I can help you with that. What would you like to change?', time: '10:31' },
  { id: 4, role: 'user' as const, text: 'I want to update my notification preferences.', time: '10:32' },
]

export default function Chatbot() {
  return (
    <div className="chat chat--haive">
      ${props.showHeader ? `<div className="chat__header">
        <MessageCircle size={16} />
        <span>Chat</span>
      </div>` : ''}
      <div className="chat__messages">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className={\`chat__row chat__row--\${msg.role}\`}>
            ${props.showAvatar ? `<span className={\`chat__avatar chat__avatar--\${msg.role}\`}>
              {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
            </span>` : ''}
            <div className={\`chat__bubble chat__bubble--\${msg.role}\`}>
              <p>{msg.text}</p>
              ${props.showTimestamps ? '<span className="chat__time">{msg.time}</span>' : ''}
            </div>
          </div>
        ))}
      </div>
      ${props.showInput ? `<div className="chat__input-area">
        <input className="chat__input" placeholder="Type a message..." />
        <button className="chat__send"><Send size={14} /></button>
      </div>` : ''}
    </div>
  )
}
`
}

function buildBubblesChat(props: ChatProps): string {
  return `import { MessageCircle } from 'lucide-react'

const MESSAGES = [
  { id: 1, sender: 'bot' as const, badge: 'IP', name: 'InstaPay', text: 'Welcome! How may I assist you?', time: '09:15' },
  { id: 2, sender: 'customer' as const, badge: 'CU', name: 'Customer', text: 'I have a question about my recent transaction.', time: '09:16' },
  { id: 3, sender: 'bot' as const, badge: 'IP', name: 'InstaPay', text: 'Of course! Let me look into that for you.', time: '09:16' },
  { id: 4, sender: 'agent' as const, badge: 'CC', name: 'CC Agent', text: 'I can see the transaction. Let me check the status.', time: '09:18' },
]

export default function Chatbot() {
  return (
    <div className="chat chat--bubbles">
      ${props.showHeader ? `<div className="chat__header">
        <MessageCircle size={16} />
        <span>Conversation</span>
      </div>` : ''}
      <div className="chat__messages">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className={\`chat__bubble-row chat__bubble-row--\${msg.sender}\`}>
            ${props.showAvatar ? `<span className={\`chat__badge chat__badge--\${msg.sender}\`}>{msg.badge}</span>` : ''}
            <div className="chat__bubble-content">
              <span className="chat__sender">{msg.name}</span>
              <div className={\`chat__bubble chat__bubble--\${msg.sender}\`}>
                <p>{msg.text}</p>
              </div>
              ${props.showTimestamps ? '<span className="chat__time">{msg.time}</span>' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`
}

function buildSupportChat(props: ChatProps): string {
  return `import { Bot, User, Send } from 'lucide-react'

const MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'Hello! How can I help you today?', time: '10:30' },
  { id: 2, role: 'user' as const, text: 'I need help with my account settings.', time: '10:31' },
  { id: 3, role: 'assistant' as const, text: 'Sure! I can help you with that. What would you like to change?', time: '10:31' },
  { id: 4, role: 'user' as const, text: 'I want to update my notification preferences.', time: '10:32' },
]

export default function Chatbot() {
  return (
    <div className="chat chat--support">
      ${props.showHeader ? `<div className="chat__header">
        <Bot size={16} />
        <span>AI Assistant</span>
        <span className="chat__status-dot" />
      </div>` : ''}
      <div className="chat__messages">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className={\`chat__row chat__row--\${msg.role}\`}>
            ${props.showAvatar ? `<span className={\`chat__avatar chat__avatar--\${msg.role === 'assistant' ? 'bot' : 'user'}\`}>
              {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
            </span>` : ''}
            <div className={\`chat__bubble chat__bubble--\${msg.role}\`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div className="chat__row chat__row--assistant">
          ${props.showAvatar ? `<span className="chat__avatar chat__avatar--bot"><Bot size={14} /></span>` : ''}
          <div className="chat__bubble chat__bubble--assistant chat__bubble--typing">
            <span className="chat__dots">
              <span /><span /><span />
            </span>
          </div>
        </div>
      </div>
      ${props.showInput ? `<div className="chat__input-area">
        <input className="chat__input" placeholder="Ask anything..." />
        <button className="chat__send"><Send size={14} /></button>
      </div>` : ''}
    </div>
  )
}
`
}
