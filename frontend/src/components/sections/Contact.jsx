import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
      if (!res.ok) throw new Error('Failed to send')
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Try emailing directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-400"></div>
          <span className="text-indigo-400 text-sm font-mono">05. contact</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in touch</h2>
        <p className="text-slate-400 mb-12 max-w-xl">Open to internships, collaborations, and interesting projects. Drop a message or reach out directly.</p>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="flex flex-col gap-4">
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <CheckCircle size={40} className="text-green-400" />
                <div className="text-white font-medium">Message sent!</div>
                <div className="text-slate-400 text-sm text-center">Thanks for reaching out. I will get back to you soon.</div>
                <button onClick={() => setSuccess(false)} className="text-indigo-400 text-sm font-mono mt-2">Send another</button>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-slate-500 text-xs font-mono mb-2 block">name</label>
                  <input name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Your name" style={{ ...inputStyle, ...(focused === 'name' ? inputFocusStyle : {}) }} />
                </div>
                <div>
                  <label className="text-slate-500 text-xs font-mono mb-2 block">email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="your@email.com" style={{ ...inputStyle, ...(focused === 'email' ? inputFocusStyle : {}) }} />
                </div>
                <div>
                  <label className="text-slate-500 text-xs font-mono mb-2 block">message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} placeholder="What would you like to say?" rows={5} style={{ ...inputStyle, ...(focused === 'message' ? inputFocusStyle : {}), resize: 'none' }} />
                </div>

                {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

                <button onClick={handleSubmit} disabled={loading} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all duration-200">
                  <Send size={15} />
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl p-6" style={cardStyle}>
              <div className="flex items-center gap-3 mb-3">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-white text-sm font-medium">Email</span>
              </div>
              <a href="mailto:your@email.com" className="text-slate-400 text-sm hover:text-indigo-400 transition-colors font-mono">your@email.com</a>
            </div>

            <div className="rounded-xl p-6" style={cardStyle}>
              <div className="text-slate-500 text-xs font-mono mb-4 uppercase tracking-widest">Elsewhere</div>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg transition-all" style={socialLinkStyle}>
                  <GitHubIcon />
                  <span className="text-slate-400 text-sm font-mono">github.com/Qisanxi</span>
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg transition-all" style={socialLinkStyle}>
                  <LinkedInIcon />
                  <span className="text-slate-400 text-sm font-mono">linkedin.com/in/yourprofile</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl p-6" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs font-mono">available now</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Open to internship and collaboration opportunities in backend development and AI engineering.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}