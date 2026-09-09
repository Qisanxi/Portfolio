import { useState, useMemo } from 'react'
import { ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon } from '../../lib/icons'
import Badge from '../ui/Badge'
import Tag from '../ui/Tag'

// Project screenshots live in /public/project_image/<Folder>/<file>.png
// Files in /public are served as static assets at the root, so the URL
// for project_image/DueAlert/duealert1.png is /project_image/DueAlert/duealert1.png.
//
// We list the filenames explicitly per project so there are no surprises
// with filesystem casing (AutoPost has mixed Autopost/autopost naming).
const projects = [
  {
    title: 'DueAlert',
    description: 'AI-powered fee collection and student payment tracking platform for coaching centers. Identifies payment-risk patterns, generates personalized reminders with Gemini, and monitors collection from a centralized dashboard.',
    tags: ['Python', 'FastAPI', 'React.js', 'Google GenAI SDK', 'Firebase'],
    github: 'https://github.com/Qisanxi/DueAlert',
    demo: 'https://duealert-bbb61.web.app',
    badge: 'Gemini XPrize Hackathon',
    badgeColor: '#D4A574',
    imagesFolder: 'DueAlert',
    images: ['duealert1.png', 'duealert2.png', 'duealert3.png', 'duealert4.png', 'duealert5.png', 'duealert6.png'],
  },
  {
    title: 'AutoPost',
    description: 'Fully autonomous content agent. Point it at GitHub, it finds what is worth talking about, writes the post, and ships it to LinkedIn and Dev.to — without touching a keyboard after setup.',
    tags: ['Python', 'FastAPI', 'Google Gemini Flash', 'Google ADK', 'React', 'Vite'],
    github: 'https://github.com/Qisanxi/AutoPost',
    demo: 'https://autopost-9c37c.web.app/#/',
    badge: 'Google Agentic Hackathon',
    badgeColor: '#4285f4',
    imagesFolder: 'AutoPost',
    images: ['Autopost1.png', 'Autopost2.png', 'Autopost3.png', 'Autopost4.png', 'Autopost5.png', 'Autopost6.png'],
  },
  {
    title: 'WhatsApp Priority Agent',
    description: 'AI-driven agent that auto-detects message priority (Urgent / High / Normal / Low) and generates contextual replies. Built on Qwen3-35B via AMD Radeon Cloud ROCm. Recognized by AMD Developer Program.',
    tags: ['FastAPI', 'React', 'AMD ROCm', 'Qwen3', 'PostgreSQL'],
    github: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
    demo: null,
    badge: 'AMD AI DevMaster Hackathon',
    badgeColor: '#f97316',
    imagesFolder: 'whatsapp_priority_agent',
    images: ['agent1.png', 'agent2.png', 'agent3.png', 'agent4.png', 'agent5.png'],
  },
  {
    title: 'FinSathi',
    description: 'Financial literacy assistant for Indian users. Explains mutual funds, insurance, and tax-saving options in plain language personalised to each user\'s profile. References SEBI, AMFI, and IRDAI regulations.',
    tags: ['Python', 'Streamlit', 'Google Gemini', 'Google GenAI SDK'],
    github: 'https://github.com/Qisanxi/finsathi.ai',
    demo: null,
    badge: null,
    badgeColor: null,
    imagesFolder: 'finsathi',
    images: ['finsathi1.png', 'finsathi2.png', 'finsathi3.png', 'finsathi4.png', 'finsathi5.png'],
  },
]

/**
 * Gallery — main image with thumbnail strip below.
 *
 * Layout:
 *   ┌──────────────────────────────────────┐
 *   │                                      │
 *   │   Main image (16:9, fixed 320px h)   │
 *   │                                      │
 *   ├──────────────────────────────────────┤
 *   │ ▒ ▒ ▒ ▒ ▒ ▒                          │  ← thumbnails, 56×40, object-fit cover
 *   ├──────────────────────────────────────┤
 *   │ [badge]                              │
 *   │ Title                          GH ↗  │
 *   │ Description...                       │
 *   │ [tags]                  [Live ↗]    │
 *   └──────────────────────────────────────┘
 *
 * - Click thumbnail → main image swaps with a 200ms opacity transition
 * - Only first image per card is eager-loaded; rest are lazy
 *   (28 PNGs / ~6MB total — without lazy load the page feels sluggish)
 * - Selected thumbnail gets a 2px accent border
 */
