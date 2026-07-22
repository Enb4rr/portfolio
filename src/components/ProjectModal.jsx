import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { useState, useEffect } from 'react'

const ProjectModal = ({ project, onClose }) => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const [lightboxIndex, setLightboxIndex] = useState(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                if (lightboxIndex !== null) setLightboxIndex(null)
                else onClose()
            }
            if (lightboxIndex !== null && project.caseStudy.gallery) {
                if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
                if (e.key === 'ArrowRight' && lightboxIndex < project.caseStudy.gallery.length - 1) setLightboxIndex(lightboxIndex + 1)
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey) }
    }, [lightboxIndex])

    const sections = [
        { label: isGame ? '// overview' : 'Overview', content: project.caseStudy.overview },
        { label: isGame ? '// my role' : 'My Role', content: project.caseStudy.role },
        { label: isGame ? '// challenge' : 'The Challenge', content: project.caseStudy.challenge },
        { label: isGame ? '// solution' : 'The Solution', content: project.caseStudy.solution },
        { label: isGame ? '// result' : 'The Result', content: project.caseStudy.result },
    ]

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: 0.4, ease: 'easeOut' }} onClick={e => e.stopPropagation()} style={{ backgroundColor: t.bgSurface, border: `1px solid ${t.borderHover}`, borderRadius: isGame ? '4px' : '16px', width: '100%', maxWidth: '800px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                    {isGame && <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '2px', background: `linear-gradient(to right, transparent, ${t.accent}, transparent)`, zIndex: 1 }} />}

                    <div style={{ padding: '28px 32px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
                        <div>
                            <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>{project.studio} · {project.year}</p>
                            <h2 style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: t.textPrimary, marginBottom: '4px' }}>{project.title}</h2>
                            <p style={{ fontFamily: t.fontBody, fontSize: '0.85rem', color: t.accent }}>{project.role}</p>
                        </div>
                        <motion.button whileHover={{ scale: 1.1, backgroundColor: t.accentDim }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{ background: 'transparent', border: `1px solid ${t.border}`, color: t.textSecondary, cursor: 'pointer', borderRadius: isGame ? '2px' : '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: '1rem', flexShrink: 0 }}>
                            {isGame ? '[X]' : '×'}
                        </motion.button>
                    </div>

                    <div style={{ overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: t.bgPrimary, borderRadius: isGame ? '4px' : '8px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                            {project.caseStudy.video
                                ? <iframe src={project.caseStudy.video} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                                : (
                                    <>
                                        <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontFamily: t.fontDisplay, fontSize: '0.75rem', color: t.textSecondary, letterSpacing: '0.2em' }}>
                                            {isGame ? '[ VIDEO / GAMEPLAY COMING SOON ]' : 'Video coming soon'}
                                        </motion.div>
                                        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: `linear-gradient(to right, transparent, ${t.accent}08, transparent)` }} />
                                    </>
                                )
                            }
                        </div>

                        {project.caseStudy.images && project.caseStudy.images.some(Boolean) && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {project.caseStudy.images.map((img, i) => (
                                    <div key={i} style={{ aspectRatio: '16/9', backgroundColor: t.bgPrimary, borderRadius: isGame ? '4px' : '8px', border: `1px solid ${t.border}`, overflow: 'hidden' }}>
                                        {img ? <img src={img} alt={`${project.title} screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: t.fontBody, fontSize: '0.65rem', color: t.textSecondary, letterSpacing: '0.1em' }}>Screenshot {i + 1}</span></div>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {sections.map((sec, i) => (
                            <motion.div key={sec.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                                <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', textTransform: isGame ? 'none' : 'uppercase', marginBottom: '10px' }}>{sec.label}</p>
                                <p style={{ fontFamily: t.fontBody, fontSize: '0.9rem', color: t.textSecondary, lineHeight: 1.8 }}>{sec.content}</p>
                            </motion.div>
                        ))}

                        <div>
                            <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', textTransform: isGame ? 'none' : 'uppercase', marginBottom: '12px' }}>{isGame ? '// tech stack' : 'Tech Stack'}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {project.caseStudy.tech.map((tech, i) => (
                                    <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ fontFamily: t.fontBody, fontSize: '0.78rem', color: t.accent, border: `1px solid ${t.accent}44`, borderRadius: isGame ? '2px' : '20px', padding: '4px 12px' }}>{tech}</motion.span>
                                ))}
                            </div>
                        </div>

                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', backgroundColor: t.accent, color: t.bgPrimary, borderRadius: isGame ? '4px' : '8px', fontFamily: t.fontDisplay, fontSize: '0.85rem', fontWeight: 700, letterSpacing: isGame ? '0.1em' : '0.02em', alignSelf: 'flex-start' }}>
                                {isGame ? 'VIEW PROJECT →' : 'View Project →'}
                            </a>
                        )}

                        {project.caseStudy.gallery && project.caseStudy.gallery.length > 0 && (
                            <div>
                                <p style={{ fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', textTransform: isGame ? 'none' : 'uppercase', marginBottom: '16px' }}>
                                    {isGame ? '// gallery' : 'Gallery'}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                                    {project.caseStudy.gallery.map((img, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6) }}
                                            whileHover={{ scale: 1.05, zIndex: 2 }}
                                            onClick={() => setLightboxIndex(i)}
                                            style={{ aspectRatio: '1', backgroundColor: t.bgPrimary, borderRadius: isGame ? '2px' : '6px', border: `1px solid ${t.border}`, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                                        >
                                            <img src={img} alt={`${project.title} gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {lightboxIndex !== null && project.caseStudy.gallery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLightboxIndex(null)}
                    style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setLightboxIndex(null)}
                        style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: `1px solid ${t.border}`, color: t.textPrimary, cursor: 'pointer', borderRadius: isGame ? '2px' : '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: '1.2rem' }}
                    >
                        {isGame ? '[X]' : '×'}
                    </motion.button>

                    {lightboxIndex > 0 && (
                        <motion.button
                            whileHover={{ scale: 1.1, x: -4 }}
                            onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1) }}
                            style={{ position: 'absolute', left: '24px', background: 'transparent', border: `1px solid ${t.border}`, color: t.textPrimary, cursor: 'pointer', borderRadius: isGame ? '2px' : '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: '1.3rem' }}
                        >
                            ←
                        </motion.button>
                    )}

                    {lightboxIndex < project.caseStudy.gallery.length - 1 && (
                        <motion.button
                            whileHover={{ scale: 1.1, x: 4 }}
                            onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1) }}
                            style={{ position: 'absolute', right: '24px', background: 'transparent', border: `1px solid ${t.border}`, color: t.textPrimary, cursor: 'pointer', borderRadius: isGame ? '2px' : '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fontDisplay, fontSize: '1.3rem' }}
                        >
                            →
                        </motion.button>
                    )}

                    <motion.img
                        key={lightboxIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        onClick={e => e.stopPropagation()}
                        src={project.caseStudy.gallery[lightboxIndex]}
                        alt={`${project.title} full view`}
                        style={{ maxWidth: '90%', maxHeight: '85vh', objectFit: 'contain', borderRadius: isGame ? '4px' : '8px', border: `1px solid ${t.border}` }}
                    />

                    <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', fontFamily: t.fontBody, fontSize: '0.75rem', color: t.textSecondary }}>
                        {lightboxIndex + 1} / {project.caseStudy.gallery.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProjectModal