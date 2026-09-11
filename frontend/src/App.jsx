import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Blog from './components/sections/Blog'
import Certifications from './components/sections/Certifications'
import ChatWidget from './components/ui/ChatWidget'
import WarmBanner from './components/ui/WarmBanner'
import { useBackendWarm } from './hooks/useBackendWarm'

export default function App() {
  // Silent pre-warm: pings /api/health on mount to wake Render's sleeping
  // backend. Returns 'warming' | 'warm' | 'cold'. When warm, WarmBanner
  // appears at the top of the page nudging the visitor to use the chat.
  const warmStatus = useBackendWarm(import.meta.env.VITE_API_URL)

  return (
    <div className="min-h-screen" style={{ background: '#120E08', color: '#EDE4CF' }}>
      <WarmBanner warmStatus={warmStatus} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatWidget warmStatus={warmStatus} />
    </div>
  )
}
