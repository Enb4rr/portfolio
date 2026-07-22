import { useState, useEffect, useRef } from 'react'
import { useMode } from './context/ModeContext'
import { tokens } from './tokens'
import { AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

const GlobalBg = ({ mode }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const isGame = mode === 'game'
        let frame = 0

        const particles = isGame ? Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.3,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            color: Math.random() > 0.5 ? '#BF5FFF' : '#39FF14',
            opacity: Math.random() * 0.15 + 0.03
        })) : null

        const stars = !isGame ? Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.2 + 0.2,
            speed: Math.random() * 0.003 + 0.001
        })) : null

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < 4; i++) {
                const x = canvas.width * (0.15 + i * 0.22 + Math.sin(frame * 0.004 + i * 1.2) * 0.08)
                const y = canvas.height * (0.2 + Math.cos(frame * 0.003 + i * 0.8) * 0.2)
                const r = 350 + i * 80
                const grad = ctx.createRadialGradient(x, y, 0, x, y, r)

                if (isGame) {
                    grad.addColorStop(0, i % 2 === 0 ? 'rgba(191,95,255,0.04)' : 'rgba(57,255,20,0.025)')
                } else {
                    grad.addColorStop(0, 'rgba(232,213,183,0.045)')
                }
                grad.addColorStop(1, 'rgba(0,0,0,0)')
                ctx.fillStyle = grad
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            if (isGame && particles) {
                particles.forEach(p => {
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fillStyle = p.color
                    ctx.globalAlpha = p.opacity
                    ctx.fill()
                    p.x += p.speedX
                    p.y += p.speedY
                    if (p.x < 0) p.x = canvas.width
                    if (p.x > canvas.width) p.x = 0
                    if (p.y < 0) p.y = canvas.height
                    if (p.y > canvas.height) p.y = 0
                })
            }

            if (!isGame && stars) {
                stars.forEach(s => {
                    const opacity = 0.05 + Math.abs(Math.sin(frame * s.speed * 8)) * 0.15
                    ctx.beginPath()
                    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
                    ctx.fillStyle = '#E8D5B7'
                    ctx.globalAlpha = opacity
                    ctx.fill()
                })
            }

            ctx.globalAlpha = 1
            frame++
        }

        const interval = setInterval(draw, 30)
        return () => { clearInterval(interval); window.removeEventListener('resize', resize) }
    }, [mode])

    return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

function App() {
    const [entered, setEntered] = useState(false)
    const { mode } = useMode()
    const t = tokens[mode]

    useEffect(() => {
        const style = document.createElement('style')
        style.id = 'scrollbar-style'
        style.textContent = `
      ::-webkit-scrollbar-thumb { background: ${t.accent}; border-radius: 3px; }
      ::-webkit-scrollbar-track { background: ${t.bgPrimary}; }
    `
        const existing = document.getElementById('scrollbar-style')
        if (existing) existing.remove()
        document.head.appendChild(style)
    }, [mode])

    return (
        <div style={{ backgroundColor: t.bgPrimary, minHeight: '100vh', transition: 'background-color 0.5s ease', position: 'relative' }}>
            <AnimatePresence>
                {!entered && <IntroScreen onEnter={() => setEntered(true)} />}
            </AnimatePresence>

            {entered && (
                <>
                    <GlobalBg mode={mode} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Navbar />
                        <Hero />
                        <About />
                        <Projects />
                        <Skills />
                        <Contact />
                    </div>
                </>
            )}
        </div>
    )
}

export default App