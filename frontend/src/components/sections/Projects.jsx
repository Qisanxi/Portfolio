import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon } from '../../lib/icons'
import Badge from '../ui/Badge'
import Tag from '../ui/Tag'

const ACCENT = '#C4913F'

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
    featured: true,
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
    images: ['Autopost1.png','Autopost2.png','Autopost3.png','Autopost4.png','Autopost5.png','Autopost6.png'],
    featured: true,
  },
  {
    title: 'WhatsApp Priority Agent',
    description: 'AI-driven agent that auto-detects message priority (Urgent / High / Normal / Low) and generates contextual replies. Built on Qwen3-35B via AMD Radeon Cloud ROCm. Recognised by AMD Developer Program.',
    tags: ['FastAPI', 'React', 'AMD ROCm', 'Qwen3', 'PostgreSQL'],
    github: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
    demo: null,
    badge: 'AMD AI DevMaster Hackathon',
    badgeColor: '#f97316',
    folder: 'whatsapp_priority_agent',
    images: ['agent1.png','agent2.png','agent3.png','agent4.png','agent5.png'],
    featured: false,
  },
  {
    title: 'FinSathi',
    description: "Financial literacy assistant for Indian users. Explains mutual funds, insurance, and tax-saving options in plain language personalised to each user's profile. References SEBI, AMFI, and IRDAI regulations.",
    tags: ['Python', 'Streamlit', 'Google Gemini', 'Google GenAI SDK'],
    github: 'https://github.com/Qisanxi/finsathi.ai',
    demo: null,
    badge: null,
    badgeColor: null,
    folder: 'finsathi',
    images: ['finsathi1.png','finsathi2.png','finsathi3.png','finsathi4.png','finsathi5.png'],
    featured: false,
  },
]

// ─── AutoGallery ─────────────────────────────────────────────────────────────
// Single <img> crossfades between screenshots every 2.5 s.
// Pauses on hover. Thin accent progress bars at the bottom — clickable to jump.
// Preloads next image before swap so the transition is seamless.

