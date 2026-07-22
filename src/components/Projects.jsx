import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { gameDev, software } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const gameFilters = ['All', 'Unity', 'UEFN', 'Verse', 'C#', 'UI Programming', 'Tech Art', 'Shader Graph', 'VFX Graph', 'Mobile']
const softwareFilters = ['All', 'React', 'React Native', 'Firebase', 'MongoDB', 'MySQL', 'Python', 'API Integration', 'Mobile', '.NET']

const Projects = () => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const [activeFilter, setActiveFilter] = useState('All')
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => { setActiveFilter('All') }, [mode])

    const projects = isGame ? gameDev : software
    const filters = isGame ? gameFilters : softwareFilters
    const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.skills.includes(activeFilter))

    const filterStyle = (active) => ({
        padding: '5px 14px',
        backgroundColor: active ? t.accent : 'transparent',
        color: active ? t.bgPrimary : t.accent,
        border: `1px solid ${t.borderHover}`,
        borderRadius: isGame ? '2px' : '20px',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: 500,
        fontFamily: t.fontBody,
        transition: 'all 0.2s ease',
        letterSpacing: isGame ? '0.08em' : '0.02em'
    })

    return (
        <section id="projects" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ color: t.accentSecondary, fontFamily: t.fontBody }}>
                    {isGame ? '// projects' : 'Projects'}
                </motion.p>

                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: t.textPrimary, marginBottom: '48px', fontStyle: isGame ? 'normal' : 'italic' }}>
                    {isGame ? "Things I've shipped." : "Things I've built."}
                </motion.h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                    {filters.map(f => (
                        <motion.button key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={filterStyle(activeFilter === f)} onClick={() => setActiveFilter(f)}>{f}</motion.button>
                    ))}
                </div>

                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {filtered.map(p => (
                        <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%' }}>
                            <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </section>
    )
}

export default Projects