function Gallery({ project }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Build full URLs once per project. useMemo prevents URL re-creation
  // on every render cycle (which would otherwise re-decode the same image).
  // Project images are stable for a project's lifetime, so an empty dep
  // array is correct here — but eslint wants the dep declared, so we
  // include `project` which only changes when the parent passes a different
  // project instance (i.e. never, in practice).
  const imageUrls = useMemo(
    () => (project.images || []).map((file) => `/project_image/${project.imagesFolder}/${file}`),
    [project.imagesFolder, project.images]
  )

  if (imageUrls.length === 0) return null

  return (
    <div>
      {/* Main image — 16:9 crop, fixed height so all cards are uniform */}
      <div
        className="w-full overflow-hidden rounded-t-xl bg-slate-900/40"
        style={{ height: '320px' }}
      >
        <img
          key={activeIndex}
          src={imageUrls[activeIndex]}
          alt={`${project.title} — screenshot ${activeIndex + 1}`}
          loading={activeIndex === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            display: 'block',
            animation: 'galleryFadeIn 220ms ease-out',
          }}
        />
      </div>

      {/* Thumbnail strip — horizontal, no scroll (max 6 thumbs per card) */}
      {imageUrls.length > 1 && (
        <div
          className="flex gap-1.5 px-3 py-2.5 overflow-x-auto"
          style={{
            background: 'rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {imageUrls.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View screenshot ${i + 1} of ${project.title}`}
              aria-pressed={i === activeIndex}
              className="flex-shrink-0 overflow-hidden rounded transition-all duration-150 cursor-pointer"
              style={{
                width: '56px',
                height: '40px',
                border: i === activeIndex
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
                opacity: i === activeIndex ? 1 : 0.55,
              }}
              onMouseEnter={(e) => {
                if (i !== activeIndex) e.currentTarget.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                if (i !== activeIndex) e.currentTarget.style.opacity = '0.55'
              }}
            >
              <img
                src={url}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300
                 hover:-translate-y-1 hover:shadow-xl"
      style={{ background: '#1C1710', borderColor: 'rgba(196,145,63,0.1)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.1)' }}
    >
      <Gallery project={project} />

      <div className="flex flex-col flex-1 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-2">
            {project.badge && (
              <Badge color={project.badgeColor}>{project.badge}</Badge>
            )}
            <h3 className="text-white font-semibold text-lg leading-tight">{project.title}</h3>
          </div>
          <div className="flex items-center gap-3 ml-4 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              title="Source code"
            >
              <GitHubIcon size={16} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 hover:text-accent transition-colors"
                title="Live demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Footer row — tags + live button */}
        <div className="flex flex-wrap gap-2 items-center">
          {project.tags.map((tag) => (
            <Tag key={tag} size="xs">{tag}</Tag>
          ))}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 text-xs font-mono text-accent
                         border border-accent/30 hover:border-accent hover:bg-accent/10
                         px-3 py-1 rounded transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headingRef = useScrollAnimation()
  const gridRef = useScrollAnimation()

  // Uniform grid — no more featured/non-featured split.
  // Signals "4 equally-strong projects" rather than "2 good + 2 filler".
  return (
    <section id="projects" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal mb-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: '#C4913F' }}></div>
            <span style={{ color: '#C4913F', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>02. projects</span>
          </div>
          <h2 style={{ color: '#EDE4CF', fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 12px' }}>
            Things I have built
          </h2>
          <p style={{ color: '#9A8E78', fontSize: '14px', maxWidth: '480px', lineHeight: '1.6', margin: 0 }}>
            AI-powered tools, autonomous agents, and real-world applications — built to solve actual problems.
          </p>
        </div>

        {/* Uniform grid — all cards same size, same treatment.
            md:grid-cols-2 keeps cards reasonable size on desktop.
            gap-6 gives breathing room for the gallery thumbnails. */}
        <div ref={gridRef} className="reveal-children grid md:grid-cols-2 gap-6">
          {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

      </div>

      {/* Keyframes for the main image swap animation.
          Scoped globally because <style> tags must live at the top level of a component tree. */}
      <style>{`
        @keyframes galleryFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
