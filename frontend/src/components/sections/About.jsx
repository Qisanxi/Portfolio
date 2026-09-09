import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const timeline = [
  {
    year: '2026',
    period: 'Jul – Aug',
    title: 'AMD AI DevMaster Hackathon',
    subtitle: 'Hackathon Participant',
    description: 'Built a WhatsApp Priority Agent using Qwen3-35B via AMD Radeon Cloud ROCm infrastructure. Recognised by AMD Developer Program for outstanding participation.',
    color: '#f97316',
  },
  {
    year: '2026',
    period: 'Jul – Aug',
    title: 'Prompt Engineering Research & Integration',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Integrated AI prompts into backend workflows to improve system reliability and contextual accuracy. Strengthened backend-AI integration and scalable API design.',
    color: '#D4A574',
  },
  {
    year: '2026',
    period: 'May – Jul',
    title: 'Mobile App Development',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Architected and deployed a comprehensive state management system for a Flutter mobile app. Reinforced full-stack and backend concepts in a mobile context.',
    color: '#10b981',
  },
  {
    year: '2026',
    period: '10 weeks',
    title: 'McKinsey Forward Program',
    subtitle: 'Graduate — McKinsey.org',
    description: 'Completed a 10-week global learning program focused on communication, structured problem-solving, and leadership frameworks.',
    color: '#38bdf8',
  },
]

const cardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
}

export default function About() {
  const headingRef = useScrollAnimation()
  const bioRef = useScrollAnimation()
  const timelineRef = useScrollAnimation()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div ref={headingRef} className="reveal mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent"></div>
            <span className="text-accent text-sm font-mono">04. about</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">A bit about me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left — bio + stats */}
          <div ref={bioRef} className="reveal">
            <p className="text-slate-400 leading-relaxed mb-6">
              I am a self-driven developer with a strong foundation in Python backend and
              AI-integrated full-stack development. I got here through hackathons,
              open-source contributions, and shipping end-to-end products — not tutorials.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              I build things that automate the boring parts of work — whether that is
              collecting school fees with a WhatsApp bot, or publishing developer content
              to LinkedIn without touching a keyboard after setup.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Currently pursuing a BCA at Patliputra University and deepening expertise
              in AI agents, RAG pipelines, and AWS App Runner deployments.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5+', label: 'Projects shipped' },
                { value: '1',  label: 'Hackathon' },
                { value: '2',  label: 'Internships' },
                { value: '4',  label: 'Certifications' },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl p-4" style={cardStyle}>
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-slate-500 text-sm font-mono">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div ref={timelineRef} className="reveal">
            <div className="text-slate-500 text-xs font-mono mb-6 uppercase tracking-widest">Experience</div>
            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: 'rgba(255,255,255,0.08)' }}></div>
              <div className="flex flex-col gap-8">
                {timeline.map((item) => (
                  <div key={item.title} className="relative pl-10">
                    <div
                      className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: item.color + '15' }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color: item.color }}>{item.year}</span>
                      <span className="text-xs text-slate-700 font-mono">·</span>
                      <span className="text-xs text-slate-600 font-mono">{item.period}</span>
                      <span className="text-xs text-slate-700 font-mono">·</span>
                      <span className="text-xs text-slate-500 font-mono">{item.subtitle}</span>
                    </div>
                    <div className="text-white font-medium text-sm mb-1">{item.title}</div>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-8 p-4 rounded-xl"
              style={{ background: 'rgba(212,165,116,0.08)', border: '1px solid rgba(212,165,116,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs font-mono">open to work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seeking entry-level roles in backend development and AI engineering.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
