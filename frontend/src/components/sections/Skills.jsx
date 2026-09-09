import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Tag from '../ui/Tag'

const skillGroups = [
  {
    category: 'Web Development',
    number: '01',
    color: '#6366f1',
    skills: ['React', 'FastAPI', 'Django', 'Python', 'REST APIs', 'Java'],
  },
  {
    category: 'Databases',
    number: '02',
    color: '#38bdf8',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'SQL'],
  },
  {
    category: 'AI / LLMs',
    number: '03',
    color: '#f97316',
    skills: ['Agents', 'RAG', 'LLMs', 'Prompt Engineering', 'Google GenAI SDK', 'Google ADK'],
  },
  {
    category: 'Cloud & Infra',
    number: '04',
    color: '#10b981',
    skills: ['Google Cloud Run', 'AWS', 'Docker', 'Linux'],
  },
  {
    category: 'Tools',
    number: '05',
    color: '#a78bfa',
    skills: ['Git', 'GitHub', 'VS Code', 'Claude Code', 'Codex', 'Postman'],
  },
  {
    category: 'Mobile',
    number: '06',
    color: '#fb7185',
    skills: ['Flutter', 'Dart'],
  },
]

const cardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
}

function SkillCard({ group }) {
  return (
    <div className="rounded-xl p-6 hover:border-indigo-500/30 transition-colors duration-300" style={cardStyle}>
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-xs" style={{ color: group.color }}>{group.number}</span>
        <div className="w-px h-4" style={{ background: group.color + '40' }}></div>
        <span className="text-white font-medium text-sm">{group.category}</span>
        <span
          className="w-2 h-2 rounded-full ml-auto"
          style={{ background: group.color, boxShadow: `0 0 6px ${group.color}80` }}
        ></span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <Tag key={skill} color={group.color}>{skill}</Tag>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const headingRef = useScrollAnimation()
  const gridRef = useScrollAnimation()
  const footerRef = useScrollAnimation()

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-indigo-400"></div>
            <span className="text-indigo-400 text-sm font-mono">03. skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I work with</h2>
          <p className="text-slate-400 max-w-xl">
            Technologies I use regularly across backend, AI, cloud, and mobile projects.
          </p>
        </div>

        <div ref={gridRef} className="reveal-children grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <SkillCard key={group.category} group={group} />
          ))}
        </div>

        <div
          ref={footerRef}
          className="reveal mt-12 p-6 rounded-xl"
          style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-indigo-400 text-sm font-mono">currently exploring</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Deepening expertise in AI agents, RAG pipelines, and LLM tooling with Google ADK and Claude Code.
            Expanding cloud skills on Google Cloud Run for scalable zero-cost deployments.
          </p>
        </div>

      </div>
    </section>
  )
}
