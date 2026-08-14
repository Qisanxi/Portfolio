import { useState, useRef, useEffect } from 'react'
import { X, Send, MessageCircle, Trash2 } from 'lucide-react'
import { useChat } from '../../hooks/useChat'

const identityOptions = [
  { key: 'recruiter', label: 'Recruiter', emoji: '💼', desc: 'Hiring or evaluating candidates' },
  { key: 'student', label: 'Fellow Student', emoji: '🎓', desc: 'Student or developer learning' },
  { key: 'friend', label: 'Friend / Connection', emoji: '👋', desc: 'LinkedIn or other platforms' },
]

const thankyouMessages = {
  recruiter: "I will help you learn everything about Sandeep's experience, skills, and projects. You can also download his resume from the navbar.",
  student: "Always great to connect with fellow students! Ask me about Sandeep's tech stack, projects, or his journey into AI engineering.",
  friend: "Great to have you here! Feel free to ask me anything about what Sandeep has been building lately.",
}

const styles = {
  button: {
    position: 'fixed', bottom: '24px', right: '24px', zIndex: 100,
    width: '52px', height: '52px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    border: 'none', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  panel: {
    position: 'fixed', bottom: '88px', right: '24px', zIndex: 100,
    width: '360px', borderRadius: '16px', background: '#0f172a',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
  header: {
    padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(99,102,241,0.08)',
  },
  avatar: {
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: 600, color: '#fff', fontFamily: 'monospace',
  },
  iconBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#64748b', padding: '4px', display: 'flex', alignItems: 'center',
  },
  messages: {
    flex: 1, overflowY: 'auto', padding: '16px',
    display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px',
  },
  inputRow: {
    padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', gap: '8px', alignItems: 'flex-end',
  },
  input: {
    flex: 1, background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '10px 12px', color: '#f8fafc', fontSize: '13px',
    outline: 'none', resize: 'none', maxHeight: '80px', fontFamily: 'inherit',
  },
  sendBtn: {
    width: '38px', height: '38px', borderRadius: '10px',
    background: '#6366f1', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'background 0.2s',
  },
  userBubble: {
    alignSelf: 'flex-end', background: '#6366f1', color: '#fff',
    padding: '8px 12px', borderRadius: '12px 12px 2px 12px',
    fontSize: '13px', maxWidth: '80%', lineHeight: '1.5',
  },
  botBubble: {
    alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1',
    padding: '8px 12px', borderRadius: '12px 12px 12px 2px',
    fontSize: '13px', maxWidth: '85%', lineHeight: '1.5',
  },
  dot: {
    width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1',
    display: 'inline-block', margin: '0 2px', animation: 'bounce 1.2s infinite ease-in-out',
  },
  optionBtn: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    padding: '12px', cursor: 'pointer', textAlign: 'left',
    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px',
  },
  optionBtnSelected: {
    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.5)',
  },
  submitBtn: {
    width: '100%', background: '#6366f1', border: 'none', borderRadius: '10px',
    padding: '11px', color: '#fff', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s',
  },
  submitBtnDisabled: {
    background: 'rgba(99,102,241,0.3)', cursor: 'not-allowed',
  },
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 99,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  },
  panelCentered: {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100, width: '420px', borderRadius: '16px',
    background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState('welcome')
  const [selected, setSelected] = useState('')
  const [input, setInput] = useState('')
  const { messages, loading, sendMessage, clearMessages, initializeChat } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000)
    return () => clearTimeout(timer)
  }, [])

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
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={styles.avatar}>SK</div>
        <div>
          <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 500 }}>Sandeep's Assistant</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></div>
            <span style={{ color: '#4ade80', fontSize: '11px', fontFamily: 'monospace' }}>online</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {step === 'chat' && (
          <button onClick={clearMessages} style={styles.iconBtn}><Trash2 size={14} /></button>
        )}
        <button onClick={handleClose} style={styles.iconBtn}><X size={16} /></button>
      </div>
    </div>
  )

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
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {open && (
        <>
          <div style={styles.backdrop} />


          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100, width: '460px',
            height: step === 'chat' ? '560px' : 'auto',
            borderRadius: '16px', background: '#0f172a',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <Header />

            {step === 'welcome' && (
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>Welcome, Guest! 👋</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' }}>
                    Before we chat, help me personalize your experience. I am Sandeep's AI assistant and I am here to help you learn more about him.
                  </div>
                </div>
                <div style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  How do you identify yourself?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {identityOptions.map((opt) => (
                    <button key={opt.key} onClick={() => setSelected(opt.key)} style={{ ...styles.optionBtn, ...(selected === opt.key ? styles.optionBtnSelected : {}) }}>
                      <span style={{ fontSize: '22px' }}>{opt.emoji}</span>
                      <div>
                        <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 500 }}>{opt.label}</div>
                        <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{opt.desc}</div>
                      </div>
                      {selected === opt.key && (
                        <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }}></div>
                      )}
                    </button>
                  ))}
                </div>
                <button onClick={handleIdentitySubmit} disabled={!selected} style={{ ...styles.submitBtn, ...(selected ? {} : styles.submitBtnDisabled) }}>
                  Continue
                </button>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#475569', fontSize: '12px', cursor: 'pointer', textAlign: 'center', fontFamily: 'monospace' }}>
                  Skip and explore manually
                </button>
              </div>
            )}

            {step === 'thankyou' && (
              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px' }}>{identityOptions.find((o) => o.key === selected)?.emoji}</div>
                <div>
                  <div style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>Thank you!</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.7' }}>{thankyouMessages[selected]}</div>
                </div>
                <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '14px', width: '100%' }}>
                  <div style={{ color: '#818cf8', fontSize: '12px', lineHeight: '1.7', fontFamily: 'monospace' }}>
                    You can chat with me to know more about Sandeep, or explore the portfolio yourself.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button onClick={handleStartChat} style={{ ...styles.submitBtn, marginTop: 0, flex: 1 }}>Start chatting</button>
                  <button onClick={() => setOpen(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '11px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                    Explore myself
                  </button>
                </div>
              </div>
            )}

            {step === 'chat' && (
              <>
                <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
                  <span style={{ color: '#475569', fontSize: '11px', fontFamily: 'monospace' }}>Ask me anything about Sandeep</span>
                  <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 10px', color: '#94a3b8', fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace' }}>
                    Exit interface
                  </button>
                </div>
                <div className="chat-scroll" style={styles.messages}>
                  {messages.map((msg, i) => (
                    <div key={i} style={msg.role === 'user' ? styles.userBubble : styles.botBubble}>{msg.content}</div>
                  ))}
                  {loading && (
                    <div style={styles.botBubble}>
                      <span style={styles.dot} className="dot1"></span>
                      <span style={styles.dot} className="dot2"></span>
                      <span style={styles.dot} className="dot3"></span>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
                <div style={styles.inputRow}>
                  <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything..." rows={1} style={styles.input} />
                  <button onClick={handleSend} disabled={loading || !input.trim()} style={{ ...styles.sendBtn, opacity: loading || !input.trim() ? 0.5 : 1 }}>
                    <Send size={15} color="#fff" />
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <button
        style={styles.button}
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.5)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.4)' }}
      >
        {open ? <X size={20} color="#fff" /> : <MessageCircle size={20} color="#fff" />}
      </button>
    </>
  )
}