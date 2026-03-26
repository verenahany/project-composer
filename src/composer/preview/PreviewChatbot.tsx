/**
 * Preview chatbot — renders a chat UI variant inside the composer preview area.
 * Adapted from GoAI HAIVE ChatInterface and insta_sentiment ChatBubbles.
 * Uses composer CSS variables for theming.
 */

import type { FC } from 'react'
import { MessageCircle, Send, Bot, User, MicOff } from 'lucide-react'
import type { ChatbotConfig } from '../config/schema'

interface Props {
  chatbotConfig: ChatbotConfig
}

const DEMO_MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'Hello! How can I help you today?', time: '10:30' },
  { id: 2, role: 'user' as const, text: 'I need help with my account settings.', time: '10:31' },
  { id: 3, role: 'assistant' as const, text: 'Sure! I can help you with that. What would you like to change?', time: '10:31' },
  { id: 4, role: 'user' as const, text: 'I want to update my notification preferences.', time: '10:32' },
]

function HaiveChat({ chatbotConfig }: Props) {
  const { props } = chatbotConfig

  return (
    <div className="prev-chat prev-chat--haive">
      {props.showHeader && (
        <div className="prev-chat__header">
          <MessageCircle size={16} />
          <span>Chat</span>
        </div>
      )}
      <div className="prev-chat__messages">
        {DEMO_MESSAGES.map((msg) => (
          <div key={msg.id} className={`prev-chat__row prev-chat__row--${msg.role}`}>
            {props.showAvatar && (
              <span className={`prev-chat__avatar prev-chat__avatar--${msg.role}`}>
                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
              </span>
            )}
            <div className={`prev-chat__bubble prev-chat__bubble--${msg.role}`}>
              <p>{msg.text}</p>
              {props.showTimestamps && <span className="prev-chat__time">{msg.time}</span>}
            </div>
          </div>
        ))}
      </div>
      {props.showInput && (
        <div className="prev-chat__input-area">
          <input className="prev-chat__input" placeholder="Type a message..." readOnly />
          <button className="prev-chat__send"><Send size={14} /></button>
        </div>
      )}
    </div>
  )
}

function BubblesChat({ chatbotConfig }: Props) {
  const { props } = chatbotConfig

  const bubbleMessages = [
    { id: 1, sender: 'bot' as const, badge: 'IP', name: 'InstaPay', text: 'Welcome! How may I assist you?', time: '09:15' },
    { id: 2, sender: 'customer' as const, badge: 'CU', name: 'Customer', text: 'I have a question about my recent transaction.', time: '09:16' },
    { id: 3, sender: 'bot' as const, badge: 'IP', name: 'InstaPay', text: 'Of course! Let me look into that for you.', time: '09:16' },
    { id: 4, sender: 'agent' as const, badge: 'CC', name: 'CC Agent', text: 'I can see the transaction. Let me check the status.', time: '09:18' },
  ]

  return (
    <div className="prev-chat prev-chat--bubbles">
      {props.showHeader && (
        <div className="prev-chat__header">
          <MessageCircle size={16} />
          <span>Conversation</span>
        </div>
      )}
      <div className="prev-chat__messages">
        {bubbleMessages.map((msg) => (
          <div key={msg.id} className={`prev-chat__bubble-row prev-chat__bubble-row--${msg.sender}`}>
            {props.showAvatar && (
              <span className={`prev-chat__badge prev-chat__badge--${msg.sender}`}>{msg.badge}</span>
            )}
            <div className="prev-chat__bubble-content">
              <span className="prev-chat__sender">{msg.name}</span>
              <div className={`prev-chat__bubble prev-chat__bubble--${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
              {props.showTimestamps && <span className="prev-chat__time">{msg.time}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SupportChat({ chatbotConfig }: Props) {
  const { props } = chatbotConfig

  return (
    <div className="prev-chat prev-chat--support">
      {props.showHeader && (
        <div className="prev-chat__header">
          <Bot size={16} />
          <span>AI Assistant</span>
          <span className="prev-chat__status-dot" />
        </div>
      )}
      <div className="prev-chat__messages">
        {DEMO_MESSAGES.map((msg) => (
          <div key={msg.id} className={`prev-chat__row prev-chat__row--${msg.role}`}>
            {props.showAvatar && (
              <span className={`prev-chat__avatar prev-chat__avatar--${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
              </span>
            )}
            <div className={`prev-chat__bubble prev-chat__bubble--${msg.role}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div className="prev-chat__row prev-chat__row--assistant">
          {props.showAvatar && (
            <span className="prev-chat__avatar prev-chat__avatar--bot"><Bot size={14} /></span>
          )}
          <div className="prev-chat__bubble prev-chat__bubble--assistant prev-chat__bubble--typing">
            <span className="prev-chat__dots">
              <span /><span /><span />
            </span>
          </div>
        </div>
      </div>
      {props.showInput && (
        <div className="prev-chat__input-area">
          <input className="prev-chat__input" placeholder="Ask anything..." readOnly />
          <button className="prev-chat__send"><Send size={14} /></button>
        </div>
      )}
    </div>
  )
}

function PresentationChat({ chatbotConfig }: Props) {
  const { props } = chatbotConfig

  const presMessages = [
    { id: 1, role: 'assistant' as const, text: 'How can I help you today?' },
    { id: 2, role: 'user' as const, text: 'I need a presentation about AI trends in 2026.' },
    { id: 3, role: 'assistant' as const, text: "Great topic! I'll cover the latest developments in generative AI, autonomous agents, and multimodal models. How many slides would you like?" },
    { id: 4, role: 'user' as const, text: 'Around 12 slides, keep it concise.' },
  ]

  return (
    <div className="prev-chat prev-chat--presentation">
      {props.showHeader && (
        <div className="prev-chat__header">
          <Bot size={16} />
          <span>Presentation AI</span>
          <span className="prev-chat__status-dot" />
        </div>
      )}
      <div className="prev-chat__messages">
        {presMessages.map((msg) => (
          <div key={msg.id} className={`prev-chat__row prev-chat__row--${msg.role}`}>
            {props.showAvatar && (
              <span className={`prev-chat__avatar prev-chat__avatar--${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
              </span>
            )}
            <div className={`prev-chat__bubble prev-chat__bubble--${msg.role}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Streaming dots */}
        <div className="prev-chat__row prev-chat__row--assistant">
          {props.showAvatar && (
            <span className="prev-chat__avatar prev-chat__avatar--bot"><Bot size={14} /></span>
          )}
          <div className="prev-chat__bubble prev-chat__bubble--assistant prev-chat__bubble--typing">
            <span className="prev-chat__dots"><span /><span /><span /></span>
          </div>
        </div>
      </div>
      {props.showInput && (
        <div className="prev-chat__pres-input-bar">
          <textarea
            className="prev-chat__pres-textarea"
            placeholder="Message AI..."
            rows={1}
            readOnly
          />
          <div className="prev-chat__pres-actions">
            {props.showMic && (
              <button className="prev-chat__pres-mic" title="Voice input">
                <MicOff size={14} />
              </button>
            )}
            <button className="prev-chat__pres-send" title="Send">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const CHATBOT_COMPONENTS: Record<string, FC<Props>> = {
  'chatbot-haive': HaiveChat,
  'chatbot-bubbles': BubblesChat,
  'chatbot-support': SupportChat,
  'chatbot-presentation': PresentationChat,
}

export default function PreviewChatbot({ chatbotConfig }: Props) {
  const Component = CHATBOT_COMPONENTS[chatbotConfig.componentId] ?? HaiveChat
  return <Component chatbotConfig={chatbotConfig} />
}
