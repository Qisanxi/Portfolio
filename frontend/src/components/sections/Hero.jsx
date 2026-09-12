import { useState, useEffect } from 'react'
import { Mail, ArrowDown } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../../lib/icons'

const ACCENT = '#C4913F'
const TEXT = '#EDE4CF'
const MUTED = '#9A8E78'
const FAINT = '#5C5446'

const roles = [
  'Software Engineer',
  'Python Backend Developer',
  'AI-Integrated Full-Stack Dev',
  'FastAPI & React Developer',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 24px 48px', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle warm grain background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 60% 40%, rgba(196,145,63,0.06) 0%, transparent 65%),
          linear-gradient(rgba(196,145,63,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,145,63,0.02) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 64px 64px, 64px 64px',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '40px', alignItems: 'center' }}>

          {/* Text block — contains everything except the photo.
              On mobile, the .hero-photo block moves INTO this column via
              the CSS order rules in the <style> block at the bottom. */}
          <div className="hero-text">
            <div className="hero-hello" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: '28px', height: '1px', background: ACCENT }}></div>
              <span style={{ color: ACCENT, fontSize: '12px', fontFamily: 'var(--font-mono)' }}>Hello, world</span>
            </div>

            <h1 className="hero-name" style={{
              fontSize: 'clamp(42px, 9vw, 80px)',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: TEXT,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
            }}>
              Sandeep<span style={{ color: ACCENT }}>.</span><br />
              Kumar<span style={{ color: ACCENT }}>.</span>
            </h1>

            {/* Typing animation container — fixed height + overflow hidden
                so the typing/deleting cycle never causes layout shift.
                Previously used minHeight: 32px which let the container grow
                when the typed text wrapped. whiteSpace: nowrap + overflow
                hidden ensures the text is always exactly one line tall. */}
            <div className="hero-typing" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', height: '1.8em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <span style={{ color: FAINT, fontFamily: 'var(--font-mono)', fontSize: '15px' }}>~$</span>
              <span style={{ color: '#DDB87A', fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px, 3vw, 18px)' }}>
                {displayed}
                <span style={{ color: ACCENT, animation: 'blink 1s step-end infinite' }}>|</span>
              </span>
            </div>

            <p className="hero-intro" style={{ color: MUTED, fontSize: 'clamp(14px, 2.5vw, 16px)', maxWidth: '520px', marginBottom: '36px', lineHeight: '1.75' }}>
              Growth is the equation where iteration and grinding are the variables — every cycle of effort compounds into mastery,
              every challenge becomes fuel for transformation. This Portfolio is depiction of my growth while Projects and Certifications
              in it represent the iteration and grinding .
            </p>

            <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
              <button
                onClick={scrollToProjects}
                style={{
                  background: ACCENT, border: 'none', borderRadius: '8px',
                  padding: '12px 24px', color: '#fff', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                View my work
              </button>
              <a
                href="/resume.pdf"
                download
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  border: `1px solid rgba(196,145,63,0.35)`, borderRadius: '8px',
                  padding: '12px 22px', color: ACCENT, fontSize: '13px',
                  fontFamily: 'var(--font-mono)', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.08)'; e.currentTarget.style.borderColor = ACCENT }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)' }}
              >
                resume.pdf
              </a>
            </div>

            {/* Social links — flexWrap so the row reflows on narrow screens
                instead of pushing the github.com/Qisanxi label off-screen */}
            <div className="hero-social" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" style={{ color: FAINT, transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
              ><GitHubIcon /></a>
              <a href="https://www.linkedin.com/in/sandeep-qisanxi" target="_blank" rel="noreferrer" style={{ color: FAINT, transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
              ><LinkedInIcon /></a>
              <a href="mailto:sandeepkumarultra615615@gmail.com" style={{ color: FAINT, transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = TEXT }}
                onMouseLeave={(e) => { e.currentTarget.style.color = FAINT }}
              ><Mail size={20} /></a>
              <div style={{ width: '1px', height: '14px', background: FAINT + '50' }}></div>
              <span className="hero-social-label" style={{ color: FAINT, fontSize: '11px', fontFamily: 'var(--font-mono)' }}>github.com/Qisanxi</span>
            </div>
          </div>

          {/* Profile photo — on desktop sits in the right column of the grid.
              On mobile, the CSS order rules below move it BETWEEN the name
              and the typing animation, so the mobile layout reads:
              Hello → Name → Photo → Typing → Intro → Buttons → Social */}
          <div className="hero-photo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #A8762B 50%, #2E200A 100%)`,
              borderRadius: '50%',
              padding: '3px',
              boxShadow: `0 0 40px rgba(196,145,63,0.25)`,
            }}>
              <img
                src="/profile.png"
                alt="Sandeep Kumar"
                onError={(e) => { e.currentTarget.closest('div').style.display = 'none' }}
                style={{
                  width: '196px', height: '196px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  background: '#2A1E0D',
                }}
              />
            </div>

            <div className="hero-availability" style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '5px 14px', borderRadius: '20px',
              background: 'rgba(74,222,128,0.06)',
              border: '1px solid rgba(74,222,128,0.18)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}></span>
              <span style={{ color: '#4ade80', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>Open to work</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'heroBounce 2s ease-in-out infinite' }}>
        <span style={{ color: FAINT, fontSize: '10px', fontFamily: 'var(--font-mono)' }}>scroll</span>
        <ArrowDown size={13} color={FAINT} />
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes heroBounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }

        /* Hide the github.com/Qisanxi trailing label on phones — icons alone are enough. */
        @media (max-width: 480px) {
          .hero-social-label { display: none !important; }
        }

        /* ─── Mobile Hero restructure (<=640px) ─────────────────────────────
           Desktop keeps the 2-column grid (text left, photo right).
           Mobile flattens to 1 column AND reorders children so the photo
           appears BETWEEN the name and the typing animation — giving the
           mobile visitor a clear visual of who Sandeep is before reading
           the rest.

           Final mobile order (via CSS order property):
             1. .hero-hello        — "Hello, world"
             2. .hero-name         — "Sandeep. Kumar."
             3. .hero-photo        — profile picture (circle) + availability badge
             4. .hero-typing       — "~$ Software Engineer|"
             5. .hero-intro        — paragraph
             6. .hero-buttons      — View my work / resume.pdf
             7. .hero-social       — GitHub / LinkedIn / Mail / github.com/Qisanxi

           Desktop keeps original order: hello → name → typing → intro →
           buttons → social (text column) | photo (right column) */
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hero-text {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .hero-hello    { order: 1; }
          .hero-name     { order: 2; }
          .hero-photo    { order: 3; align-self: center !important; }
          .hero-typing   { order: 4; }
          .hero-intro    { order: 5; }
          .hero-buttons  { order: 6; }
          .hero-social   { order: 7; }
          /* Shrink the photo on mobile so it doesn't dominate the hero.
             Desktop stays at 196px; mobile uses 140px. */
          .hero-photo img {
            width: 140px !important;
            height: 140px !important;
          }
        }
      `}</style>
    </section>
  )
}
