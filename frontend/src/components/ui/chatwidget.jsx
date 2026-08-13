import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Trash2 } from 'lucide-react'
import { useChat } from '../../hooks/useChat'

const widgetButtonStyle = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  zIndex: 100,
  width: '52px',
  height: '52px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
  transition: 'transform 0.2s, box-shadow 0.2s',
}

const panelStyle = {
  position: 'fixed',
  bottom: '88px',
  right: '24px',
  zIndex: 100,
  width: '360px',
  height: '500px',
  borderRadius: '16px',
  background: '#0f172a',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

const headerStyle = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(99,102,241,0.08)',
}

const messagesStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const inputRowStyle = {
  padding: '12px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  gap: '8px',
  alignItems: 'flex-end',
}

const inputStyle = {
  flex: 1,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '10px 12px',
  color: '#f8fafc',
  fontSize: '13px',
  outline: 'none',
  resize: 'none',
  maxHeight: '80px',
  fontFamily: 'inherit',
}

const sendButtonStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: '#6366f1',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'background 0.2s',
}

const userBubbleStyle = {
  alignSelf: 'flex-end',
  background: '#6366f1',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '12px 12px 2px 12px',
  fontSize: '13px',
  maxWidth: '80%',
  lineHeight: '1.5',
}

const botBubbleStyle = {
  alignSelf: 'flex-start',
  background: 'rgba(255,255,255,0.06)',
  color: '#cbd5e1',
  padding: '8px 12px',
  borderRadius: '12px 12px 12px 2px',
  fontSize: '13px',
  maxWidth: '85%',
  lineHeight: '1.5',
}

const dotStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: '#6366f1',
  display: 'inline-block',
  margin: '0 2px',
  animation: 'bounce 1.2s infinite ease-in-out',
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, sendMessage, clearMessages } = useChat()
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return
    setInput('')
    sendMessage(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .dot1 { animation-delay: 0s; }
        .dot2 { animation-delay: 0.2s; }
        .dot3 { animation-delay: 0.4s; }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {open && (
        <div style={panelStyle}>
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: 'monospace' }}>SK</div>
              <div>
                <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 500 }}>Sandeep's Assistant</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></div>
                  <span style={{ color: '#4ade80', fontSize: '11px', fontFamily: 'monospace' }}>online</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={clearMessages} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', display: 'flex', alignItems: 'center' }}>
                <Trash2 size={14} />
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', display: 'flex', alignItems: 'center' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="chat-messages" style={messagesStyle}>
            {messages.map((msg, i) => (
              <div key={i} style={msg.role === 'user' ? userBubbleStyle : botBubbleStyle}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={botBubbleStyle}>
                <span style={{ ...dotStyle }} className="dot1"></span>
                <span style={{ ...dotStyle }} className="dot2"></span>
                <span style={{ ...dotStyle }} className="dot3"></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={inputRowStyle}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              style={inputStyle}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} style={{ ...sendButtonStyle, opacity: loading || !input.trim() ? 0.5 : 1 }}>
              <Send size={15} color="#fff" />
            </button>
          </div>
        </div>
      )}

      <button
        style={widgetButtonStyle}
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.5)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.4)' }}
      >
        {open ? <X size={20} color="#fff" /> : <MessageCircle size={20} color="#fff" />}
      </button>
    </>
  )
}