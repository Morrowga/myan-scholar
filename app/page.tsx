'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Scholarship } from '@/types'

const LEVELS = ['any', 'undergraduate', 'masters', 'phd']

const COUNTRIES = [
  'All Countries', 'Japan', 'South Korea', 'Malaysia', 'Singapore',
  'Thailand', 'China', 'Taiwan', 'Australia', 'Germany', 'USA', 'UK'
]

export default function HomePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')
  const [level, setLevel] = useState('')

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
      <section className="hero">
        <div className="container">
          <h1>Scholarships for <span>Myanmar Citizens</span></h1>
          <p className="mm">ကမ္ဘာတစ်ဝှမ်းမှ ပညာသင်ဆုများ — မြန်မာဘာသာဖြင့် လမ်းညွှန်ချက်များနှင့်အတူ</p>
          <p style={{ marginTop: '0.5rem', opacity: 0.75, fontSize: '0.875rem' }}>
            Updated daily · All free · No registration needed
          </p>
        </div>
      </section>

      <div className="filters">
        <div className="container">
          <select className="filter-select" value={country} onChange={e => setCountry(e.target.value === 'All Countries' ? '' : e.target.value)}>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={level} onChange={e => setLevel(e.target.value === 'any' ? '' : e.target.value)}>
            <option value="">All Levels</option>
            {LEVELS.filter(l => l !== 'any').map(l => (
              <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
            ))}
          </select>
          {(country || level) && (
            <button style={{ fontSize: '0.85rem', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              onClick={() => { setCountry(''); setLevel('') }}>
              Clear filters
            </button>
          )}
          <span style={{ marginLeft: 'auto', fontSize: '0.825rem', color: 'var(--muted)' }}>
            {loading ? 'Loading…' : `${scholarships.length} scholarships`}
          </span>
        </div>
      </div>

      <div className="container">
        <div className="cards">
          {loading && (
            <div className="empty"><h2>Loading scholarships…</h2></div>
          )}
          {!loading && scholarships.length === 0 && (
            <div className="empty">
              <h2>No scholarships found</h2>
              <p>Try changing your filters</p>
            </div>
          )}
          {scholarships.map(s => {
            const urgent = daysLeft(s.deadline)
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
                    <span className={urgent && urgent !== 'Closed' ? 'card-deadline' : ''}>
                      {urgent === 'Closed' ? '⛔ Closed' : `📅 ${formatDeadline(s.deadline)}`}
                      {urgent && urgent !== 'Closed' ? ` · ${urgent}` : ''}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
