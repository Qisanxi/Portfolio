import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const GROUND_2 = '#1C1710'

const timeline = [
  {
    year: '2026', period: 'Aug – Present',
    title: 'Ongoing Hackathon Journey : MLH, Shipathon & GIBC ---Building AI Models, Agents From Scratch ',
    subtitle: 'Hackathon Participant',
    description: 'actively participating in MLH Hackathons, Shipathon & GIBC--- building AI  Agents ,models and web tools from scratch.',
    color: '#8754e0',
  },

  {
    year: '2026', period: 'Jul – Aug',
    title: 'AMD AI DevMaster Hackathon',
    subtitle: 'Hackathon Participant',
    description: 'Built a WhatsApp Priority Agent using Qwen3-35B via AMD Radeon Cloud ROCm. Recognised by AMD Developer Program.',
    color: '#E07B54',
  },
  {
    year: '2026', period: 'Jul – Aug',
    title: 'Prompt Engineering Research & Integration',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Integrated AI prompts into backend workflows to improve reliability and contextual accuracy.',
    color: ACCENT,
  },
  {
    year: '2026', period: 'June – Jul',
    title: 'Mobile App Development',
    subtitle: 'Remote Internship — Excelerate',
    description: 'Architected a comprehensive state management system for a Flutter mobile app.',
    color: '#7BC47A',
  },
  {
    year: '2026', period: '10 weeks',
    title: 'McKinsey Forward Program',
    subtitle: 'Graduate — McKinsey.org',
    description: 'Completed a 10-week global learning program on communication, structured problem-solving, and leadership.',
    color: '#4B9FE8',
  },
]

const stats = [
  { value: '5+', label: 'Projects shipped' },
  { value: '1',  label: 'Hackathon won' },
  { value: '2',  label: 'Internships' },
  { value: '4',  label: 'Certifications' },
]

export default function About() {
  const headingRef = useScrollAnimation()
  const bioRef = useScrollAnimation()
  const timelineRef = useScrollAnimation()

  return (
    <section id="about" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
            <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>01. about</span>
          </div>
          <h2 style={{ color: TEXT, fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
            A bit about me
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>

          {/* Left — bio + stats */}
          <div ref={bioRef} className="reveal">
            <p style={{ color: MUTED, lineHeight: '1.8', marginBottom: '16px', fontSize: '14px' }}>
              I am a self-driven developer with a strong foundation in Python backend and
              AI-integrated full-stack development. I got here through hackathons,
              open-source contributions, and shipping end-to-end products — not tutorials.
            </p>
            <p style={{ color: MUTED, lineHeight: '1.8', marginBottom: '16px', fontSize: '14px' }}>
              I build things that automate the boring parts of work — whether that is
              collecting school fees with a WhatsApp bot, or publishing developer content
              to LinkedIn without touching a keyboard after setup.
            </p>
            <p style={{ color: MUTED, lineHeight: '1.8', marginBottom: '28px', fontSize: '14px' }}>
              Currently pursuing a BCA at Patliputra University and deepening expertise
              in AI agents, RAG pipelines, and AWS App Runner deployments.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: GROUND_2,
                  border: '1px solid rgba(196,145,63,0.1)',
                }}>
                  <div style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: TEXT, marginBottom: '3px' }}>{value}</div>
                  <div style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div ref={timelineRef} className="reveal">
            <div style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Experience</div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '11px', top: '6px', bottom: '6px', width: '1px', background: 'rgba(196,145,63,0.1)' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {timeline.map((item) => (
                  <div key={item.title} style={{ position: 'relative', paddingLeft: '32px' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: '4px',
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: item.color + '12',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}60` }}></div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                      <span style={{ color: item.color, fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{item.year}</span>
                      <span style={{ color: FAINT, fontSize: '10px' }}>·</span>
                      <span style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{item.period}</span>
                      <span style={{ color: FAINT, fontSize: '10px' }}>·</span>
                      <span style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)' }}>{item.subtitle}</span>
                    </div>
                    <div style={{ color: TEXT, fontSize: '13px', fontFamily: 'var(--font-serif)', fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                    <p style={{ color: FAINT, fontSize: '12px', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: '24px', padding: '12px 14px', borderRadius: '8px',
              background: 'rgba(196,145,63,0.05)',
              border: '1px solid rgba(196,145,63,0.14)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}></span>
              <p style={{ color: MUTED, fontSize: '12px', fontFamily: 'var(--font-mono)', lineHeight: '1.5', margin: 0 }}>
                Seeking entry-level backend &amp; AI engineering roles
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
