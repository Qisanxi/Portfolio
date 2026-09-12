import { GitHubIcon, LinkedInIcon } from '../../lib/icons'

const ACCENT = '#C4913F'
const FAINT = '#5C5446'
const MUTED = '#9A8E78'
const TEXT = '#EDE4CF'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(196,145,63,0.1)', padding: '28px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ color: FAINT, fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{'<'}</span>
          <span style={{ color: TEXT, fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 600 }}>SK</span>
          <span style={{ color: ACCENT, fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{'/>'}</span>
        </div>

        <p style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)', textAlign: 'center', margin: 0 }}>
          Built with React · FastAPI · PostgreSQL · Google GenAI SDK · TailwindCSS
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" style={{ color: FAINT, transition: 'color 0.2s', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
            onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
          ><GitHubIcon size={16} /></a>
          <a href="https://www.linkedin.com/in/sandeep-qisanxi" target="_blank" rel="noreferrer" style={{ color: FAINT, transition: 'color 0.2s', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
            onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
          ><LinkedInIcon size={16} /></a>
          <a href="mailto:sandeepkumarultra615615@gmail.com" style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)', transition: 'color 0.2s', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = MUTED }}
            onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
          >Email</a>
        </div>

      </div>
    </footer>
  )
}
