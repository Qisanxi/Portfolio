const footerStyle = {
  borderTop: '1px solid rgba(255,255,255,0.06)',
}

const linkStyle = {
  color: '#64748b',
  fontSize: '12px',
  fontFamily: 'monospace',
  transition: 'color 0.2s',
}

export default function Footer() {
  return (
    <footer className="px-6 py-8" style={footerStyle}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-1">
          <span className="text-slate-500 font-mono text-sm">{'<'}</span>
          <span className="text-white font-bold font-mono text-sm">SK</span>
          <span className="text-indigo-400 font-mono text-sm">{'/>'}</span>
        </div>

        <p className="text-slate-600 text-xs font-mono text-center">
          Built with React, FastAPI, PostgreSQL and Gemini API
        </p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#f8fafc'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>GitHub</a>
          <span className="text-slate-700 font-mono text-xs">/</span>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#f8fafc'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>LinkedIn</a>
          <span className="text-slate-700 font-mono text-xs">/</span>
          <a href="mailto:your@email.com" style={linkStyle} onMouseEnter={(e) => e.target.style.color = '#f8fafc'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>Email</a>
        </div>

      </div>
    </footer>
  )
}