function AutoGallery({ folder, images, height }) {
  const urls = images.map((f) => `/project_image/${folder}/${f}`)
  const [idx, setIdx]         = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused]   = useState(false)

  // Preload the next image so the fade looks instant
  useEffect(() => {
    const next = new Image()
    next.src = urls[(idx + 1) % urls.length]
  }, [idx]) // eslint-disable-line

  // Auto-advance
  useEffect(() => {
    if (paused || urls.length <= 1) return
    const id = setInterval(() => goTo(), 2500)
    return () => clearInterval(id)
  }, [paused, idx, urls.length]) // eslint-disable-line

  function goTo(next) {
    setVisible(false)
    setTimeout(() => {
      setIdx(next !== undefined ? next : (i) => (i + 1) % urls.length)
      setVisible(true)
    }, 320)
  }

  const isAbsolute = height === '100%'

  return (
    <div
      style={{
        position: 'relative',
        height: isAbsolute ? '100%' : height,
        overflow: 'hidden',
        background: '#0c0c0c',
        flexShrink: 0,
        ...(isAbsolute ? { position: 'absolute', inset: 0 } : {}),
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img
        src={urls[idx]}
        alt=""
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Counter badge — shows on hover */}
      {paused && urls.length > 1 && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(0,0,0,0.6)', borderRadius: 4,
          padding: '2px 8px', fontSize: 10,
          fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(4px)',
        }}>
          {idx + 1} / {urls.length}
        </div>
      )}

      {/* Progress bars */}
      {urls.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', gap: 2, padding: '0 8px 8px',
        }}>
          {urls.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i) }}
              aria-label={`Screenshot ${i + 1}`}
              style={{
                flex: 1, height: 3, border: 'none', padding: 0,
                borderRadius: 2, cursor: 'pointer',
                background: i === idx ? ACCENT : 'rgba(255,255,255,0.2)',
                transform: i === idx ? 'scaleY(1.5)' : 'scaleY(1)',
                transition: 'background 0.3s, transform 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FeaturedCard — horizontal split ─────────────────────────────────────────

function FeaturedCard({ project }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '42% 1fr',
        borderRadius: 14, overflow: 'hidden',
        border: '1px solid rgba(196,145,63,0.12)',
        background: '#1C1710', minHeight: 260,
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.38)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Left — gallery fills card height */}
      <div style={{ position: 'relative' }}>
        <AutoGallery folder={project.folder} images={project.images} height="100%" />
        {/* Soft right-edge blend into content panel */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent 70%, #1C1710)',
        }} />
      </div>

      {/* Right — content */}
      <div style={{ padding: '26px 26px 22px', display: 'flex', flexDirection: 'column' }}>
        {project.badge && (
          <div style={{ marginBottom: 10 }}>
            <Badge color={project.badgeColor}>{project.badge}</Badge>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
          <h3 style={{ color: '#EDE4CF', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0, paddingTop: 2 }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{ color: '#5C5446', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#EDE4CF' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#5C5446' }}
            ><GitHubIcon size={15} /></a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                style={{ color: '#5C5446', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5C5446' }}
              ><ExternalLink size={15} /></a>
            )}
          </div>
        </div>

        <p style={{ color: '#9A8E78', fontSize: 13, lineHeight: '1.7', margin: '0 0 18px', flex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {project.tags.map((t) => <Tag key={t} size="xs">{t}</Tag>)}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{
                marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontFamily: 'var(--font-mono)', color: ACCENT,
                border: '1px solid rgba(196,145,63,0.3)', borderRadius: 6,
                padding: '4px 10px', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.09)'; e.currentTarget.style.borderColor = ACCENT }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.3)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'livePulse 2s infinite' }} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── CompactCard — vertical, small image ─────────────────────────────────────

function CompactCard({ project }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column',
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(196,145,63,0.12)',
        background: '#1C1710',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196,145,63,0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <AutoGallery folder={project.folder} images={project.images} height={170} />

      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {project.badge && (
          <div style={{ marginBottom: 8 }}>
            <Badge color={project.badgeColor}>{project.badge}</Badge>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h3 style={{ color: '#EDE4CF', fontSize: 15, fontFamily: 'var(--font-serif)', fontWeight: 600, margin: 0, lineHeight: 1.35 }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, paddingTop: 1 }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{ color: '#5C5446', transition: 'color 0.2s', display: 'flex' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#EDE4CF' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#5C5446' }}
            ><GitHubIcon size={14} /></a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                style={{ color: '#5C5446', transition: 'color 0.2s', display: 'flex' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#5C5446' }}
              ><ExternalLink size={14} /></a>
            )}
          </div>
        </div>

        <p style={{ color: '#9A8E78', fontSize: 12, lineHeight: '1.7', margin: '0 0 14px', flex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
          {project.tags.slice(0, 4).map((t) => <Tag key={t} size="xs">{t}</Tag>)}
          {project.tags.length > 4 && (
            <span style={{ fontSize: 10, color: '#5C5446', fontFamily: 'var(--font-mono)' }}>
              +{project.tags.length - 4}
            </span>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{
                marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontFamily: 'var(--font-mono)', color: ACCENT,
                border: '1px solid rgba(196,145,63,0.28)', borderRadius: 5,
                padding: '3px 8px', textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Projects() {
  const headingRef  = useScrollAnimation()
  const featuredRef = useScrollAnimation()
  const othersRef   = useScrollAnimation()

  const featured = projects.filter((p) => p.featured)
  const others   = projects.filter((p) => !p.featured)

  return (
    <section id="projects" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: ACCENT }} />
            <span style={{ color: ACCENT, fontSize: 12, fontFamily: 'var(--font-mono)' }}>02. projects</span>
          </div>
          <h2 style={{
            color: '#EDE4CF', margin: '0 0 10px',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontFamily: 'var(--font-serif)', fontWeight: 600,
            letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Things I have built
          </h2>
          <p style={{ color: '#9A8E78', fontSize: 14, lineHeight: '1.6', margin: 0 }}>
            AI-powered tools, autonomous agents, and real-world applications.
            Hover any card to pause — click the bars to jump to a screenshot.
          </p>
        </div>

        {/* Featured — full-width horizontal cards */}
        <div ref={featuredRef} className="reveal-children"
          style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 20 }}>
          {featured.map((p) => <FeaturedCard key={p.title} project={p} />)}
        </div>

        {/* Others — compact 2-col */}
        <div ref={othersRef} className="reveal-children"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {others.map((p) => <CompactCard key={p.title} project={p} />)}
        </div>

      </div>

      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

        /* Mobile: stack horizontal cards, single-col others */
        @media (max-width: 640px) {
          #projects .featured-grid { grid-template-columns: 1fr !important; }
          #projects .others-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
