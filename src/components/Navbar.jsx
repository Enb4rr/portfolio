import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'

const TypingLogo = ({ t, mode }) => {
    const text = 'Julian Rosero'
    const [displayed, setDisplayed] = useState('')
    const [phase, setPhase] = useState('typing')
    const intervalRef = useRef(null)

    useEffect(() => {
        const runPhase = (currentPhase) => {
            clearInterval(intervalRef.current)

            if (currentPhase === 'typing') {
                let i = 0
                intervalRef.current = setInterval(() => {
                    i++
                    setDisplayed(text.slice(0, i))
                    if (i >= text.length) {
                        clearInterval(intervalRef.current)
                        setTimeout(() => { setPhase('deleting') }, 2000)
                    }
                }, 60)
            } else if (currentPhase === 'deleting') {
                let i = text.length
                intervalRef.current = setInterval(() => {
                    i--
                    setDisplayed(text.slice(0, i))
                    if (i <= 0) {
                        clearInterval(intervalRef.current)
                        setTimeout(() => { setPhase('typing') }, 500)
                    }
                }, 35)
            }
        }

        runPhase(phase)
        return () => clearInterval(intervalRef.current)
    }, [phase])

    return (
        <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: '1rem', color: t.textPrimary, letterSpacing: mode === 'game' ? '0.08em' : '0.03em', minWidth: '160px', display: 'inline-block' }}>
      {displayed}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', width: '2px', height: '0.85em', backgroundColor: t.accent, marginLeft: '2px', verticalAlign: 'middle' }} />
    </span>
    )
}

const Navbar = () => {
    const { mode, toggleMode } = useMode()
    const t = tokens[mode]

    const links = ['About', 'Projects', 'Skills', 'Contact']

    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: `${t.bgPrimary}CC`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.border}`,
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
    }

    const linkStyle = {
        color: t.textSecondary,
        fontSize: '0.85rem',
        fontFamily: t.fontBody,
        fontWeight: 500,
        transition: 'color 0.2s ease',
        letterSpacing: mode === 'game' ? '0.08em' : '0.02em'
    }

    return (
        <motion.nav
            style={navStyle}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <TypingLogo t={t} mode={mode} />

            <div style={{ display: 'flex', gap: '32px' }}>
                {links.map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} style={linkStyle} onMouseEnter={e => { e.target.style.color = t.accent }} onMouseLeave={e => { e.target.style.color = t.textSecondary }}>{mode === 'game' ? item.toUpperCase() : item}</a>
                ))}
            </div>

            <div onClick={toggleMode} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
        <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.textSecondary, letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
          {mode === 'game' ? 'GAME' : 'Dev'}
        </span>

                <div style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: t.accentDim, border: `1px solid ${t.borderHover}`, position: 'relative', transition: 'background-color 0.3s ease, border-color 0.3s ease' }}>
                    <motion.div
                        animate={{ x: mode === 'game' ? 2 : 22 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ position: 'absolute', top: '2px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: t.accent, boxShadow: `0 0 8px ${t.accentGlow}`, transition: 'background-color 0.3s ease' }}
                    />
                </div>

                <span style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.textSecondary, letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
          {mode === 'game' ? 'SW' : 'Software'}
        </span>
            </div>
        </motion.nav>
    )
}

export default Navbar