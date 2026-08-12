import { ExternalLink } from 'lucide-react'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

function getBadgeStyle(color) {
  return {
    color: color,
    background: color + '15',
    border: '1px solid ' + color + '30',
  }
}

const cardBase = {
  background: 'rgba(255,255,255,0.02)',
  borderColor: 'rgba(255,255,255,0.08)',
}

const cardHover = {
  background: 'rgba(99,102,241,0.05)',
  borderColor: 'rgba(99,102,241,0.3)',
}

const tagStyle = { background: 'rgba(255,255,255,0.04)' }

const projects = [
  {
    title: 'WhatsApp Business AI Agent',
    description: 'Private AI agent for WhatsApp Business that auto-detects message priority (Urgent/High/Normal/Low) and generates contextual replies. Powered by Qwen3.6-35B-A3B via AMD Radeon Cloud ROCm infrastructure.',
    tags: ['FastAPI', 'React', 'Tailwind v4', 'PostgreSQL', 'AMD ROCm', 'Qwen3'],
    github: 'https://github.com/Qisanxi/project',
    demo: 'https://example.com',
    badge: 'AMD AI DevMaster Hackathon 2026',
    badgeColor: '#f97316',
    featured: true,
  },
  {
    title: 'School Fee Collection Agent',
    description: 'AI agent that automates school and tuition fee collection. Users upload a PDF or Excel sheet of students with due balances — the agent extracts the data and sends personalized WhatsApp reminders to parents automatically.',
    tags: ['Python', 'FastAPI', 'Gemini API', 'WhatsApp API', 'PDF Parsing'],
    github: 'https://github.com/Qisanxi/project',
    demo: 'https://example.com',
    badge: 'Gemini XPrize',
    badgeColor: '#6366f1',
    featured: true,
  },
  {
    title: 'Chef Claude',
    description: 'AI-powered recipe generation app. Users input available ingredients and get personalized recipes with step-by-step instructions and nutritional information powered by the Gemini API.',
    tags: ['React', 'Django REST', 'Python', 'Gemini API'],
    github: 'https://github.com/Qisanxi/project',
    demo: 'https://example.com',
    badge: null,
    badgeColor: null,
    featured: false,
  },
  {
    title: 'FinLit AI Assistant',
    description: 'AI-powered financial literacy assistant designed for Indian users. Helps understand mutual funds, insurance, tax-saving options, and government schemes through personalized conversations.',
    tags: ['Python', 'FastAPI', 'React', 'LLM', 'RAG'],
    github: 'https://github.com/Qisanxi/project',
    demo: 'https://example.com',
    badge: null,
    badgeColor: null,
    featured: false,
  },
  {
    title: 'Excelerate E-Learning App',
    description: 'Flutter mobile e-learning platform built as Team Lead for Team 9 during the Excelerate Virtual Internship. Managed task distribution, coordinated deliverables, and led a team end to end.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    github: 'https://github.com/Qisanxi/project',
    demo: null,
    badge: 'Team Lead',
    badgeColor: '#10b981',
    featured: false,
  },
]

function ProjectCard({ project }) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = cardHover.background
    e.currentTarget.style.borderColor = cardHover.borderColor
    e.currentTarget.style.transform = 'translateY(-4px)'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = cardBase.background
    e.currentTarget.style.borderColor = cardBase.borderColor
    e.currentTarget.style.transform = 'translateY(0)'
  }

  return (
    <div
      className="relative flex flex-col rounded-xl border p-6"
      style={{ background: cardBase.background, borderColor: cardBase.borderColor, transition: 'all 0.3s' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-2">
          {project.badge && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full w-fit" style={getBadgeStyle(project.badgeColor)}>
              {project.badge}
            </span>
          )}
          <h3 className="text-white font-semibold text-lg leading-tight">{project.title}</h3>
        </div>
        <div className="flex items-center gap-3 ml-4 shrink-0">
          <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><GitHubIcon /></a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><ExternalLink size={16} /></a>
          )}
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono text-slate-500 px-2 py-1 rounded" style={tagStyle}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-400"></div>
          <span className="text-indigo-400 text-sm font-mono">02. projects</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Things I have built</h2>
        <p className="text-slate-400 mb-12 max-w-xl">A mix of hackathon projects, AI experiments, and real-world tools — all built to solve actual problems.</p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}