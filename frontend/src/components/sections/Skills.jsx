import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'

const skillGroups = [
  {
    category: 'Web & Backend',
    color: '#C4913F',
    skills: ['React', 'FastAPI', 'Django', 'Python', 'REST APIs', 'Java'],
  },
  {
    category: 'Databases',
    color: '#7BC47A',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'SQL'],
  },
  {
    category: 'AI / LLMs',
    color: '#E07B54',
    skills: ['Agents', 'RAG', 'LLMs', 'Prompt Engineering', 'Google GenAI SDK', 'Google ADK'],
  },
  {
    category: 'Cloud & Infra',
    color: '#7BC47A',
    skills: ['AWS App Runner', 'ECR', 'Docker', 'Linux'],
  },
  {
    category: 'Tools',
    color: '#A887E8',
    skills: ['Git', 'GitHub', 'VS Code', 'Claude Code', 'Codex', 'Postman'],
  },
  {
    category: 'Mobile',
    color: '#E8A887',
    skills: ['Flutter', 'Dart'],
  },
]

function Pill({ label, color }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontFamily: 'var(--font-mono)',
      color: color,
      background: color + '14',
      border: `1px solid ${color}28`,
      lineHeight: '1.6',
      whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

export default function Skills() {
  const headingRef = useScrollAnimation()
  const tableRef = useScrollAnimation()

  return (
    <section id="skills" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
            <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>03. skills</span>
          </div>
          <h2 style={{ color: TEXT, fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
            What I work with
          </h2>
        </div>

        {/* Compact table layout — category label left, pills right */}
        <div ref={tableRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '12px 20px',
                alignItems: 'center',
                padding: '14px 0',
                borderBottom: i < skillGroups.length - 1 ? '1px solid rgba(196,145,63,0.08)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: group.color, boxShadow: `0 0 6px ${group.color}80`, flexShrink: 0 }} />
                <span style={{ color: MUTED, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{group.category}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {group.skills.map((skill) => (
                  <Pill key={skill} label={skill} color={group.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* "Currently learning" strip */}
        <div style={{
          marginTop: '28px',
          padding: '14px 18px',
          borderRadius: '10px',
          background: 'rgba(196,145,63,0.04)',
          border: '1px solid rgba(196,145,63,0.14)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', flexShrink: 0, marginTop: '5px', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}></span>
          <p style={{ color: MUTED, fontSize: '12px', fontFamily: 'var(--font-mono)', lineHeight: '1.7', margin: 0 }}>
            Currently deepening: <span style={{ color: ACCENT }}>AI agents · RAG pipelines · LLM tooling with Google ADK · AWS App Runner deployments</span>
          </p>
        </div>

      </div>
    </section>
  )
}
