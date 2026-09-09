import { GitHubIcon, LinkedInIcon } from '../../lib/icons'

const footerStyle = { borderTop: '1px solid rgba(255,255,255,0.06)' }

export default function Footer() {
  return (
    <footer className="px-6 py-8" style={footerStyle}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-1">
          <span className="text-slate-500 font-mono text-sm">{'<'}</span>
          <span className="text-white font-bold font-mono text-sm">SK</span>
          <span className="text-accent font-mono text-sm">{'/>'}</span>
        </div>

        <p className="text-slate-600 text-xs font-mono text-center">
          Built with React · FastAPI · PostgreSQL · Google GenAI SDK · AWS App Runner
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Qisanxi"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-white transition-colors"
            title="GitHub"
          >
            <GitHubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/sandeep-qisanxi"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href="mailto:sandeepkumarultra615615@gmail.com"
            className="text-slate-600 hover:text-white transition-colors text-xs font-mono"
          >
            Email
          </a>
        </div>

      </div>
    </footer>
  )
}
