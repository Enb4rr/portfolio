import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { content } from '../data/content'
import { SiGithub } from 'react-icons/si'

const LinkedInIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
)

const TypingLabel = ({ text, color, fontFamily }) => {
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState('typing')
    const intervalRef = useRef(null)

    useEffect(() => {
        setDisplayed('')
        setPhase('typing')
    }, [text])

    useEffect(() => {
        clearInterval(intervalRef.current)
        if (phase === 'typing') {
            let i = 0
            intervalRef.current = setInterval(() => {
                i++
                setDisplayed(text.slice(0, i))
                if (i >= text.length) { clearInterval(intervalRef.current); setTimeout(() => setPhase('waiting'), 3000) }
            }, 35)
        } else if (phase === 'waiting') {
            setTimeout(() => setPhase('deleting'), 500)
        } else if (phase === 'deleting') {
            let i = text.length
            intervalRef.current = setInterval(() => {
                i--
                setDisplayed(text.slice(0, i))
                if (i <= 0) { clearInterval(intervalRef.current); setTimeout(() => setPhase('typing'), 400) }
            }, 20)
        }
        return () => clearInterval(intervalRef.current)
    }, [phase, text])

    return (
        <p className="section-label" style={{ color, fontFamily, marginBottom: '24px', minHeight: '1.2em' }}>
            {displayed}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', width: '6px', height: '0.75em', backgroundColor: color, marginLeft: '3px', verticalAlign: 'middle' }} />
        </p>
    )
}

const btnPrimary = (t, isGame) => ({ padding: '13px 32px', backgroundColor: t.accent, color: t.bgPrimary, borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', fontFamily: t.fontDisplay, letterSpacing: isGame ? '0.1em' : '0.02em', transition: 'opacity 0.2s ease', display: 'inline-block' })
const btnSecondary = (t, isGame) => ({ padding: '13px 32px', backgroundColor: 'transparent', color: t.accent, border: `1px solid ${t.borderHover}`, borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', fontFamily: t.fontDisplay, letterSpacing: isGame ? '0.1em' : '0.02em', transition: 'background-color 0.2s ease', display: 'inline-block' })
const btnGhost = (t, isGame) => ({ padding: '13px 16px', backgroundColor: 'transparent', color: t.textSecondary, border: `1px solid ${t.border}`, borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem', fontFamily: t.fontDisplay, letterSpacing: isGame ? '0.1em' : '0.02em', transition: 'color 0.2s ease, border-color 0.2s ease', display: 'inline-block' })

const Hero = () => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const c = content[mode].hero

    return (
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {isGame && c.showreel && (
                <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', zIndex: 0 }} src={c.showreel} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: isGame ? 'linear-gradient(to right, rgba(13,17,23,0.75) 45%, rgba(13,17,23,0.35)), linear-gradient(to bottom, rgba(13,17,23,0.6) 0%, transparent 20%, transparent 70%, rgba(13,17,23,1) 100%)' : 'linear-gradient(to right, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.5)), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,1) 100%)', zIndex: 1 }} />

            <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                <TypingLabel key={mode} text={c.label} color={t.accentSecondary} fontFamily={t.fontBody} />

                <motion.h1 key={mode + 'title'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: t.fontDisplay, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '12px', color: t.textPrimary, letterSpacing: isGame ? '0.04em' : '-0.02em' }}>
                    {c.title}<br /><span style={{ color: t.accent }}>{c.titleAccent}</span><span style={{ color: t.accentSecondary }}>.</span>
                </motion.h1>

                <motion.h2 key={mode + 'subtitle'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: isGame ? 400 : 300, fontStyle: isGame ? 'normal' : 'italic', color: t.textSecondary, marginBottom: '48px', maxWidth: '520px', lineHeight: 1.6, letterSpacing: isGame ? '0.05em' : '0.01em' }}>
                    {c.subtitle}
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a href="#projects" style={btnPrimary(t, isGame)} onMouseEnter={e => { e.target.style.opacity = '0.85' }} onMouseLeave={e => { e.target.style.opacity = '1' }}>{isGame ? 'VIEW PROJECTS' : 'View Projects'}</a>
                    <a href={c.cvPath} download style={btnSecondary(t, isGame)} onMouseEnter={e => { e.currentTarget.style.backgroundColor = t.accentDim }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}>{isGame ? 'DOWNLOAD CV' : 'Download CV'}</a>
                    <a href={c.github} target="_blank" rel="noopener noreferrer" style={btnGhost(t, isGame)} onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.borderHover }} onMouseLeave={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.borderColor = t.border }}><SiGithub size={18} /></a>
                    <a href={c.linkedin} target="_blank" rel="noopener noreferrer" style={btnGhost(t, isGame)} onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.borderHover }} onMouseLeave={e => { e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.borderColor = t.border }}><LinkedInIcon size={18} /></a>
                </motion.div>
            </div>
        </section>
    )
}
export default Hero