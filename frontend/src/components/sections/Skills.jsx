const skillGroups = [
  {
    category: 'Web Development',
    number: '01',
    color: '#6366f1',
    skills: ['React', 'FastAPI', 'Django', 'Python', 'REST APIs'],
  },
  {
    category: 'Mobile',
    number: '02',
    color: '#10b981',
    skills: ['Flutter', 'Dart'],
  },
  {
    category: 'AI / LLMs',
    number: '03',
    color: '#f97316',
    skills: ['Agents', 'RAG', 'LLMs', 'Prompt Engineering'],
  },
  {
    category: 'Databases',
    number: '04',
    color: '#38bdf8',
    skills: ['PostgreSQL', 'Firebase'],
  },
  {
    category: 'Tools',
    number: '05',
    color: '#a78bfa',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman'],
  },
]

function getTagStyle(color) {
  return {
    color: color,
    background: color + '12',
    border: '1px solid ' + color + '30',
  }
}

function getDotStyle(color) {
  return { background: color }
}

const cardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-400"></div>
          <span className="text-indigo-400 text-sm font-mono">03. skills</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I work with</h2>
        <p className="text-slate-400 mb-12 max-w-xl">Technologies I use regularly across web, mobile, and AI projects. Updated as I grow.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.category} className="rounded-xl p-6" style={cardStyle}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-xs" style={{ color: group.color }}>{group.number}</span>
                <div className="w-px h-4" style={{ background: group.color + '40' }}></div>
                <span className="text-white font-medium text-sm">{group.category}</span>
                <span className="w-2 h-2 rounded-full ml-auto" style={getDotStyle(group.color)}></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="text-xs font-mono px-3 py-1.5 rounded-lg" style={getTagStyle(group.color)}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-indigo-400 text-sm font-mono">currently exploring</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Deepening my knowledge in AI engineering — agents, RAG pipelines, and LLM tooling.
            Also exploring cloud deployment patterns on Railway and Vercel.
          </p>
        </div>

      </div>
    </section>
  )
}