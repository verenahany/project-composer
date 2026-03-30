import type { ProjectConfig } from '../../config/schema'

export function buildChatbotComponent(config: ProjectConfig): string {
  const { componentId, props } = config.chatbot
  switch (componentId) {
    case 'chatbot-bubbles':
      return buildBubblesChat(props)
    case 'chatbot-support':
      return buildSupportChat(props)
    case 'chatbot-presentation':
      return buildPresentationChat(props)
    default:
      return buildHaiveChat(props)
  }
}

type ChatProps = ProjectConfig['chatbot']['props']

function collectIcons(props: ChatProps, base: string[]): string {
  const icons = [...base]
  if (props.showMic) icons.push('Mic', 'MicOff')
  if (props.showFeedback) icons.push('Copy', 'ThumbsUp', 'ThumbsDown', 'RefreshCcw')
  if (props.showWebSearch) icons.push('Globe')
  if (props.showConfigButton) icons.push('Settings2')
  if (props.showNewChat) icons.push('MessageSquarePlus')
  return [...new Set(icons)].join(', ')
}

function needsState(props: ChatProps): boolean {
  return props.showMic || props.showFeedback || props.showWebSearch || props.showNewChat || props.showConfigButton || props.showInput
}

function buildFeedbackJsx(role: string): string {
  return `{${role} === 'user' && (
                <div className="pres-chat__actions pres-chat__actions--end">
                  <button className="pres-chat__action-btn" title="Copy"><Copy size={12} /></button>
                </div>
              )}
              {${role} === 'assistant' && (
                <div className="pres-chat__actions">
                  <button className="pres-chat__action-btn" title="Copy"><Copy size={12} /></button>
                  <button className="pres-chat__action-btn" title="Good response"><ThumbsUp size={12} /></button>
                  <button className="pres-chat__action-btn" title="Bad response"><ThumbsDown size={12} /></button>
                  <button className="pres-chat__action-btn" title="Regenerate"><RefreshCcw size={12} /></button>
                </div>
              )}`
}

function buildEnhancedInputBar(props: ChatProps, placeholder: string): string {
  const hasToolbar = props.showMic || props.showWebSearch || props.showNewChat || props.showConfigButton
  if (!hasToolbar) {
    return `<div className="chat__input-area">
        <input className="chat__input" placeholder="${placeholder}" />
        <button className="chat__send"><Send size={14} /></button>
      </div>`
  }
  return `<div className="pres-chat__input-wrap">
        <textarea
          className="pres-chat__textarea"
          placeholder="${placeholder}"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setInput('') } }}
        />
        <div className="pres-chat__toolbar">
          ${props.showConfigButton ? `<button
            className={\`pres-chat__tool-btn \${configOpen ? 'pres-chat__tool-btn--active' : ''}\`}
            title="Chat config"
            onClick={() => setConfigOpen(!configOpen)}
          >
            <Settings2 size={14} />
          </button>` : ''}
          ${props.showWebSearch ? `<button
            className={\`pres-chat__tool-btn pres-chat__tool-btn--web \${webSearchEnabled ? 'pres-chat__tool-btn--active' : ''}\`}
            title={webSearchEnabled ? 'Web search on (click to turn off)' : 'Web search off — click to enable'}
            onClick={() => setWebSearchEnabled(!webSearchEnabled)}
            aria-pressed={webSearchEnabled}
          >
            <Globe size={14} />
            <span>Web</span>
          </button>` : ''}
          <div className="pres-chat__toolbar-right">
            ${props.showNewChat ? `<button className="pres-chat__new-chat-btn"><MessageSquarePlus size={13} /><span>New chat</span></button>` : ''}
            ${props.showMic ? `<button
              className={\`pres-chat__circle-btn \${isListening ? 'pres-chat__circle-btn--active' : ''}\`}
              title={isListening ? 'Stop recording' : 'Voice input'}
              onClick={handleMicClick}
            >
              {isListening ? <Mic size={14} /> : <MicOff size={14} />}
            </button>` : ''}
            <button className="pres-chat__circle-btn" title="Send" onClick={() => setInput('')}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>`
}

function buildStateBlock(props: ChatProps): string {
  let s = `const [input, setInput] = useState('')\n`
  if (props.showWebSearch) s += `  const [webSearchEnabled, setWebSearchEnabled] = useState(false)\n`
  if (props.showConfigButton) s += `  const [configOpen, setConfigOpen] = useState(false)\n`
  if (props.showMic) s += `  ${MIC_STATE_BLOCK}\n`
  return s
}

function buildHaiveChat(props: ChatProps): string {
  const icons = collectIcons(props, ['MessageCircle', 'Send', 'Bot', 'User'])
  const hasState = needsState(props)
  return `${hasState ? `import { useState${props.showMic ? ', useRef, useEffect' : ''} } from 'react'\n` : ''}import { ${icons} } from 'lucide-react'

const MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'Hello! How can I help you today?', time: '10:30' },
  { id: 2, role: 'user' as const, text: 'I need help with my account settings.', time: '10:31' },
  { id: 3, role: 'assistant' as const, text: 'Sure! I can help you with that. What would you like to change?', time: '10:31' },
  { id: 4, role: 'user' as const, text: 'I want to update my notification preferences.', time: '10:32' },
]

