import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollSpy } from '../../hooks/useScrollSpy'

const navLinks = [
  { label: 'About',    href: 'about'    },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills',   href: 'skills'   },
  { label: 'Contact',  href: 'contact'  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(['about', 'projects', 'skills', 'contact'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(15,23,42,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-1">
          <span className="text-slate-500 font-mono text-sm">{'<'}</span>
          <span className="text-white font-bold font-mono text-lg">SK</span>
          <span className="text-indigo-400 font-mono text-sm">{'/>'}</span>
        </button>

        {/* Availability badge - desktop */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{ color: activeSection === link.href ? '#818cf8' : '#94a3b8' }}
              className="relative text-sm transition-colors hover:text-white"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-indigo-400 transition-all duration-300"
                style={{
                  opacity: activeSection === link.href ? 1 : 0,
                  transform: `translateX(-50%) scale(${activeSection === link.href ? 1 : 0})`,
                }}
              />
            </button>
          ))}

          {/* Resume link - desktop */}
          <a
            href="/resume.pdf"
            download
            className="text-sm font-mono text-indigo-400 border border-indigo-400/40 hover:border-indigo-400 hover:bg-indigo-400/10 px-4 py-1.5 rounded transition-all duration-200"
          >
            resume.pdf
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(15,23,42,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
          className="md:hidden px-6 py-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-slate-400 hover:text-white text-sm text-left font-mono transition-colors"
            >
              <span className="text-indigo-400 mr-2">{'~/'}</span>
              {link.label}
            </button>
          ))}

          {/* Resume link - mobile */}
          <a
            href="/resume.pdf"
            download
            className="text-sm font-mono text-indigo-400 border border-indigo-400/40 px-4 py-2 rounded text-center"
          >
            resume.pdf
          </a>
        </div>
      )}
    </nav>
  )
}
