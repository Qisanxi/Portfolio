import { useState, useEffect } from 'react'
import { Mail, ArrowDown } from 'lucide-react'
import Button from '../ui/Button'

const roles = [
  'Software Engineer',
  'Python Backend Developer',
  'AI-Integrated Full-Stack Dev',
  'FastAPI & React Developer',
]

import { GitHubIcon, LinkedInIcon } from '../../lib/icons'
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

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
      timeout = setTimeout(() => setIsDeleting(true), 2000)
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
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">

          {/* Left — text content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-indigo-400"></div>
              <span className="text-indigo-400 text-sm font-mono">Hello, world</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
              Sandeep<span className="text-indigo-400">.</span>
              <br />
              Kumar<span className="text-indigo-400">.</span>
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-slate-400 text-lg font-mono">{'~$'}</span>
              <span className="text-indigo-300 text-xl md:text-2xl font-mono">
                {displayed}
                <span className="animate-pulse text-indigo-400">|</span>
              </span>
            </div>

            <p className="text-slate-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              Self-driven developer with a strong foundation in Python backend and
              AI-integrated full-stack development. I build tools that solve real problems —
              from autonomous content agents to AI-powered fee collection platforms.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button onClick={scrollToProjects}>View my work</Button>
              <Button href="/resume.pdf" download variant="outline">resume.pdf</Button>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors duration-200">
                <GitHubIcon />
              </a>
              <a href="https://www.linkedin.com/in/sandeep-qisanxi" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors duration-200">
                <LinkedInIcon />
              </a>
              <a href="mailto:sandeepkumarultra615615@gmail.com" className="text-slate-500 hover:text-white transition-colors duration-200">
                <Mail size={20} />
              </a>
              <div className="w-px h-4 bg-slate-700"></div>
              <span className="text-slate-600 text-xs font-mono">github.com/Qisanxi</span>
            </div>
          </div>

          {/* Right — profile photo
              Drop your photo at frontend/public/profile.jpg (or .png / .webp)
              The image hides itself automatically if the file doesn't exist yet. */}
          <div className="hidden md:flex flex-col items-center gap-4 flex-shrink-0">
            <div
              className="relative"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #312e81 100%)',
                borderRadius: '50%',
                padding: '3px',
                boxShadow: '0 0 40px rgba(99,102,241,0.3)',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Sandeep Kumar"
                onError={(e) => { e.currentTarget.closest('.relative').style.display = 'none' }}
                style={{
                  width: '200px', height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  background: '#1e1b4b',
                }}
              />
            </div>

            {/* Availability badge under photo */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-green-400 text-xs font-mono">Open to work</span>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-600 text-xs font-mono">scroll</span>
        <ArrowDown size={14} className="text-slate-600" />
      </div>
    </section>
  )
}
