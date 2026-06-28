'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Calendar, Clock, XCircle } from 'lucide-react'
import { Scholarship } from '@/types'

const COUNTRIES = [
  'All Countries', 'Japan', 'South Korea', 'Malaysia', 'Singapore',
  'Thailand', 'China', 'Taiwan', 'Australia', 'Germany', 'USA', 'UK'
]
const LEVELS = ['undergraduate', 'masters', 'phd']

export default function HomePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')
  const [level, setLevel] = useState('')
  const [showScholar, setShowScholar] = useState(false)
  const scholarSection = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (country) params.set('country', country)
    if (level) params.set('level', level)
    setLoading(true)
    fetch(`/api/scholarships?${params}`)
      .then(r => r.json())
      .then(data => { setScholarships(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [country, level])

  function handleFindClick() {
    setShowScholar(true)
    setTimeout(() => {
      const el = scholarSection.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 0
      window.scrollTo({ top, behavior: 'smooth' })
    }, 300)
  }

  function formatDeadline(d?: string) {
    if (!d || d === 'Rolling') return 'Rolling'
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  function daysLeft(d?: string) {
    if (!d || d === 'Rolling') return null
    const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)
    if (diff < 0) return 'Closed'
    if (diff <= 30) return `${diff} days left`
    return null
  }

  return (
    <>
      {/* ── HERO — full viewport ── */}
      <section style={{
        minHeight: 'calc(100vh - 10px)',
        background: 'linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.88)), url(/assets/cloud.png) center center / cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(201,167,75,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,167,75,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}/>
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,167,75,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #C9A74B 50%, transparent 100%)',
        }}/>

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* LEFT — map */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', maxWidth: '360px', width: '100%' }}>
                <div style={{
                  position: 'absolute', inset: '-30px',
                  background: 'radial-gradient(ellipse, rgba(201,167,75,0.1) 0%, transparent 68%)',
                  pointerEvents: 'none',
                }}/>
                <img
                  src="/assets/mm.png"
                  alt="Myanmar map"
                  style={{
                    width: '100%', height: 'auto', position: 'relative',
                    filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.9))',
                    animation: 'floatMap 5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>

            {/* RIGHT — content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <img 
                  src="/assets/logo.png" 
                  alt="MyanScholar" 
                  style={{ height: '100px', width: 'auto', marginBottom: '1rem', display: 'block' }}
                />
                <h1 style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  fontWeight: 700, color: '#ffffff',
                  lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '0.75rem',
                }}>
                  Chase your<br />
                  <span style={{ color: '#C9A74B', textShadow: '0 0 40px rgba(201,167,75,0.3)' }}>scholarship</span><br />
                  dreams
                </h1>
                <p style={{
                  fontSize: '0.9rem', color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.7, maxWidth: '360px',
                }}>
                  Scholarships across Asia and beyond — with step-by-step guides written in Burmese so you know exactly what to do.
                </p>
              </div>

              <button
                onClick={handleFindClick}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#C9A74B', color: '#0a0a0a',
                  border: 'none', padding: '0.9rem 2.25rem',
                  borderRadius: '10px', fontSize: '1rem', fontWeight: 700,
                  cursor: 'pointer', alignSelf: 'flex-start',
                  letterSpacing: '0.01em', fontFamily: 'inherit',
                  boxShadow: '0 0 30px rgba(201,167,75,0.25)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = '#e0bc60'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 0 50px rgba(201,167,75,0.4)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = '#C9A74B'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 0 30px rgba(201,167,75,0.25)'
                }}
              >
                Find scholarships ↓
              </button>

              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
                UPDATED DAILY · FREE FOREVER · NO SIGN-UP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIP SECTION ── */}
      <div
        ref={scholarSection}
        style={{
          minHeight: '100vh',
          background: '#0a0a0a',
          display: showScholar ? 'block' : 'none',
        }}
      >
        {/* sticky filter bar */}
        <div className="filter-bar">
          <div className="container" style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <select className="filter-select" value={country}
              onChange={e => setCountry(e.target.value === 'All Countries' ? '' : e.target.value)}>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={level}
              onChange={e => setLevel(e.target.value)}>
              <option value="">All Levels</option>
              {LEVELS.map(l => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
            {(country || level) && (
              <button
                onClick={() => { setCountry(''); setLevel('') }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.825rem', background: 'none', border: 'none',
                  color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <XCircle size={14} /> Clear
              </button>
            )}
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--muted)' }}>
              {loading ? 'Loading…' : `${scholarships.length} scholarships`}
            </span>
          </div>
        </div>

        {/* cards */}
        <div className="container">
          <div className="cards">
            {loading && <div className="empty"><h2>Loading scholarships…</h2></div>}
            {!loading && scholarships.length === 0 && (
              <div className="empty">
                <h2>No scholarships found</h2>
                <p>Try changing your filters</p>
              </div>
            )}
            {scholarships.map(s => {
              const urgent = daysLeft(s.deadline)
              const isClosed = urgent === 'Closed'
              return (
                <Link key={s.id} href={`/${s.id}`} className="card">
                  <div className="card-top">
                    <div>
                      <div className="card-name">{s.name}</div>
                      {s.name_mm && <div className="card-name-mm mm">{s.name_mm}</div>}
                    </div>
                    <span className="card-country">{s.country}</span>
                  </div>
                  <div className="card-meta">
                    <span style={{ textTransform: 'capitalize' }}>{s.level}</span>
                    {s.host_org && <span>{s.host_org}</span>}
                    {s.deadline && (
                      <span
                        className={urgent && !isClosed ? 'card-deadline' : ''}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          color: isClosed ? 'var(--muted)' : undefined,
                        }}
                      >
                        {isClosed
                          ? <><XCircle size={13} /> Closed</>
                          : <><Calendar size={13} /> {formatDeadline(s.deadline)}{urgent ? ` · ${urgent}` : ''}</>
                        }
                      </span>
                    )}
                    {s.deadline === 'Rolling' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={13} /> Rolling
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatMap {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(0.3deg); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}