import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { gameSkills, softwareSkills } from '../data/skills'

const SimpleIcon = ({ slug, size = 24, color }) => {
    const [svg, setSvg] = useState(null)
    useEffect(() => {
        fetch(`https://cdn.simpleicons.org/${slug}`)
            .then(r => r.text())
            .then(text => setSvg(text))
            .catch(() => setSvg(null))
    }, [slug])
    if (!svg) return <span style={{ width: size, height: size, display: 'inline-block' }} />
    return <span style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color }} dangerouslySetInnerHTML={{ __html: svg.replace('<svg', `<svg width="${size}" height="${size}" fill="currentColor"`) }} />
}

const SkillCard = ({ item, t, isGame, delay }) => {
    const [hovered, setHovered] = useState(false)
    const color = hovered ? t.bgPrimary : t.accent

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay }} whileHover={{ scale: 1.08, y: -4 }} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} style={{ backgroundColor: hovered ? t.accent : t.accentDim, border: `1px solid ${hovered ? t.accent : t.border}`, borderRadius: isGame ? '4px' : '12px', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'default', transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden' }}>
            {isGame && hovered && <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '1px', background: `linear-gradient(to right, transparent, ${t.bgPrimary}, transparent)` }} />}

            <div style={{ color, transition: 'color 0.25s ease' }}>
                {item.icon && <item.icon size={28} color={color} />}
                {!item.icon && item.slug && <SimpleIcon slug={item.slug} size={28} color={color} />}
                {item.text && <span style={{ fontFamily: t.fontDisplay, fontSize: '1rem', fontWeight: 700, color, letterSpacing: isGame ? '0.05em' : '0' }}>{item.label.slice(0, 2).toUpperCase()}</span>}
            </div>

            <span style={{ fontFamily: t.fontBody, fontSize: '0.72rem', color: hovered ? t.bgPrimary : t.textSecondary, textAlign: 'center', letterSpacing: isGame ? '0.08em' : '0.02em', transition: 'color 0.25s ease', lineHeight: 1.3 }}>{item.label}</span>

            {isGame && <motion.div animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0 }} transition={{ repeat: Infinity, duration: 1 }} style={{ position: 'absolute', inset: 0, border: `1px solid ${t.accentSecondary}`, borderRadius: '4px', pointerEvents: 'none' }} />}
        </motion.div>
    )
}

const Skills = () => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const skills = isGame ? gameSkills : softwareSkills

    return (
        <section id="skills" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ color: t.accentSecondary, fontFamily: t.fontBody }}>
                {isGame ? '// skills' : 'Skills'}
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: t.textPrimary, marginBottom: '60px', fontStyle: isGame ? 'normal' : 'italic' }}>
                {isGame ? 'What I work with.' : 'My toolkit.'}
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {skills.map((cat, ci) => (
                    <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: ci * 0.1 }}>
                        <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
                            {isGame ? `// ${cat.category.toLowerCase()}` : cat.category}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
                            {cat.items.map((item, ii) => <SkillCard key={item.label} item={item} t={t} isGame={isGame} delay={ci * 0.1 + ii * 0.06} />)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Skills