import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon, LinkedInIcon } from '../../lib/icons'
import Button from '../ui/Button'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f8fafc',
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
}

const inputFocusStyle = { borderColor: 'rgba(99,102,241,0.6)' }

const cardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const socialLinkStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState('')

  const headingRef = useScrollAnimation()
  const formRef = useScrollAnimation()
  const infoRef = useScrollAnimation()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
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

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-indigo-400"></div>
            <span className="text-indigo-400 text-sm font-mono">05. contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in touch</h2>
          <p className="text-slate-400 max-w-xl">
            Open to entry-level roles, internships, and interesting projects. Drop a message or reach out directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Form */}
          <div ref={formRef} className="reveal flex flex-col gap-4">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <CheckCircle size={40} className="text-green-400" />
                <div className="text-white font-medium">Message sent!</div>
                <div className="text-slate-400 text-sm text-center">
                  Thanks for reaching out. I will get back to you soon.
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-indigo-400 text-sm font-mono mt-2 hover:text-indigo-300 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                {[
                  { name: 'name', label: 'name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'email', type: 'email', placeholder: 'your@email.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="text-slate-500 text-xs font-mono mb-2 block">{label}</label>
                    <input
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(name)}
                      onBlur={() => setFocused('')}
                      placeholder={placeholder}
                      style={{ ...inputStyle, ...(focused === name ? inputFocusStyle : {}) }}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-slate-500 text-xs font-mono mb-2 block">message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    placeholder="What would you like to say?"
                    rows={5}
                    style={{ ...inputStyle, ...(focused === 'message' ? inputFocusStyle : {}), resize: 'none' }}
                  />
                </div>

                {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

                <Button onClick={handleSubmit} disabled={loading}>
                  <Send size={15} />
                  {loading ? 'Sending...' : 'Send message'}
                </Button>
              </>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="reveal flex flex-col gap-6">
            <div className="rounded-xl p-6" style={cardStyle}>
              <div className="flex items-center gap-3 mb-3">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-white text-sm font-medium">Email</span>
              </div>
              <a
                href="mailto:sandeepkumarultra615615@gmail.com"
                className="text-slate-400 text-sm hover:text-indigo-400 transition-colors font-mono break-all"
              >
                sandeepkumarultra615615@gmail.com
              </a>
            </div>

            <div className="rounded-xl p-6" style={cardStyle}>
              <div className="text-slate-500 text-xs font-mono mb-4 uppercase tracking-widest">Elsewhere</div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/Qisanxi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  style={socialLinkStyle}
                >
                  <span className="text-slate-400"><GitHubIcon size={18} /></span>
                  <span className="text-slate-400 text-sm font-mono">github.com/Qisanxi</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sandeep-qisanxi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  style={socialLinkStyle}
                >
                  <span className="text-slate-400"><LinkedInIcon size={18} /></span>
                  <span className="text-slate-400 text-sm font-mono">linkedin.com/in/sandeep-qisanxi</span>
                </a>
              </div>
            </div>

            <div
              className="rounded-xl p-6"
              style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs font-mono">available now</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seeking entry-level roles in backend development and AI engineering.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
