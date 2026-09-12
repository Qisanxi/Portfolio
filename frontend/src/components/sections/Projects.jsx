import { useState, useEffect } from 'react'
import { ExternalLink} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon } from '../../lib/icons'
import Badge from '../ui/Badge'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const CARD_BG = '#1C1710'

const projects = [
  {
    title: 'DueAlert',
    description: 'AI-powered fee collection and student payment tracking platform for coaching centres. Identifies payment-risk patterns, generates personalised reminders with Gemini, and monitors collection from a centralised dashboard.',
    tags: ['Python', 'FastAPI', 'React.js', 'Google GenAI SDK', 'Firebase'],
    github: 'https://github.com/Qisanxi/DueAlert',
    demo: 'https://duealert-bbb61.web.app',
    badge: 'Gemini XPrize Hackathon',
    badgeColor: '#C4913F',
    folder: 'DueAlert',
    images: ['duealert1.png','duealert2.png','duealert3.png','duealert4.png','duealert5.png','duealert6.png'],
    hasPhone: true,
    // duealert_mobile.png — generated mobile mockup of WhatsApp-style fee reminder chat
    phoneImage: 'duealert_mobile.png',
  },
  {
    title: 'AutoPost',
    description: 'Fully autonomous content agent. Point it at GitHub, it finds what is worth talking about, writes the post, and ships it to LinkedIn and Dev.to — without touching a keyboard after setup.',
    tags: ['Python', 'FastAPI', 'Google Gemini Flash', 'Google ADK', 'React', 'Vite'],
    github: 'https://github.com/Qisanxi/AutoPost',
    demo: 'https://autopost-9c37c.web.app/#/',
    badge: 'Google Agentic Hackathon',
    badgeColor: '#4285f4',
    folder: 'AutoPost',
    images: ['Autopost1.png','Autopost2.png','Autopost4.png','Autopost5.png','Autopost6.png'],
    hasPhone: true,
    // autopost_mobile.png — generated mobile mockup of agent dashboard
    phoneImage: 'autopost_mobile.png',
  },
  {
    title: 'WhatsApp Priority Agent',
    description: 'AI-driven agent that auto-detects message priority (Urgent / High / Normal / Low) and generates contextual replies. Built on Qwen3-35B via AMD Radeon Cloud ROCm.',
    tags: ['FastAPI', 'React', 'AMD ROCm', 'Qwen3', 'PostgreSQL'],
    github: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
    demo: null,
    badge: 'AMD AI DevMaster Hackathon',
    badgeColor: '#f97316',
    folder: 'whatsapp_priority_agent',
    images: ['agent1.png','agent2.png','agent4.png','agent5.png'],
    hasPhone: true,
    // whatsapp_mobile.png — generated mobile mockup of priority chat conversation
    phoneImage: 'whatsapp_mobile.png',
  },
  {
    title: 'FinSathi',
    description: "Financial literacy assistant for Indian users. Explains mutual funds, insurance, and tax-saving options in plain language personalised to each user's profile.",
    tags: ['Python', 'Streamlit', 'Google Gemini', 'Google GenAI SDK'],
    github: 'https://github.com/Qisanxi/finsathi.ai',
    demo: null,
    badge: null,
    badgeColor: null,
    folder: 'finsathi',
    images: ['finsathi2.png','finsathi3.png','finsathi4.png','finsathi5.png','finsathi6.png'],
    hasPhone: true,
    // finsathi_mobile.png — generated mobile mockup of FinSathi chat explaining SIPs
    phoneImage: 'finsathi_mobile.png',
  },
]

