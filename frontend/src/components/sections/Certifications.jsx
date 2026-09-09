import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Award, ExternalLink } from 'lucide-react'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const GROUND_2 = '#1C1710'

const certs = [
  {
    name: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    date: '2026',
    color: '#4B9FE8',
    emoji: '🏛️',
    desc: '10-week global program on communication, structured problem-solving, and leadership frameworks.',
    link: null,
  },
  {
    name: 'Google Agentic Hackathon — Participant',
    issuer: 'Google Developers',
    date: '2026',
    color: '#7BC47A',
    emoji: '🤖',
    desc: 'Built AutoPost — a fully autonomous content agent using Google ADK and Gemini Flash.',
    link: 'https://github.com/Qisanxi/AutoPost',
  },
  {
    name: 'AMD AI DevMaster Hackathon — Recognition',
    issuer: 'AMD Developer Program',
    date: '2026',
    color: '#E07B54',
    emoji: '⚡',
    desc: 'Recognized for outstanding participation in the AMD AI DevMaster Hackathon.',
    link: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
  },
  {
    name: 'Prompt Engineering Research & Integration',
    issuer: 'Excelerate (Remote Internship)',
    date: '2026',
    color: '#C4913F',
    emoji: '🔬',
    desc: 'Certified completion of AI prompt engineering integration into backend workflows.',
    link: null,
  },
  {
    name: 'Mobile App Development',
    issuer: 'Excelerate (Remote Internship)',
    date: '2026',
    color: '#A887E8',
    emoji: '📱',
    desc: 'Completed Flutter mobile app state management architecture for a production client app.',
    link: null,
  },
]

function CertCard({ cert }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '14px',
        padding: '16px 18px',
        borderRadius: '10px',
        background: GROUND_2,
        border: '1px solid rgba(196,145,63,0.1)',
        transition: 'border-color 0.2s',
        alignItems: 'flex-start',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${cert.color}50` }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.1)' }}
    >
      {/* Icon */}
      <div style={{
        width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
        background: cert.color + '14',
        border: `1px solid ${cert.color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px',
      }}>
        {cert.emoji}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
          <h3 style={{ color: TEXT, fontSize: '13px', fontFamily: 'var(--font-serif)', fontWeight: 500, lineHeight: '1.4', margin: 0 }}>
            {cert.name}
          </h3>
          {cert.link && (
            <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: FAINT, flexShrink: 0, marginTop: '1px', transition: 'color 0.15s', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT }}
              onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ color: cert.color, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</span>
          <span style={{ color: FAINT, fontSize: '11px' }}>·</span>
          <span style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{cert.date}</span>
        </div>
        <p style={{ color: MUTED, fontSize: '12px', lineHeight: '1.6', margin: 0 }}>{cert.desc}</p>
      </div>
    </div>
  )
}

export default function Certifications() {
  const headingRef = useScrollAnimation()
  const listRef = useScrollAnimation()

  return (
    <section id="certifications" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
            <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>05. certifications</span>
          </div>
          <h2 style={{ color: TEXT, fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 10px' }}>
            Credentials &amp; recognition
          </h2>
          <p style={{ color: MUTED, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Programs completed, hackathons recognized, and certifications earned.
          </p>
        </div>

        <div ref={listRef} className="reveal-children" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {certs.map((cert) => <CertCard key={cert.name} cert={cert} />)}
        </div>

      </div>
    </section>
  )
}
