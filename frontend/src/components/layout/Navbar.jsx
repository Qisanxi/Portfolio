import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const navLinks = [
  { label: 'About',    href: 'about'          },
  { label: 'Projects', href: 'projects'        },
  { label: 'Skills',   href: 'skills'          },
  { label: 'Certs',    href: 'certifications'  },
  { label: 'Blog',     href: 'blog'            },
  { label: 'Contact',  href: 'contact'         },
]

const sections = navLinks.map((l) => l.href)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(sections)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on outside-click. Without this, visitors on touch
  // devices have to find and tap the X button — annoying UX. The listener
  // is only attached when the menu is open, so we don't pay the cost when
  // it's closed. Also closes on Escape key for keyboard users.
  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    // Use mousedown not click so the menu closes before any underlying
    // link/button is activated (otherwise a tap on a project card would
    // both close the menu AND trigger the card click).
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(18,14,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,145,63,0.12)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-1">
          <span style={{ color: '#5C5446', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{'<'}</span>
          <span style={{ color: '#EDE4CF', fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em' }}>SK</span>
          <span style={{ color: '#C4913F', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{'/>'}</span>
        </button>

        {/* Availability badge - desktop */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.18)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span style={{ color: '#4ade80', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>Open to work</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                color: activeSection === link.href ? '#C4913F' : '#9A8E78',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)',
                position: 'relative',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 0',
              }}
            >
              {link.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: `translateX(-50%) scaleX(${activeSection === link.href ? 1 : 0})`,
                  width: '100%',
                  height: '1px',
                  background: '#C4913F',
                  transition: 'transform 0.25s ease',
                }}
              />
            </button>
          ))}

          <a
            href="/resume.pdf"
            download
            style={{
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: '#C4913F',
              border: '1px solid rgba(196,145,63,0.35)',
              padding: '5px 14px',
              borderRadius: '6px',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,145,63,0.1)'; e.currentTarget.style.borderColor = '#C4913F' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(196,145,63,0.35)' }}
          >
            resume.pdf
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          style={{ color: '#9A8E78', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — backdrop blur matches the scrolled navbar appearance */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(18,14,8,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderTop: '1px solid rgba(196,145,63,0.1)',
          }}
          className="md:hidden px-6 py-6 flex flex-col gap-5"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span style={{ color: '#4ade80', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>Open to work</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                color: activeSection === link.href ? '#C4913F' : '#9A8E78',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ color: '#5C5446', marginRight: '8px' }}>{'~/'}</span>
              {link.label}
            </button>
          ))}

          <a
            href="/resume.pdf"
            download
            style={{
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              color: '#C4913F',
              border: '1px solid rgba(196,145,63,0.35)',
              padding: '8px 14px',
              borderRadius: '6px',
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            resume.pdf
          </a>
        </div>
      )}
    </nav>
  )
}