// ─── MacOS Laptop Frame ───────────────────────────────────────────────────────
// The frame itself (bezel, traffic lights, hinge) is rendered STATIC — it never
// re-mounts or fades during image swaps. Only the <img> inside the screen
// area fades, so the device looks like a real laptop changing browser tabs.
function LaptopFrame({ src, alt, compact, visible }) {
  return (
    <div style={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      {/* Screen body */}
      <div style={{
        background: '#1E1D1A',
        borderRadius: compact ? '8px 8px 0 0' : '10px 10px 0 0',
        padding: compact ? '18px 5px 5px' : '22px 7px 7px',
        border: '1.5px solid #38342C',
        borderBottom: 'none',
        position: 'relative',
      }}>
        {/* Traffic lights */}
        <div style={{ position: 'absolute', top: compact ? 6 : 8, left: compact ? 8 : 10, display: 'flex', gap: 4 }}>
          <div style={{ width: compact ? 6 : 7, height: compact ? 6 : 7, borderRadius: '50%', background: '#FF5F57', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
          <div style={{ width: compact ? 6 : 7, height: compact ? 6 : 7, borderRadius: '50%', background: '#FFBD2E', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
          <div style={{ width: compact ? 6 : 7, height: compact ? 6 : 7, borderRadius: '50%', background: '#28C840', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.3)' }} />
        </div>
        {/* Browser URL bar hint — screen content lives here, only the img fades */}
        <div style={{
          background: '#0D0C0A',
          borderRadius: compact ? 3 : 4,
          overflow: 'hidden',
          aspectRatio: '16/9.5',
          border: '1px solid #2A2720',
          position: 'relative',
        }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              display: 'block',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.28s ease',
            }}
          />
        </div>
      </div>
      {/* Hinge + base */}
      <div style={{
        height: compact ? 7 : 9,
        background: 'linear-gradient(180deg, #2A2720 0%, #1A1712 100%)',
        borderRadius: compact ? '0 0 5px 5px' : '0 0 7px 7px',
        border: '1.5px solid #38342C',
        borderTop: '1px solid #1A1712',
      }} />
    </div>
  )
}

// ─── Phone Frame ─────────────────────────────────────────────────────────────
function PhoneFrame({ src }) {
  return (
    <div style={{
      background: '#1E1D1A',
      borderRadius: 18,
      padding: '14px 5px 6px',
      border: '1.5px solid #38342C',
      width: 78,
      flexShrink: 0,
      boxShadow: '0 12px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
      position: 'relative',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)',
        width: 22, height: 4, borderRadius: 2, background: '#0D0C0A',
      }} />
      {/* Screen */}
      <div style={{ background: '#0D0C0A', borderRadius: 10, overflow: 'hidden', aspectRatio: '9/18' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </div>
      {/* Home bar */}
      <div style={{ width: 28, height: 3, background: '#38342C', borderRadius: 2, margin: '6px auto 0' }} />
    </div>
  )
}

// ─── Auto-cycling image gallery inside the frame ──────────────────────────────
function DeviceDisplay({ project, compact }) {
  const urls = project.images.map((f) => `/project_image/${project.folder}/${f}`)
  const [idx, setIdx]       = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused]   = useState(false)

  useEffect(() => {
    if (urls[(idx + 1) % urls.length]) {
      const img = new window.Image()
      img.src = urls[(idx + 1) % urls.length]
    }
  }, [idx])

  useEffect(() => {
    if (paused || urls.length <= 1) return
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx((i) => (i + 1) % urls.length); setVisible(true) }, 280)
    }, 2800)
    return () => clearInterval(id)
  }, [paused, idx, urls.length])

  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setIdx(i); setVisible(true) }, 280)
  }

  const phoneUrl = project.hasPhone
    ? `/project_image/${project.folder}/${project.phoneImage}`
    : null

  return (
    <div
      style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 0, padding: compact ? '20px 12px 12px' : '28px 20px 16px',
        background: 'radial-gradient(ellipse at 60% 40%, #201A0F 0%, #0F0D09 100%)',
        position: 'relative',
        minHeight: compact ? 180 : 240,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Laptop — frame stays static, only the img inside fades via the visible prop */}
      <div
        style={{
          flex: 1,
          maxWidth: project.hasPhone ? '78%' : '100%',
          filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.6))',
        }}
      >
        <LaptopFrame src={urls[idx]} alt={project.title} compact={compact} visible={visible} />
      </div>

      {/* Phone overlay — only for projects that have one */}
      {phoneUrl && (
        <div style={{ marginLeft: -16, marginBottom: 8 }}>
          <PhoneFrame src={phoneUrl} />
        </div>
      )}

      {/* Progress dots — bottom center. Positioned above the phone frame
          (which sits at marginBottom: 8) so the dots stay visible/clickable.
          Was bottom: 8, overlapping the phone. Now bottom: 20 — clears the
          phone frame and stays interactive. */}
      {urls.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 5,
        }}>
          {urls.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i) }}
              aria-label={`Screenshot ${i + 1}`}
              style={{
                width: i === idx ? 16 : 5,
                height: 5, padding: 0, border: 'none', borderRadius: 3,
                cursor: 'pointer',
                background: i === idx ? ACCENT : 'rgba(196,145,63,0.25)',
                transition: 'width 0.25s, background 0.25s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Featured (horizontal) card — used for first 2 projects ──────────────────
function FeaturedCard({ project }) {
  return (
    <div
      className="project-card"
      style={{
        display: 'grid',
        gridTemplateColumns: '44% 1fr',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(196,145,63,0.12)',
        background: CARD_BG,
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.38)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.45)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Left — device display */}
      <div style={{ borderRight: '1px solid rgba(196,145,63,0.08)' }}>
        <DeviceDisplay project={project} compact={false} />
      </div>

      {/* Right — content */}
      <div style={{ padding: '28px 26px 22px', display: 'flex', flexDirection: 'column' }}>
        {project.badge && (
          <div style={{ marginBottom: 12 }}>
            <Badge color={project.badgeColor}>{project.badge}</Badge>
          </div>
        )}

        {/* Title + links */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
          <h3 style={{
            color: TEXT,
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0, paddingTop: 3 }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{ color: FAINT, transition: 'color 0.18s', display: 'flex' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
              onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
              title="Source code"
            ><GitHubIcon size={16} /></a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                style={{ color: FAINT, transition: 'color 0.18s', display: 'flex' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
                title="Live demo"
              ><ExternalLink size={16} /></a>
            )}
          </div>
        </div>

        <p style={{ color: MUTED, fontSize: 13, lineHeight: '1.75', margin: '0 0 20px', flex: 1 }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: project.demo ? 14 : 0 }}>
          {project.tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, fontFamily: 'var(--font-mono)',
              color: MUTED,
              background: 'rgba(196,145,63,0.06)',
              border: '1px solid rgba(196,145,63,0.14)',
              borderRadius: 6,
              padding: '3px 9px',
            }}>{t}</span>
          ))}
        </div>

        {/* Live button */}
        {project.demo && (
          <div>
            <a
              href={project.demo} target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: ACCENT,
                border: '1px solid rgba(196,145,63,0.28)',
                borderRadius: 7, padding: '5px 13px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.09)'; e.currentTarget.style.borderColor = ACCENT }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.28)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'livePulse 2s infinite' }} />
              Live
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const headingRef = useScrollAnimation()
  const gridRef = useScrollAnimation()

  // All 4 projects use the same horizontal FeaturedCard layout.
  // Uniform treatment signals "4 equally-strong projects" rather than
  // "2 featured + 2 filler". Single column reads cleaner than a 2x2 grid
  // because every project gets full-width device-mockup real estate.
  return (
    <section id="projects" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Heading */}
        <div ref={headingRef} className="reveal" style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: ACCENT }} />
            <span style={{ color: ACCENT, fontSize: 12, fontFamily: 'var(--font-mono)' }}>02. projects</span>
          </div>
          <h2 style={{
            color: TEXT, margin: '0 0 10px',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontFamily: 'var(--font-serif)', fontWeight: 600,
            letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Things I have built
          </h2>
          <p style={{ color: MUTED, fontSize: 14, lineHeight: '1.6', margin: 0 }}>
            AI-powered tools, autonomous agents, and real-world applications.
          </p>
        </div>

        {/* All projects as uniform horizontal cards — single column */}
        <div
          ref={gridRef}
          className="reveal-children"
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          {projects.map((p) => <FeaturedCard key={p.title} project={p} />)}
        </div>

      </div>

      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        /* Stack featured cards on mobile — device mockup on top, content below */
        @media (max-width: 640px) {
          .project-card {
            grid-template-columns: 1fr !important;
          }
          .project-card > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(196,145,63,0.08);
          }
        }
      `}</style>
    </section>
  )
}