export default function Chatbot() {
  ${hasState ? buildStateBlock(props) : ''}
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
            <div className="chat__bubble-wrap">
              <div className={\`chat__bubble chat__bubble--\${msg.role}\`}>
                <p>{msg.text}</p>
                ${props.showTimestamps ? '<span className="chat__time">{msg.time}</span>' : ''}
              </div>
              ${props.showFeedback ? buildFeedbackJsx('msg.role') : ''}
            </div>
          </div>
        ))}
      </div>
      ${props.showInput ? buildEnhancedInputBar(props, 'Type a message...') : ''}
    </div>
  )
}
`
}

function buildBubblesChat(props: ChatProps): string {
  const icons = collectIcons(props, ['MessageCircle', 'Send'])
  const hasState = needsState(props)
  return `${hasState ? `import { useState${props.showMic ? ', useRef, useEffect' : ''} } from 'react'\n` : ''}import { ${icons} } from 'lucide-react'

const MESSAGES = [
  { id: 1, sender: 'bot' as const, role: 'assistant' as const, badge: 'IP', name: 'InstaPay', text: 'Welcome! How may I assist you?', time: '09:15' },
  { id: 2, sender: 'customer' as const, role: 'user' as const, badge: 'CU', name: 'Customer', text: 'I have a question about my recent transaction.', time: '09:16' },
  { id: 3, sender: 'bot' as const, role: 'assistant' as const, badge: 'IP', name: 'InstaPay', text: 'Of course! Let me look into that for you.', time: '09:16' },
  { id: 4, sender: 'agent' as const, role: 'assistant' as const, badge: 'CC', name: 'CC Agent', text: 'I can see the transaction. Let me check the status.', time: '09:18' },
]

export default function Chatbot() {
  ${hasState ? buildStateBlock(props) : ''}
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
              ${props.showFeedback ? buildFeedbackJsx('msg.role') : ''}
            </div>
          </div>
        ))}
      </div>
      ${props.showInput ? buildEnhancedInputBar(props, 'Type a message...') : ''}
    </div>
  )
}
`
}

function buildPresentationChat(props: ChatProps): string {
  const icons = collectIcons(props, ['Bot', 'User', 'Send'])
  return `import { useState${props.showMic ? ', useRef, useEffect' : ''} } from 'react'
import { ${icons} } from 'lucide-react'

const MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'How can I help you today?' },
  { id: 2, role: 'user' as const, text: 'I need a presentation about AI trends in 2026.' },
  { id: 3, role: 'assistant' as const, text: "Great topic! I'll cover the latest developments in generative AI, autonomous agents, and multimodal models. How many slides would you like?" },
  { id: 4, role: 'user' as const, text: 'Around 12 slides, keep it concise.' },
]

export default function Chatbot() {
  ${buildStateBlock(props)}
  return (
    <div className="pres-chat">
      ${props.showHeader ? `<div className="pres-chat__header">
        <Bot size={18} />
        <span>Presentation AI</span>
        <span className="pres-chat__status-dot" />
      </div>` : ''}

      <div className="pres-chat__messages">
        {MESSAGES.map((msg) => (
          <div key={msg.id} className={\`pres-chat__msg pres-chat__msg--\${msg.role}\`}>
            ${props.showAvatar ? `<span className={\`pres-chat__avatar pres-chat__avatar--\${msg.role === 'assistant' ? 'bot' : 'user'}\`}>
              {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
            </span>` : ''}
            <div className={\`pres-chat__content pres-chat__content--\${msg.role}\`}>
              <div className={\`pres-chat__bubble pres-chat__bubble--\${msg.role}\`}>
                <p>{msg.text}</p>
              </div>
              ${props.showFeedback ? buildFeedbackJsx('msg.role') : ''}
            </div>
          </div>
        ))}

        <div className="pres-chat__msg pres-chat__msg--assistant">
          ${props.showAvatar ? `<span className="pres-chat__avatar pres-chat__avatar--bot"><Bot size={14} /></span>` : ''}
          <div className="pres-chat__content pres-chat__content--assistant">
            <div className="pres-chat__bubble pres-chat__bubble--assistant pres-chat__bubble--typing">
              <span className="pres-chat__dots"><span /><span /><span /></span>
            </div>
          </div>
        </div>
      </div>

      ${props.showInput ? buildEnhancedInputBar(props, 'Message Presentation AI...') : ''}
    </div>
  )
}
`
}

function buildSupportChat(props: ChatProps): string {
  const icons = collectIcons(props, ['Bot', 'User', 'Send'])
  const hasState = needsState(props)
  return `${hasState ? `import { useState${props.showMic ? ', useRef, useEffect' : ''} } from 'react'\n` : ''}import { ${icons} } from 'lucide-react'

const MESSAGES = [
  { id: 1, role: 'assistant' as const, text: 'Hello! How can I help you today?', time: '10:30' },
  { id: 2, role: 'user' as const, text: 'I need help with my account settings.', time: '10:31' },
  { id: 3, role: 'assistant' as const, text: 'Sure! I can help you with that. What would you like to change?', time: '10:31' },
  { id: 4, role: 'user' as const, text: 'I want to update my notification preferences.', time: '10:32' },
]

export default function Chatbot() {
  ${hasState ? buildStateBlock(props) : ''}
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
            <div className="chat__bubble-wrap">
              <div className={\`chat__bubble chat__bubble--\${msg.role}\`}>
                <p>{msg.text}</p>
              </div>
              ${props.showFeedback ? buildFeedbackJsx('msg.role') : ''}
            </div>
          </div>
        ))}
        <div className="chat__row chat__row--assistant">
          ${props.showAvatar ? `<span className="chat__avatar chat__avatar--bot"><Bot size={14} /></span>` : ''}
          <div className="chat__bubble chat__bubble--assistant chat__bubble--typing">
            <span className="chat__dots"><span /><span /><span /></span>
          </div>
        </div>
      </div>
      ${props.showInput ? buildEnhancedInputBar(props, 'Ask anything...') : ''}
    </div>
  )
}
`
}

const MIC_STATE_BLOCK = `const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<unknown>(null)
  const stoppedRef = useRef(false)

  const handleMicClick = () => {
    const W = window as Record<string, unknown>
    const Rec = (W.webkitSpeechRecognition ?? W.SpeechRecognition) as (new () => {
      lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number
      start(): void; stop(): void
      onstart: (() => void) | null; onend: (() => void) | null
      onresult: ((e: { results: SpeechRecognitionResultList }) => void) | null
      onerror: ((e: { error?: string }) => void) | null
    }) | undefined
    if (!Rec) { alert('Speech recognition not supported'); return }

    if (recognitionRef.current && isListening) {
      stoppedRef.current = true
      try { (recognitionRef.current as { stop(): void }).stop() } catch {}
      return
    }

    const rec = new Rec()
    recognitionRef.current = rec
    stoppedRef.current = false
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.continuous = true
    rec.onstart = () => setIsListening(true)
    rec.onresult = (e) => {
      if (stoppedRef.current) return
      const r = e.results
      if (!r || !r.length) return
      const t = r[r.length - 1]?.[0]?.transcript ?? ''
      if (t) setInput((prev) => (prev ? prev + ' ' : '') + t.trim())
    }
    rec.onerror = (e) => {
      if (e.error === 'aborted' || e.error === 'no-speech') return
      setIsListening(false); recognitionRef.current = null
    }
    rec.onend = () => {
      if (stoppedRef.current) { setIsListening(false); recognitionRef.current = null; return }
      try { rec.start() } catch {}
    }
    rec.start()
  }

  useEffect(() => { return () => { try { (recognitionRef.current as { stop(): void })?.stop?.() } catch {} } }, [])`
