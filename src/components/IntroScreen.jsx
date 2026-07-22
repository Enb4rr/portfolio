import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useMode } from '../context/ModeContext'
import { SiUnity, SiUnrealengine, SiEpicgames, SiReact, SiDotnet, SiFirebase, SiMongodb, SiPython, SiPostman, SiAndroid } from 'react-icons/si'

const TypingTitle = ({ text, font, accent, hovered }) => {
    const [displayed, setDisplayed] = useState('')
    const intervalRef = useRef(null)

    useEffect(() => {
        clearInterval(intervalRef.current)
        if (hovered) {
            let i = 0
            intervalRef.current = setInterval(() => {
                i++
                setDisplayed(text.slice(0, i))
                if (i >= text.length) clearInterval(intervalRef.current)
            }, 40)
        } else {
            let i = text.length
            intervalRef.current = setInterval(() => {
                i--
                setDisplayed(text.slice(0, i))
                if (i <= 0) clearInterval(intervalRef.current)
            }, 25)
        }
        return () => clearInterval(intervalRef.current)
    }, [hovered])

    return (
        <h2 style={{ fontFamily: font, fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, color: accent, letterSpacing: '0.12em', marginBottom: '20px', minHeight: '1.2em' }}>
            {displayed || <span style={{ opacity: 0 }}>{text}</span>}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ display: 'inline-block', width: '2px', height: '0.8em', backgroundColor: accent, marginLeft: '4px', verticalAlign: 'middle' }} />
        </h2>
    )
}

const sides = [
    {
        key: 'game',
        label: 'Games',
        bg: '#0D1117',
        accent: '#BF5FFF',
        accentSecondary: '#39FF14',
        font: "'JetBrains Mono', monospace",
        keywords: [
            { label: 'Unity', icon: SiUnity },
            { label: 'Unreal Engine', icon: SiUnrealengine },
            { label: 'UEFN', icon: null },
            { label: 'C#', icon: null },
            { label: 'C++', icon: null },
            { label: 'Verse', icon: null },
            { label: 'UI Programming', icon: null },
            { label: 'Tech Art', icon: null },
        ],
        enter: '[ ENTER ]',
    },
    {
        key: 'software',
        label: 'Software',
        bg: '#000000',
        accent: '#F5F5F7',
        accentSecondary: '#E8D5B7',
        font: "'Fraunces', serif",
        keywords: [
            { label: 'Full Stack', icon: null },
            { label: 'React', icon: SiReact },
            { label: 'React Native', icon: SiReact },
            { label: 'Python', icon: SiPython },
            { label: '.NET', icon: SiDotnet },
            { label: 'Firebase', icon: SiFirebase },
            { label: 'MongoDB', icon: SiMongodb },
            { label: 'Mobile', icon: SiAndroid },
            { label: 'API', icon: SiPostman },
        ],
        enter: 'Enter →',
    }
]

const IntroScreen = ({ onEnter }) => {
    const { setMode } = useMode()
    const [hovered, setHovered] = useState(null)
    const [selected, setSelected] = useState(null)

    const handleSelect = (mode) => {
        setSelected(mode)
        setMode(mode)
        setTimeout(onEnter, 800)
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: selected ? 0 : 1 }}
            transition={{ duration: 0.6, delay: selected ? 0.2 : 0 }}
            style={{ position: 'fixed', inset: 0, display: 'flex', zIndex: 1000 }}
        >
            {sides.map((side, i) => (
                <motion.div
                    key={side.key}
                    onMouseEnter={() => setHovered(side.key)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleSelect(side.key)}
                    animate={{ width: hovered === side.key ? '62%' : hovered ? '38%' : '50%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{
                        height: '100%',
                        backgroundColor: side.bg,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRight: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    }}
                >
                    <motion.div
                        animate={{ opacity: hovered === side.key ? 1 : hovered ? 0.25 : 0.65, scale: hovered === side.key ? 1 : 0.96 }}
                        transition={{ duration: 0.35 }}
                        style={{ textAlign: 'center', padding: '40px', position: 'relative', zIndex: 1 }}
                    >
                        <motion.p animate={{ opacity: hovered === side.key ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ fontFamily: side.font, fontSize: '0.7rem', letterSpacing: '0.3em', color: side.accentSecondary, marginBottom: '24px' }}>
                            {side.enter}
                        </motion.p>

                        <TypingTitle text={side.label} font={side.font} accent={side.accent} hovered={hovered === side.key} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '320px' }}>
                            {side.keywords.map((kw, idx) => (
                                <motion.span
                                    key={kw.label}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: hovered === side.key ? 0.7 : 0.2, y: 0 }}
                                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                                    style={{ fontFamily: side.font, fontSize: '0.7rem', color: side.accentSecondary, letterSpacing: '0.08em', padding: '4px 10px', border: `1px solid ${idx % 3 === 0 ? side.accentSecondary : side.accent}22`, borderRadius: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                    {kw.icon && <kw.icon size={11} />}
                                    {kw.label}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ scaleX: hovered === side.key ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: side.accent, transformOrigin: 'left' }}
                    />
                </motion.div>
            ))}

            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, textAlign: 'center', pointerEvents: 'none', padding: '36px 0' }}>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', textTransform: 'uppercase' }}>Vancouver, BC · Open to roles</p>
                    <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>Julian Rosero</h1>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }}
            >
                HOVER TO EXPLORE · CLICK TO ENTER
            </motion.div>
        </motion.div>
    )
}

export default IntroScreen