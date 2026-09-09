import { ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { GitHubIcon } from '../../lib/icons'
import Badge from '../ui/Badge'
import Tag from '../ui/Tag'

const projects = [
  {
    title: 'DueAlert',
    description: 'AI-powered fee collection and student payment tracking platform for coaching centers. Identifies payment-risk patterns, generates personalized reminders with Gemini, and monitors collection from a centralized dashboard.',
    tags: ['Python', 'FastAPI', 'React.js', 'Google GenAI SDK', 'Firebase'],
    github: 'https://github.com/Qisanxi/DueAlert',
    demo: 'https://duealert-bbb61.web.app',
    badge: 'Gemini XPrize Hackathon',
    badgeColor: '#6366f1',
    // Drop screenshot at frontend/public/images/duealert.png
    image: '/images/duealert.png',
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
    image: '/images/autopost.png',
    featured: true,
  },
  {
    title: 'WhatsApp Priority Agent',
    description: 'AI-driven agent that auto-detects message priority (Urgent / High / Normal / Low) and generates contextual replies. Built on Qwen3-35B via AMD Radeon Cloud ROCm. Recognized by AMD Developer Program.',
    tags: ['FastAPI', 'React', 'AMD ROCm', 'Qwen3', 'PostgreSQL'],
    github: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
    demo: null,
    badge: 'AMD AI DevMaster Hackathon',
    badgeColor: '#f97316',
    image: '/images/whatsapp-agent.png',
    featured: false,
  },
  {
    title: 'FinSathi',
    description: 'Financial literacy assistant for Indian users. Explains mutual funds, insurance, and tax-saving options in plain language personalised to each user\'s profile. References SEBI, AMFI, and IRDAI regulations.',
    tags: ['Python', 'Streamlit', 'Google Gemini', 'Google GenAI SDK'],
    github: 'https://github.com/Qisanxi/finsathi.ai',
    demo: null,
    badge: null,
    badgeColor: null,
    image: '/images/finsathi.png',
    featured: false,
  },
]

function ProjectImage({ src, alt }) {
  return (
    <div
      className="w-full overflow-hidden rounded-t-xl"
      style={{ height: '180px', background: 'rgba(99,102,241,0.06)' }}
    >
      <img
        src={src}
        alt={alt}
        onError={(e) => { e.currentTarget.closest('[data-img-wrap]').style.display = 'none' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

function ProjectCard({ project, featured }) {
  return (
    <div
      className="group flex flex-col rounded-xl border overflow-hidden transition-all duration-300
                 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Project screenshot — hidden gracefully if file not yet added */}
      <div data-img-wrap="">
        <ProjectImage src={project.image} alt={`${project.title} screenshot`} />
      </div>

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
                className="text-slate-500 hover:text-indigo-400 transition-colors"
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
              className="ml-auto flex items-center gap-1.5 text-xs font-mono text-indigo-400
                         border border-indigo-400/30 hover:border-indigo-400 hover:bg-indigo-400/10
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
  const featuredRef = useScrollAnimation()
  const othersRef = useScrollAnimation()

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-indigo-400"></div>
            <span className="text-indigo-400 text-sm font-mono">02. projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Things I have built</h2>
          <p className="text-slate-400 max-w-xl">
            AI-powered tools, autonomous agents, and real-world applications — built to solve actual problems.
          </p>
        </div>

        <div ref={featuredRef} className="reveal-children grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((p) => <ProjectCard key={p.title} project={p} featured />)}
        </div>

        <div ref={othersRef} className="reveal-children grid md:grid-cols-2 gap-6">
          {others.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>

      </div>
    </section>
  )
}
