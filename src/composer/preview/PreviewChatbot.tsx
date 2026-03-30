/**
 * Preview chatbot — renders a chat UI variant inside the composer preview area.
 * Adapted from GoAI HAIVE ChatInterface and insta_sentiment ChatBubbles.
 * Uses composer CSS variables for theming.
 */

import type { FC } from 'react'
import {
  MessageCircle, Send, Bot, User, MicOff,
  Copy, ThumbsUp, ThumbsDown, RefreshCcw,
  Globe, Settings2, MessageSquarePlus,
} from 'lucide-react'
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
    <div className="pres-chat">
      {props.showHeader && (
        <div className="prev-chat__header">
          <Bot size={16} />
          <span>Presentation AI</span>
          <span className="prev-chat__status-dot" />
        </div>
      )}

      {/* Messages area — faithful to PresentationDashboard */}
      <div className="pres-chat__messages">
        {presMessages.map((msg) => (
          <div
            key={msg.id}
            className={`pres-chat__msg ${msg.role === 'user' ? 'pres-chat__msg--user' : 'pres-chat__msg--assistant'}`}
          >
            {props.showAvatar && (
              <span className={`pres-chat__avatar ${msg.role === 'user' ? 'pres-chat__avatar--user' : 'pres-chat__avatar--bot'}`}>
                {msg.role === 'assistant' ? <Bot size={13} /> : <User size={13} />}
              </span>
            )}
            <div className={`pres-chat__content ${msg.role === 'user' ? 'pres-chat__content--user' : 'pres-chat__content--assistant'}`}>
              <div className={`pres-chat__bubble ${msg.role === 'user' ? 'pres-chat__bubble--user' : 'pres-chat__bubble--assistant'}`}>
                <p>{msg.text}</p>
              </div>
              {/* Feedback actions on messages — from PresentationDashboard */}
              {props.showFeedback && msg.role === 'user' && (
                <div className="pres-chat__actions pres-chat__actions--end">
                  <button className="pres-chat__action-btn" title="Copy"><Copy size={11} /></button>
                </div>
              )}
              {props.showFeedback && msg.role === 'assistant' && (
                <div className="pres-chat__actions">
                  <button className="pres-chat__action-btn" title="Copy"><Copy size={11} /></button>
                  <button className="pres-chat__action-btn" title="Good response"><ThumbsUp size={11} /></button>
                  <button className="pres-chat__action-btn" title="Bad response"><ThumbsDown size={11} /></button>
                  <button className="pres-chat__action-btn" title="Regenerate"><RefreshCcw size={11} /></button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming dots — typing indicator */}
        <div className="pres-chat__msg pres-chat__msg--assistant">
          {props.showAvatar && (
            <span className="pres-chat__avatar pres-chat__avatar--bot"><Bot size={13} /></span>
          )}
          <div className="pres-chat__content pres-chat__content--assistant">
            <div className="pres-chat__bubble pres-chat__bubble--assistant pres-chat__bubble--typing">
              <span className="pres-chat__dots"><span /><span /><span /></span>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar — faithful to PresentationInput (minimalChatInput mode) */}
      {props.showInput && (
        <div className="pres-chat__input-wrap">
          <textarea
            className="pres-chat__textarea"
            placeholder="Message Presentation AI..."
            rows={1}
            readOnly
          />
          <div className="pres-chat__toolbar">
            {props.showConfigButton && (
              <button className="pres-chat__tool-btn" title="Chat config">
                <Settings2 size={13} />
              </button>
            )}
            {props.showWebSearch && (
              <button className="pres-chat__tool-btn pres-chat__tool-btn--web" title="Web search">
                <Globe size={13} />
                <span>Web</span>
              </button>
            )}
            <div className="pres-chat__toolbar-right">
              {props.showNewChat && (
                <button className="pres-chat__new-chat-btn" title="New chat">
                  <MessageSquarePlus size={12} />
                  <span>New chat</span>
                </button>
              )}
              {props.showMic && (
                <button className="pres-chat__circle-btn" title="Voice input">
                  <MicOff size={13} />
                </button>
              )}
              <button className="pres-chat__circle-btn" title="Send">
                <Send size={13} />
              </button>
            </div>
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
