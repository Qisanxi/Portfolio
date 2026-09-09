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

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#120E08', color: '#EDE4CF' }}>
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
      <ChatWidget />
    </div>
  )
}
