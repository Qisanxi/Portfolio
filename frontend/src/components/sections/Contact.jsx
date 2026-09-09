import { useState } from 'react'
import { Send, CheckCircle, Mail } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon, LinkedInIcon } from '../../lib/icons'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const GROUND_2 = '#1C1710'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')

  const headingRef = useScrollAnimation()
  const bodyRef = useScrollAnimation()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Something went wrong. Try emailing directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    background: GROUND_2,
    border: `1px solid ${focused === name ? 'rgba(196,145,63,0.5)' : 'rgba(196,145,63,0.1)'}`,
    color: TEXT,
    width: '100%',
    padding: '10px 13px',
    borderRadius: '8px',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
  })

  return (
    <section id="contact" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
            <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>07. contact</span>
          </div>
          <h2 style={{ color: TEXT, fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 12px' }}>
            Get in touch
          </h2>
          <p style={{ color: MUTED, fontSize: '14px', lineHeight: '1.6', margin: 0, maxWidth: '480px' }}>
            Open to entry-level roles, internships, and interesting projects.
          </p>
        </div>

        <div ref={bodyRef} className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>

          {/* Form */}
          <div>
            {success ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '32px 0', textAlign: 'center' }}>
                <CheckCircle size={36} color="#4ade80" />
                <div style={{ color: TEXT, fontWeight: 500 }}>Message sent!</div>
                <div style={{ color: MUTED, fontSize: '13px' }}>I'll get back to you soon.</div>
                <button onClick={() => setSuccess(false)} style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
                  Send another →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { name: 'name',  type: 'text',  placeholder: 'Your name' },
                    { name: 'email', type: 'email', placeholder: 'your@email.com' },
                  ].map(({ name, type, placeholder }) => (
                    <div key={name}>
                      <label style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)', marginBottom: '5px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{name}</label>
                      <input
                        name={name} type={type} value={form[name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(name)} onBlur={() => setFocused('')}
                        placeholder={placeholder}
                        style={inputStyle(name)}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)', marginBottom: '5px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    placeholder="What would you like to say?"
                    rows={4}
                    style={{ ...inputStyle('message'), resize: 'none' }}
                  />
                </div>

                {error && <p style={{ color: '#f87171', fontSize: '12px', fontFamily: 'var(--font-mono)', margin: 0 }}>{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    background: ACCENT, border: 'none', borderRadius: '8px',
                    padding: '11px', color: '#fff', fontSize: '13px', fontWeight: 500,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <Send size={14} />
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </div>
            )}
          </div>

          {/* Right — compact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Direct links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  icon: <Mail size={14} />,
                  label: 'Email',
                  value: 'sandeepkumarultra615615@gmail.com',
                  href: 'mailto:sandeepkumarultra615615@gmail.com',
                },
                {
                  icon: <GitHubIcon size={14} />,
                  label: 'GitHub',
                  value: 'github.com/Qisanxi',
                  href: 'https://github.com/Qisanxi',
                },
                {
                  icon: <LinkedInIcon size={14} />,
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/sandeep-qisanxi',
                  href: 'https://www.linkedin.com/in/sandeep-qisanxi',
                },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', borderRadius: '8px',
                    background: GROUND_2,
                    border: '1px solid rgba(196,145,63,0.1)',
                    textDecoration: 'none', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.1)' }}
                >
                  <span style={{ color: ACCENT }}>{icon}</span>
                  <div>
                    <div style={{ color: MUTED, fontSize: '10px', fontFamily: 'var(--font-mono)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ color: TEXT, fontSize: '12px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div style={{
              padding: '12px 14px', borderRadius: '8px',
              background: 'rgba(74,222,128,0.04)',
              border: '1px solid rgba(74,222,128,0.14)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}></span>
              <p style={{ color: '#86efac', fontSize: '12px', fontFamily: 'var(--font-mono)', lineHeight: '1.5', margin: 0 }}>
                Available for entry-level backend &amp; AI roles
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
