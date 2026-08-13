const timeline = [
  {
    year: '2026',
    title: 'AMD AI DevMaster Hackathon',
    subtitle: 'Hackathon Participant',
    description: 'Built a private AI agent for WhatsApp Business using AMD Radeon Cloud and Qwen3.6-35B-A3B via ROCm infrastructure.',
    color: '#f97316',
  },
  {
    year: '2026',
    title: 'Gemini XPrize',
    subtitle: 'Hackathon Participant',
    description: 'Built a school fee collection AI agent that parses student data and sends automated WhatsApp payment reminders to parents.',
    color: '#6366f1',
  },
  {
    year: '2025',
    title: 'Excelerate Flutter Internship',
    subtitle: 'Team Leader — Team 9',
    description: 'Led Team 9 in building a Flutter e-learning mobile application. Managed deliverables, coordinated team members, and drove the project end to end.',
    color: '#10b981',
  },
]

const dotStyle = (color) => ({
  background: color,
  boxShadow: '0 0 8px ' + color + '60',
})

const lineStyle = { background: 'rgba(255,255,255,0.08)' }

const sectionCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const highlightStyle = {
  background: 'rgba(99,102,241,0.08)',
  border: '1px solid rgba(99,102,241,0.2)',
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-400"></div>
          <span className="text-indigo-400 text-sm font-mono">04. about</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">A bit about me</h2>

        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <p className="text-slate-400 leading-relaxed mb-6">
              I am a fullstack and mobile developer with a growing focus on AI engineering.
              I enjoy building tools that solve real problems — from automating fee collection
              for schools to helping users navigate financial decisions with AI.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Beyond writing code, I have led teams — coordinating deliverables, unblocking
              teammates, and keeping projects moving. That combination of building and leading
              is what I bring to every project.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Currently deepening my knowledge in AI agents, RAG pipelines, and LLM tooling
              with the goal of becoming an AI engineer.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-slate-500 text-sm font-mono">Projects built</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">2</div>
                <div className="text-slate-500 text-sm font-mono">Hackathons</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-slate-500 text-sm font-mono">Team led</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">3+</div>
                <div className="text-slate-500 text-sm font-mono">AI integrations</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-slate-500 text-xs font-mono mb-6 uppercase tracking-widest">Experience</div>
            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px" style={lineStyle}></div>
              <div className="flex flex-col gap-8">
                {timeline.map((item) => (
                  <div key={item.title} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: item.color + '15' }}>
                      <div className="w-2 h-2 rounded-full" style={dotStyle(item.color)}></div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color: item.color }}>{item.year}</span>
                      <span className="text-xs text-slate-600 font-mono">/</span>
                      <span className="text-xs text-slate-500 font-mono">{item.subtitle}</span>
                    </div>
                    <div className="text-white font-medium text-sm mb-2">{item.title}</div>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl" style={highlightStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs font-mono">open to work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Looking for internship and collaboration opportunities in backend development and AI engineering.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}