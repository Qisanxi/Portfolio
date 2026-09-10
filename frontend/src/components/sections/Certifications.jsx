import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { ArrowUpRight } from 'lucide-react'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const GROUND_2 = '#1C1710'

const certs = [
  {
    name: 'Oracle Certified Foundations Associate — Agentic AI',
    issuer: 'Oracle',
    date: '2026',
    color: '#4B9FE8',
    emoji: '🤖',
    desc: ' Demonstrates foundational competency in building AI agents, tool-use patterns, multi-agent orchestration, and responsible deployment of agentic workflows in enterprise contexts.',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=5CDE9B9642646AB097F37F9A7E938FF87D28F19322ACAE87935D0FA09694CD86',
  },
  {
    name: 'Docker Essentials: A Developer Introduction',
    issuer: 'IBM',
    date: '2026',
    color: '#7BC47A',
    emoji: '📱',
    desc: 'Earned IBMs foundational Docker badge through hands-on labs covering containerization conceptsbuilding and managing Docker images, running containers',
    link: 'https://www.credly.com/badges/16089a25-afa0-48b2-b1a3-4f7018cbf2f6/linked_in_profile',
  },
  {
    name: 'Authentication & Authorization for Web/API',
    issuer: 'The Linux Foundation',
    date: '2026',
    color: '#E07B54',
    emoji: '🌐',
    desc: 'Learned OAuth 2.0, OpenID Connect (OIDC), JWT tokens, API keys, role-based access control (RBAC), and security best practices for modern web services. Essential knowledge for building secure backends and REST APIs in production',
    link: 'https://www.credly.com/badges/4b93492c-332c-403e-898b-761a4290260c/linked_in_profile',
  },
  {
    name: 'OpenAPI Fundamentals',
    issuer: 'The Linux Foundation',
    date: '2026',
    color: '#C4913F',
    emoji: '🐧',
    desc: 'Certified completion of AI prompt engineering integration into backend workflows.',
    link: 'https://www.credly.com/badges/4b93492c-332c-403e-898b-761a4290260c/linked_in_profile',
  },
  {
    name: 'AI Upskilling Certificate: Hands-On Development from Model to App',
    issuer: 'Qualcomm',
    date: '2026',
    color: '#A887E8',
    emoji: '🖥️',
    desc: 'covering the full pipeline from training and optimizing AI models to deploying them as real-world applications on embedded and edge hardware. ',
    link: 'https://www.credly.com/badges/0801babd-685a-45e1-8c50-1d8bccd857ac/linked_in_profile',
  },
    {
    name: 'McKinsey.org Forward Program',
    issuer: 'McKinsey.org ',
    date: '2026',
    color: '#A887E8',
    emoji: '📃',
    desc: 'Successfully completed McKinsey Forward online learning program, gaining practical skills for the future of work',
    link: 'https://www.credly.com/badges/90bc725c-d7f2-4f2a-a6ab-7136b0691a7e/linked_in_profile',
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
        <div style={{ marginBottom: '4px' }}>
          <h3 style={{ color: TEXT, fontSize: '13px', fontFamily: 'var(--font-serif)', fontWeight: 500, lineHeight: '1.4', margin: 0 }}>
            {cert.name}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ color: cert.color, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</span>
          <span style={{ color: FAINT, fontSize: '11px' }}>·</span>
          <span style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{cert.date}</span>
        </div>
        <p style={{ color: MUTED, fontSize: '12px', lineHeight: '1.6', margin: '0 0 10px' }}>{cert.desc}</p>

        {/* Verify button — replaces the small ExternalLink icon.
            More visible to recruiters, clearer that it leads to the official badge. */}
        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '11px', fontFamily: 'var(--font-mono)',
              color: ACCENT,
              background: 'rgba(196,145,63,0.06)',
              border: '1px solid rgba(196,145,63,0.25)',
              borderRadius: '6px',
              padding: '4px 10px',
              textDecoration: 'none',
              transition: 'all 0.18s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.12)'; e.currentTarget.style.borderColor = ACCENT }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.06)'; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.25)' }}
          >
            Verify
            <ArrowUpRight size={11} />
          </a>
        )}
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
