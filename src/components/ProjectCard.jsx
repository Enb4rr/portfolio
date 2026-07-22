import { motion } from 'framer-motion'
import { tokens } from '../tokens'
import { useMode } from '../context/ModeContext'

const ProjectCard = ({ project, onClick }) => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: `0 20px 60px ${t.accentGlow}` }}
            onClick={onClick}
            style={{ backgroundColor: t.bgSurface, borderRadius: isGame ? '4px' : '12px', border: `1px solid ${t.border}`, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', transition: 'border-color 0.3s ease', position: 'relative' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.borderHover }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.border }}
        >
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: t.bgPrimary, position: 'relative', overflow: 'hidden' }}>
                {project.gif
                    ? <img src={project.gif} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {isGame
                                ? <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontFamily: t.fontDisplay, fontSize: '0.7rem', color: t.accent, letterSpacing: '0.2em' }}>[ FOOTAGE COMING SOON ]</motion.div>
                                : <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.textSecondary, letterSpacing: '0.1em' }}>Preview coming soon</motion.div>
                            }
                            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', background: `linear-gradient(to right, transparent, ${t.accent}08, transparent)`, pointerEvents: 'none' }} />
                        </div>
                    )
                }
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} style={{ position: 'absolute', inset: 0, backgroundColor: `${t.bgPrimary}CC`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: t.fontDisplay, fontSize: '0.75rem', color: t.accent, letterSpacing: '0.2em', border: `1px solid ${t.accent}`, padding: '8px 20px', borderRadius: isGame ? '2px' : '20px' }}>
            {isGame ? '[ VIEW CASE STUDY ]' : 'View Case Study'}
          </span>
                </motion.div>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.textSecondary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{project.studio} · {project.year}</p>
                        <h3 style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: '1.1rem', color: t.textPrimary, marginBottom: '2px' }}>{project.title}</h3>
                        <p style={{ fontFamily: t.fontBody, fontSize: '0.78rem', color: t.accent, fontWeight: 500 }}>{project.role}</p>
                    </div>
                    {isGame && <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: t.accentSecondary, flexShrink: 0, marginTop: '4px' }} />}
                </div>
                <p style={{ fontFamily: t.fontBody, fontSize: '0.82rem', color: t.textSecondary, lineHeight: 1.6, flex: 1 }}>{project.shortDesc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {project.skills.map((s, i) => (
                        <span key={s} style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, border: `1px solid ${t.accentSecondary}33`, borderRadius: isGame ? '2px' : '10px', padding: '2px 8px' }}>{s}</span>
                    ))}
                </div>
            </div>

            {isGame && <motion.div animate={{ scaleX: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: t.accent, transformOrigin: 'left', opacity: 0.4 }} />}
        </motion.div>
    )
}

export default ProjectCard