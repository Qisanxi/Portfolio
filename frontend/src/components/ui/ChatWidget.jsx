import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Trash2, ChevronDown } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../../hooks/useChat'

const ACCENT = '#C4913F'
const ACCENT_GLOW = 'rgba(196,145,63,0.35)'
const GROUND = '#1C1710'
const GROUND_2 = '#221A0F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'

const identityOptions = [
  { key: 'recruiter', label: 'Recruiter', emoji: '💼', desc: 'Hiring or evaluating candidates' },
  { key: 'student',   label: 'Fellow Dev', emoji: '🎓', desc: 'Student or developer learning' },
  { key: 'friend',    label: 'Connection',  emoji: '👋', desc: 'LinkedIn or other platforms' },
]

const thankyouMessages = {
  recruiter: "I will help you learn everything about Sandeep's experience, skills, and projects. You can also download his resume from the navbar.",
  student:   "Great to connect! Ask me about Sandeep's tech stack, AI projects, or his journey into LLM engineering.",
  friend:    "Welcome! Feel free to ask me anything about what Sandeep has been building lately.",
}

const markdownComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" style={{ color: '#DDB87A', textDecoration: 'underline', wordBreak: 'break-all' }}>
      {children}
    </a>
  ),
  p: ({ children }) => <p style={{ margin: '0 0 6px 0' }}>{children}</p>,
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState('welcome')
  const [selected, setSelected] = useState('')
  const [input, setInput] = useState('')
  const [peeked, setPeeked] = useState(false)
  const { messages, loading, sendMessage, clearMessages, initializeChat } = useChat()
  const bottomRef = useRef(null)

  // show a peek tooltip after 4s to nudge visitors
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setPeeked(true), 4000)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleIdentitySubmit = () => {
    if (!selected) return
    initializeChat(selected)
    setStep('thankyou')
  }

  const handleStartChat = () => setStep('chat')

  const handleClose = () => {
    setOpen(false)
    setPeeked(false)
    if (step === 'thankyou') setStep('chat')
  }

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

  const Header = () => (
    <div style={{
      padding: '12px 16px',
      borderBottom: `1px solid rgba(196,145,63,0.12)`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: GROUND_2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${ACCENT}, #A8762B)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 600, color: '#fff',
          fontFamily: 'var(--font-serif)',
          boxShadow: `0 0 12px ${ACCENT_GLOW}`,
        }}>SK</div>
        <div>
          <div style={{ color: TEXT, fontSize: '13px', fontWeight: 500 }}>Sandeep's Assistant</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></div>
            <span style={{ color: '#4ade80', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>online</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {step === 'chat' && (
          <button onClick={clearMessages} title="Clear chat" style={{ background: 'none', border: 'none', cursor: 'pointer', color: FAINT, display: 'flex', padding: '4px' }}>
            <Trash2 size={13} />
          </button>
        )}
        <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: FAINT, display: 'flex', padding: '4px' }}>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes chatRingPulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes chatPeekIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-dot-1 { animation: chatBounce 1.2s infinite ease-in-out; animation-delay: 0s; }
        .chat-dot-2 { animation: chatBounce 1.2s infinite ease-in-out; animation-delay: 0.2s; }
        .chat-dot-3 { animation: chatBounce 1.2s infinite ease-in-out; animation-delay: 0.4s; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(196,145,63,0.2); border-radius: 2px; }
        .bot-bubble p:last-child { margin-bottom: 0; }
        .chat-opt:hover { background: rgba(196,145,63,0.08) !important; border-color: rgba(196,145,63,0.3) !important; }
      `}</style>

      {/* Floating launcher */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100, display: 'flex', alignItems: 'flex-end', gap: '10px' }}>

        {/* Peek tooltip — shown after 4s if not yet opened */}
        {peeked && !open && (
          <div style={{
            animation: 'chatPeekIn 0.3s ease',
            background: GROUND_2,
            border: `1px solid rgba(196,145,63,0.2)`,
            borderRadius: '12px',
            padding: '10px 14px',
            maxWidth: '200px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <div style={{ color: TEXT, fontSize: '12px', fontWeight: 500, marginBottom: '3px' }}>Ask me anything 👋</div>
            <div style={{ color: MUTED, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>About Sandeep's work →</div>
            <button
              onClick={() => setPeeked(false)}
              style={{ position: 'absolute', top: '6px', right: '8px', background: 'none', border: 'none', color: FAINT, cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}
            >×</button>
          </div>
        )}

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          {/* Pulsing ring */}
          {!open && (
            <div style={{
              position: 'absolute', inset: '-4px',
              borderRadius: '50%',
              border: `2px solid ${ACCENT}`,
              animation: 'chatRingPulse 2.5s ease-out infinite',
              pointerEvents: 'none',
            }} />
          )}

          {/* Main button with label */}
          <button
            onClick={() => { setOpen(!open); setPeeked(false) }}
            style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${ACCENT} 0%, #A8762B 100%)`,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 20px ${ACCENT_GLOW}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = `0 6px 28px rgba(196,145,63,0.5)` }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${ACCENT_GLOW}` }}
            aria-label="Open chat assistant"
          >
            {open ? <X size={20} color="#fff" /> : <MessageCircle size={20} color="#fff" />}
          </button>

          {/* Label below button */}
          {!open && (
            <span style={{
              color: ACCENT,
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              background: GROUND,
              border: `1px solid rgba(196,145,63,0.2)`,
              borderRadius: '10px',
              padding: '2px 8px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
            }}>Ask me</span>
          )}
        </div>
      </div>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '90px', right: '16px',
          zIndex: 100,
          width: 'min(460px, calc(100vw - 32px))',
          borderRadius: '16px',
          background: GROUND,
          border: `1px solid rgba(196,145,63,0.14)`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 120px)',
        }}>
          <Header />

          {step === 'welcome' && (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
              <div>
                <div style={{ color: TEXT, fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
                  Welcome, Guest! 👋
                </div>
                <div style={{ color: MUTED, fontSize: '13px', lineHeight: '1.65' }}>
                  I am Sandeep's AI assistant. Tell me who you are so I can give you the most relevant information.
                </div>
              </div>

              <div style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Who are you?
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {identityOptions.map((opt) => (
                  <button
                    key={opt.key}
                    className="chat-opt"
                    onClick={() => setSelected(opt.key)}
                    style={{
                      width: '100%',
                      background: selected === opt.key ? 'rgba(196,145,63,0.1)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${selected === opt.key ? 'rgba(196,145,63,0.4)' : 'rgba(237,228,207,0.08)'}`,
                      borderRadius: '10px',
                      padding: '11px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s',
                      display: 'flex', alignItems: 'center', gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{opt.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: TEXT, fontSize: '13px', fontWeight: 500 }}>{opt.label}</div>
                      <div style={{ color: FAINT, fontSize: '11px', marginTop: '2px' }}>{opt.desc}</div>
                    </div>
                    {selected === opt.key && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={handleIdentitySubmit}
                disabled={!selected}
                style={{
                  width: '100%',
                  background: selected ? ACCENT : 'rgba(196,145,63,0.25)',
                  border: 'none', borderRadius: '10px',
                  padding: '11px', color: '#fff', fontSize: '13px', fontWeight: 500,
                  cursor: selected ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Continue →
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: FAINT, fontSize: '11px', cursor: 'pointer', fontFamily: 'var(--font-mono)', textAlign: 'center' }}
              >
                Skip — explore manually
              </button>
            </div>
          )}

          {step === 'thankyou' && (
            <div style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '44px' }}>{identityOptions.find((o) => o.key === selected)?.emoji}</div>
              <div>
                <div style={{ color: TEXT, fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Thank you!</div>
                <div style={{ color: MUTED, fontSize: '13px', lineHeight: '1.7' }}>{thankyouMessages[selected]}</div>
              </div>
              <div style={{
                background: 'rgba(196,145,63,0.07)',
                border: '1px solid rgba(196,145,63,0.18)',
                borderRadius: '10px', padding: '12px', width: '100%',
              }}>
                <div style={{ color: '#DDB87A', fontSize: '12px', lineHeight: '1.65', fontFamily: 'var(--font-mono)' }}>
                  Ask me about projects, stack, experience, or anything else.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={handleStartChat}
                  style={{ flex: 1, background: ACCENT, border: 'none', borderRadius: '10px', padding: '11px', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                >
                  Start chatting
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(237,228,207,0.08)', borderRadius: '10px', padding: '11px', color: MUTED, fontSize: '13px', cursor: 'pointer' }}
                >
                  Explore myself
                </button>
              </div>
            </div>
          )}

          {step === 'chat' && (
            <>
              <div style={{
                padding: '7px 14px',
                borderBottom: '1px solid rgba(196,145,63,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.15)',
              }}>
                <span style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)' }}>Ask me anything about Sandeep</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['projects', 'stack', 'resume'].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        background: 'rgba(196,145,63,0.08)',
                        border: '1px solid rgba(196,145,63,0.15)',
                        borderRadius: '5px', padding: '2px 8px',
                        color: MUTED, fontSize: '10px', fontFamily: 'var(--font-mono)', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.4)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.15)' }}
                    >{q}</button>
                  ))}
                </div>
              </div>

              <div
                className="chat-scroll"
                style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px' }}
              >
                {messages.map((msg, i) =>
                  msg.role === 'user' ? (
                    <div key={i} style={{
                      alignSelf: 'flex-end', background: ACCENT, color: '#fff',
                      padding: '8px 12px', borderRadius: '12px 12px 2px 12px',
                      fontSize: '13px', maxWidth: '80%', lineHeight: '1.5',
                    }}>{msg.content}</div>
                  ) : (
                    <div key={i} className="bot-bubble" style={{
                      alignSelf: 'flex-start', background: GROUND_2, color: '#cdc3ae',
                      border: '1px solid rgba(196,145,63,0.1)',
                      padding: '8px 12px', borderRadius: '12px 12px 12px 2px',
                      fontSize: '13px', maxWidth: '85%', lineHeight: '1.55',
                    }}>
                      <ReactMarkdown components={markdownComponents}>{msg.content}</ReactMarkdown>
                    </div>
                  )
                )}
                {loading && (
                  <div style={{
                    alignSelf: 'flex-start', background: GROUND_2, border: '1px solid rgba(196,145,63,0.1)',
                    padding: '10px 14px', borderRadius: '12px 12px 12px 2px', display: 'flex', gap: '4px', alignItems: 'center',
                  }}>
                    {[1,2,3].map((n) => (
                      <span key={n} className={`chat-dot-${n}`} style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
                    ))}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(196,145,63,0.08)', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  style={{
                    flex: 1,
                    background: GROUND_2,
                    border: '1px solid rgba(196,145,63,0.12)',
                    borderRadius: '10px',
                    padding: '9px 12px',
                    color: TEXT,
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none',
                    maxHeight: '80px',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: ACCENT, border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, opacity: loading || !input.trim() ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <Send size={14} color="#fff" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
