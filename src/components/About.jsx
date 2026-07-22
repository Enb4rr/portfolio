import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { content } from '../data/content'
import profileImg from '../assets/profile.jpg'
import { useState, useEffect, useRef } from 'react'

const CounterStat = ({ value, label, t, isGame, delay }) => {
    const [count, setCount] = useState(0)
    const [inView, setInView] = useState(false)
    const ref = useRef(null)
    const numericValue = parseInt(value.replace(/\D/g, ''))

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true) }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        let start = 0
        const duration = 1500
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * numericValue))
            if (progress < 1) requestAnimationFrame(step)
        }
        setTimeout(() => requestAnimationFrame(step), delay * 1000)
    }, [inView])

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} style={{ textAlign: 'center', padding: '16px 24px', border: `1px solid ${t.border}`, borderRadius: isGame ? '2px' : '12px', backgroundColor: t.accentDim, position: 'relative', overflow: 'hidden' }}>
            {isGame && <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay }} style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '1px', background: `linear-gradient(to right, transparent, ${t.accent}, transparent)` }} />}
            <div style={{ fontFamily: t.fontDisplay, fontSize: '1.8rem', fontWeight: 700, color: t.accent }}>{count}{value.includes('+') ? '+' : ''}</div>
            <div style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
        </motion.div>
    )
}

const TypewriterText = ({ text, t, isGame, delay = 0 }) => {
    const [displayed, setDisplayed] = useState('')
    const [inView, setInView] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true) }, { threshold: 0.3 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        let i = 0
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                i++
                setDisplayed(text.slice(0, i))
                if (i >= text.length) clearInterval(interval)
            }, 18)
            return () => clearInterval(interval)
        }, delay * 1000)
        return () => clearTimeout(timer)
    }, [inView])

    return (
        <p ref={ref} style={{ color: t.textSecondary, lineHeight: 1.8, marginBottom: '16px', fontFamily: t.fontBody, fontSize: '0.95rem', minHeight: '3em' }}>
            {isGame ? <span><span style={{ color: t.accent }}>{'> '}</span>{displayed}</span> : displayed}
            {displayed.length < text.length && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ display: 'inline-block', width: '6px', height: '0.85em', backgroundColor: t.accent, marginLeft: '2px', verticalAlign: 'middle' }} />}
        </p>
    )
}

const CodeBlock = ({ t, lines }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ backgroundColor: '#0D1117', border: `1px solid ${t.border}`, borderRadius: '6px', padding: '20px 24px', marginTop: '24px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c }} />)}
        </div>
        {lines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }} style={{ color: line.color === 'secondary' ? t.accentSecondary : line.color === 'green' ? '#39FF14' : t.accent, lineHeight: 1.8 }}>
                <span style={{ color: '#3d4450', marginRight: '16px', userSelect: 'none' }}>{i + 1}</span>
                {line.code}
            </motion.div>
        ))}
        <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', bottom: '12px', right: '16px', fontSize: '0.65rem', color: t.textSecondary }}>● LIVE</motion.div>
    </motion.div>
)

const GlitchTag = ({ tag, i, t }) => {
    const [glitching, setGlitching] = useState(false)
    const color = i % 3 === 0 ? t.accentSecondary : t.accent
    return (
        <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} onHoverStart={() => { setGlitching(true); setTimeout(() => setGlitching(false), 400) }} whileHover={{ scale: 1.1 }} style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: glitching ? color : 'transparent', color: glitching ? t.bgPrimary : color, border: `1px solid ${color}44`, borderRadius: '2px', fontSize: '0.78rem', fontWeight: 500, fontFamily: t.fontBody, cursor: 'default', transition: 'all 0.1s ease', textShadow: glitching ? `2px 0 ${t.accentSecondary}, -2px 0 ${t.accent}` : 'none' }}>
            {glitching ? tag.split('').map((c, idx) => Math.random() > 0.7 ? String.fromCharCode(c.charCodeAt(0) + Math.floor(Math.random() * 3)) : c).join('') : tag}
        </motion.span>
    )
}

const FloatingTag = ({ tag, i, t }) => {
    const color = i % 3 === 0 ? t.accentSecondary : t.accent
    return (
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} animate={{ y: [0, -3, 0] }} whileHover={{ scale: 1.08, backgroundColor: `${color}18` }} style={{ display: 'inline-block', padding: '5px 14px', backgroundColor: 'transparent', color, border: `1px solid ${color}33`, borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500, fontFamily: t.fontBody, cursor: 'default', transition: 'background-color 0.2s ease' }}>
            {tag}
        </motion.span>
    )
}

const ScanlinePhoto = ({ t, isGame }) => {
    const ref = useRef(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 150, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 150, damping: 20 })

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
    }

    return (
        <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }} style={{ position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '1', cursor: 'pointer', perspective: '800px' }}>
            <motion.div style={{ rotateX, rotateY, width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}>
                <motion.img src={profileImg} alt="Julian Rosero" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: isGame ? '4px' : '8px', display: 'block', filter: isGame ? 'grayscale(30%) saturate(0.8)' : 'grayscale(10%)' }} />
                {isGame && (
                    <>
                        <motion.div animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: `linear-gradient(to bottom, transparent, ${t.accent}08, transparent)`, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)', borderRadius: '4px', pointerEvents: 'none' }} />
                        <motion.div animate={{ opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} style={{ position: 'absolute', inset: 0, border: `2px solid ${t.accent}`, borderRadius: '4px', pointerEvents: 'none' }} />
                    </>
                )}
                {!isGame && <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }} style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', background: `linear-gradient(to right, transparent, ${t.accentSecondary}12, transparent)`, pointerEvents: 'none' }} />}
                <motion.div whileHover={{ boxShadow: `0 0 60px ${t.accentGlow}` }} style={{ position: 'absolute', inset: 0, borderRadius: isGame ? '4px' : '8px', border: `1px solid ${t.borderHover}`, boxShadow: `0 0 30px ${t.accentGlow}`, pointerEvents: 'none' }} />
                {isGame && <motion.div initial={{ opacity: 0.3 }} whileHover={{ opacity: 0.7 }} style={{ position: 'absolute', top: '-8px', left: '-8px', right: '8px', bottom: '8px', border: `1px solid ${t.accent}44`, borderRadius: '4px', pointerEvents: 'none' }} />}
            </motion.div>
        </motion.div>
    )
}

const About = () => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const c = content[mode].about

    return (
        <section id="about" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="section-label" style={{ color: t.accentSecondary, fontFamily: t.fontBody }}>
                {c.sectionLabel}
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
                {c.stats.map((s, i) => <CounterStat key={s.label} value={s.value} label={s.label} t={t} isGame={isGame} delay={i * 0.15} />)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                <div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, fontStyle: isGame ? 'normal' : 'italic', color: t.textPrimary, marginBottom: '24px', lineHeight: 1.3 }}>
                        {c.title}
                    </motion.h2>

                    {c.paragraphs.map((p, i) => <TypewriterText key={mode + i} text={p} t={t} isGame={isGame} delay={isGame ? 0.4 + i * 0.3 : 0.2 + i * 0.2} />)}

                    {isGame && c.codeBlock && <CodeBlock t={t} lines={c.codeBlock} />}
                </div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: 'flex', justifyContent: 'center' }}>
                    <ScanlinePhoto t={t} isGame={isGame} />
                </motion.div>
            </div>
        </section>
    )
}

export default About