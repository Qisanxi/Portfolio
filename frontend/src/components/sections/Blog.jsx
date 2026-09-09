import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { ExternalLink, Clock, ArrowUpRight } from 'lucide-react'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'
const GROUND_2 = '#1C1710'

const posts = [
  {
    title: 'Building the WhatsApp Priority Agent with Qwen3-35B on AMD ROCm',
    excerpt: 'How I architected an AI-driven agent that auto-classifies WhatsApp messages by urgency and generates contextual replies — running on AMD Radeon Cloud infrastructure during the DevMaster Hackathon.',
    tag: 'AI Engineering',
    tagColor: '#E07B54',
    readTime: '6 min read',
    date: 'Aug 2026',
    link: 'https://github.com/Qisanxi/Whatsapp_priority_agent',
  },
  {
    title: 'RAG Pipelines in Production: Lessons from DueAlert',
    excerpt: 'A practical breakdown of how Retrieval-Augmented Generation powers personalized fee-collection reminders in DueAlert — from chunking student records to Gemini prompt construction.',
    tag: 'RAG / LLMs',
    tagColor: '#7BC47A',
    readTime: '5 min read',
    date: 'Jul 2026',
    link: 'https://github.com/Qisanxi/DueAlert',
  },
  {
    title: 'Shipping Autonomous Agents with Google ADK — AutoPost Deep Dive',
    excerpt: 'Everything I learned building AutoPost: an autonomous agent that finds noteworthy GitHub commits, writes LinkedIn posts, and publishes to Dev.to without a single manual keystroke after setup.',
    tag: 'Agents',
    tagColor: '#A887E8',
    readTime: '8 min read',
    date: 'Jun 2026',
    link: 'https://github.com/Qisanxi/AutoPost',
  },
  {
    title: 'FastAPI + AWS App Runner: Deploying for &lt;$5/month',
    excerpt: 'A step-by-step guide to containerizing a FastAPI backend, pushing to ECR, and running it on App Runner — keeping infra costs near zero for side projects.',
    tag: 'Cloud & DevOps',
    tagColor: '#C4913F',
    readTime: '4 min read',
    date: 'May 2026',
    link: 'https://github.com/Qisanxi',
  },
]

function BlogCard({ post, index }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        borderRadius: '12px',
        background: GROUND_2,
        border: '1px solid rgba(196,145,63,0.1)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(196,145,63,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Tag + date */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '10px', fontFamily: 'var(--font-mono)',
          color: post.tagColor,
          background: post.tagColor + '14',
          border: `1px solid ${post.tagColor}28`,
          borderRadius: '20px',
          padding: '2px 9px',
        }}>{post.tag}</span>
        <span style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <h3
          style={{ color: TEXT, fontSize: '14px', fontFamily: 'var(--font-serif)', fontWeight: 500, lineHeight: '1.5', margin: 0 }}
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <ArrowUpRight size={14} style={{ color: FAINT, flexShrink: 0, marginTop: '3px' }} />
      </div>

      {/* Excerpt */}
      <p style={{ color: MUTED, fontSize: '12px', lineHeight: '1.65', margin: 0 }}>{post.excerpt}</p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
        <Clock size={11} style={{ color: FAINT }} />
        <span style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{post.readTime}</span>
      </div>
    </a>
  )
}

export default function Blog() {
  const headingRef = useScrollAnimation()
  const gridRef = useScrollAnimation()

  return (
    <section id="blog" style={{ padding: '72px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div ref={headingRef} className="reveal" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
            <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>06. writing</span>
          </div>
          <h2 style={{ color: TEXT, fontSize: 'clamp(26px, 5vw, 36px)', fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 10px' }}>
            Thinking in public
          </h2>
          <p style={{ color: MUTED, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Notes on AI engineering, backend architecture, and building things that actually ship.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-children"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {posts.map((post, i) => <BlogCard key={post.title} post={post} index={i} />)}
        </div>

      </div>
    </section>
  )
}
