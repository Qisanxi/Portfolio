import { useState, useEffect } from 'react'
import { Mail, ArrowDown } from 'lucide-react'

const roles = [
  'Fullstack Developer',
  'Flutter Developer',
  'AI Enthusiast',
  'Team Leader',
]

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, 40)
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

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">

        {/* Top line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-indigo-400"></div>
          <span className="text-indigo-400 text-sm font-mono">Hello, world</span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Sandeep<span className="text-indigo-400">.</span>
          <br />
          Kumar<span className="text-indigo-400">.</span>
        </h1>

        {/* Typing role */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-slate-400 text-lg font-mono">{'~$'}</span>
          <span className="text-indigo-300 text-xl md:text-2xl font-mono">
            {displayed}
            <span className="animate-pulse text-indigo-400">|</span>
          </span>
        </div>

        {/* Bio */}
        <p className="text-slate-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          I build things for the web and mobile — fullstack applications,
          AI-powered tools, and everything in between. Currently leading
          Team 9 at the Excelerate Flutter Internship.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={scrollToProjects}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            View my work
          </button>
          <a href="/resume.pdf" download className="text-indigo-400 border border-indigo-400/40 hover:border-indigo-400 hover:bg-indigo-400/10 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-200">
            resume.pdf
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a href="https://github.com/Qisanxi" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <LinkedInIcon />
          </a>
          <a href="mailto:your@email.com" className="text-slate-500 hover:text-white transition-colors">
            <Mail size={20} />
          </a>
          <div className="w-px h-4 bg-slate-700"></div>
          <span className="text-slate-600 text-xs font-mono">github.com/Qisanxi</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-600 text-xs font-mono">scroll</span>
        <ArrowDown size={14} className="text-slate-600" />
      </div>
    </section>
  )
}