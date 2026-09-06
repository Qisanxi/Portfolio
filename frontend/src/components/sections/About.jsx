const timeline = [
  {
    year: '2026',
    title: 'AMD AI DevMaster Hackathon',
    subtitle: 'Hackathon Participant',
    description: 'Built a WhatsApp Priority Agent using Qwen3-35B via AMD Radeon Cloud ROCm infrastructure. Recognized by AMD Developer Program for outstanding participation and project completion.',
    color: '#f97316',
  },
  {
    year: '2026',
    title: 'Prompt Engineering Research & Integration',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Integrated AI prompts into backend workflows to improve system reliability and contextual accuracy. Strengthened understanding of backend-AI integration and scalable API design.',
    color: '#6366f1',
  },
  {
    year: '2026',
    title: 'Mobile App Development',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Architected and deployed a comprehensive state management system for a Flutter mobile app. Gained exposure to full-stack development, reinforcing backend concepts in a mobile context.',
    color: '#10b981',
  },
  {
    year: '2026',
    title: 'McKinsey Forward Program',
    subtitle: 'Graduate — McKinsey.org',
    description: 'Graduated from a 10-week global learning program focused on communication, leadership, and problem-solving frameworks used at McKinsey & Company.',
    color: '#38bdf8',
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
              I am a self-driven developer with a strong foundation in data structures, algorithms,
              and Python backend development. I overcame self-directed learning challenges by focusing
              on high-impact tech hackathons, open-source GitHub contributions, and end-to-end
              project development.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              I specialize in building AI-integrated full-stack applications — from autonomous content
              agents that post to LinkedIn without touching a keyboard, to AI-powered fee collection
              platforms that track payment risk patterns in real time.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Currently pursuing a Bachelor of Computer Applications at Patliputra University, Patna,
              and deepening expertise in AI agents, RAG pipelines, and scalable API design.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-slate-500 text-sm font-mono">Projects built</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-slate-500 text-sm font-mono">Hackathon</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">2</div>
                <div className="text-slate-500 text-sm font-mono">Internships</div>
              </div>
              <div className="rounded-xl p-4" style={sectionCardStyle}>
                <div className="text-2xl font-bold text-white mb-1">4</div>
                <div className="text-slate-500 text-sm font-mono">Certifications</div>
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
                Seeking an entry-level role in backend development or AI engineering where I can build scalable web applications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
