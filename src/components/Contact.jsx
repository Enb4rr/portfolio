import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useMode } from '../context/ModeContext'
import { tokens } from '../tokens'
import { contactContent } from '../data/contact'

const inputStyle = (t, isGame, focused) => ({
    width: '100%',
    padding: '14px 16px',
    backgroundColor: focused ? t.accentDim : t.bgPrimary,
    border: `1px solid ${focused ? t.accent : t.border}`,
    borderRadius: isGame ? '4px' : '8px',
    color: t.textPrimary,
    fontFamily: t.fontBody,
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused ? `0 0 16px ${t.accentGlow}` : 'none',
    boxSizing: 'border-box'
})

const Contact = () => {
    const { mode } = useMode()
    const t = tokens[mode]
    const isGame = mode === 'game'
    const c = contactContent[mode]
    const formRef = useRef(null)

    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [focused, setFocused] = useState({})
    const [status, setStatus] = useState(null)
    const [sending, setSending] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) return
        setSending(true)
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                { from_name: form.name, from_email: form.email, message: form.message, name: form.name, email: form.email },
                import.meta.env.VITE_EMAILJS_KEY
            )
            setStatus('success')
            setForm({ name: '', email: '', message: '' })
        } catch (err) {
            setStatus('error')
        } finally {
            setSending(false)
            setTimeout(() => setStatus(null), 4000)
        }
    }

    return (
        <section id="contact" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label" style={{ color: t.accentSecondary, fontFamily: t.fontBody }}>
                {c.sectionLabel}
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontFamily: isGame ? t.fontDisplay : "'Fraunces', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: t.textPrimary, marginBottom: '16px', fontStyle: isGame ? 'normal' : 'italic' }}>
                {c.title}
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: t.textSecondary, fontFamily: t.fontBody, fontSize: '0.95rem', marginBottom: '60px', maxWidth: '480px', lineHeight: 1.8 }}>
                {c.description}
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                        {c.links.map((item, i) => (
                            <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontFamily: t.fontBody, fontSize: '0.65rem', color: t.accentSecondary, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.label}</span>
                                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: t.fontBody, fontSize: '0.9rem', color: t.accent, textDecoration: 'none', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '0.7'} onMouseLeave={e => e.target.style.opacity = '1'}>{item.value}</a>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a href={`mailto:${c.links[0].value}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }} style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: t.accent, color: t.bgPrimary, borderRadius: isGame ? '4px' : '8px', fontFamily: t.fontDisplay, fontSize: '0.85rem', fontWeight: 700, letterSpacing: isGame ? '0.1em' : '0.02em', transition: 'opacity 0.2s ease' }} onMouseEnter={e => e.target.style.opacity = '0.85'} onMouseLeave={e => e.target.style.opacity = '1'}>
                        {c.cta}
                    </motion.a>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {['name', 'email'].map(field => (
                            <div key={field}>
                                <label style={{ display: 'block', fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', marginBottom: '8px' }}>{c.form[field].label}</label>
                                <input type={field === 'email' ? 'email' : 'text'} name={field} value={form[field]} placeholder={c.form[field].placeholder} onChange={handleChange} onFocus={() => setFocused({ ...focused, [field]: true })} onBlur={() => setFocused({ ...focused, [field]: false })} style={inputStyle(t, isGame, focused[field])} />
                            </div>
                        ))}

                        <div>
                            <label style={{ display: 'block', fontFamily: t.fontBody, fontSize: '0.7rem', color: t.accentSecondary, letterSpacing: '0.15em', marginBottom: '8px' }}>{c.form.message.label}</label>
                            <textarea name="message" value={form.message} placeholder={c.form.message.placeholder} onChange={handleChange} onFocus={() => setFocused({ ...focused, message: true })} onBlur={() => setFocused({ ...focused, message: false })} rows={5} style={{ ...inputStyle(t, isGame, focused.message), resize: 'vertical', minHeight: '120px' }} />
                        </div>

                        <motion.button type="submit" disabled={sending} whileHover={{ scale: sending ? 1 : 1.02 }} whileTap={{ scale: sending ? 1 : 0.98 }} style={{ padding: '14px 32px', backgroundColor: sending ? t.accentDim : t.accent, color: sending ? t.accent : t.bgPrimary, border: `1px solid ${t.accent}`, borderRadius: isGame ? '4px' : '8px', fontFamily: t.fontDisplay, fontSize: '0.85rem', fontWeight: 700, letterSpacing: isGame ? '0.1em' : '0.02em', cursor: sending ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}>
                            {sending && isGame && <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: `linear-gradient(to right, transparent, ${t.accent}30, transparent)` }} />}
                            {sending ? c.sendingLabel : c.sendLabel}
                        </motion.button>

                        <AnimatePresence>
                            {status && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ padding: '12px 16px', backgroundColor: status === 'success' ? 'rgba(57,255,20,0.08)' : 'rgba(255,80,80,0.08)', border: `1px solid ${status === 'success' ? '#39FF14' : '#FF5050'}`, borderRadius: isGame ? '4px' : '8px', fontFamily: t.fontBody, fontSize: '0.85rem', color: status === 'success' ? '#39FF14' : '#FF5050', textAlign: 'center' }}>
                                    {status === 'success' ? c.success : c.error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} style={{ marginTop: '80px', paddingTop: '40px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <span style={{ fontFamily: t.fontBody, fontSize: '0.75rem', color: t.textSecondary }}>{c.footer.left}</span>
                <span style={{ fontFamily: t.fontBody, fontSize: '0.75rem', color: t.textSecondary }}>{c.footer.right}</span>
            </motion.div>
        </section>
    )
}

export default Contact