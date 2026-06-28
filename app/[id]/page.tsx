import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ScholarshipPage({ params }: { params: { id: string } }) {
  const { data: s, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', params.id)
    .eq('is_published', true)
    .single()

  if (error || !s) notFound()

  const checklist: string[] = s.checklist_mm ? JSON.parse(s.checklist_mm) : []

  function formatDeadline(d?: string) {
    if (!d || d === 'Rolling') return 'Rolling'
    const date = new Date(d)
    if (isNaN(date.getTime())) return d
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="container">
      <div className="detail">
        <Link href="/" className="detail-back">← Back to all scholarships</Link>

        <h1>{s.name}</h1>
        {s.name_mm && <p className="mm" style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{s.name_mm}</p>}
        <span className="detail-country">{s.country}</span>

        <div className="detail-grid">
          {s.level && (
            <div className="detail-item">
              <label>Level</label>
              <span style={{ textTransform: 'capitalize' }}>{s.level}</span>
            </div>
          )}
          {s.field && (
            <div className="detail-item">
              <label>Fields</label>
              <span>{s.field}</span>
            </div>
          )}
          {s.deadline && (
            <div className="detail-item">
              <label>Deadline</label>
              <span style={{ color: 'var(--ruby)' }}>{formatDeadline(s.deadline)}</span>
            </div>
          )}
          {s.host_org && (
            <div className="detail-item">
              <label>Offered by</label>
              <span>{s.host_org}</span>
            </div>
          )}
          {s.covers && (
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <label>Covers</label>
              <span>{s.covers}</span>
            </div>
          )}
        </div>

        {/* Requirements - Burmese */}
        {s.requirements_mm && (
          <div className="section-card">
            <h2>လိုအပ်ချက်များ (Requirements)</h2>
            <p className="mm" style={{ whiteSpace: 'pre-line', fontSize: '0.95rem' }}>{s.requirements_mm}</p>
          </div>
        )}

        {/* Document checklist - Burmese */}
        {checklist.length > 0 && (
          <div className="section-card">
            <h2>ပြင်ဆင်ရမည့် စာရွက်စာတမ်းများ (Documents Needed)</h2>
            <ul className="checklist mm">
              {checklist.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}

        {/* Preparation instructions - Burmese */}
        {s.instructions_mm && (
          <div className="section-card">
            <h2>လျှောက်ထားနည်း အဆင့်ဆင့် (How to Apply)</h2>
            <div className="mm" style={{ whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: '2' }}>
              {s.instructions_mm}
            </div>
          </div>
        )}

        {/* Original English requirements (collapsed) */}
        <details style={{ marginBottom: '1.25rem' }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: 'var(--muted)', padding: '0.5rem 0' }}>
            View original requirements (English)
          </summary>
          <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--ink)' }}>
            {s.requirements}
          </div>
        </details>

        {/* Apply button */}
        <a href={s.source_url} target="_blank" rel="noopener noreferrer" className="apply-btn">
          Apply Now →
        </a>

        {/* Coffee banner - shown after Apply */}
        <div className="coffee-banner">
          ☕ ဤပညာသင်ဆု ရရှိပါက ကျွန်ုပ်တို့အား{' '}
          <a href="https://buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer">
            ကော်ဖီတစ်ခွက် ဝယ်ကျွေးနိုင်ပါသည်
          </a>
          {' '}— ဝန်ဆောင်မှုကို ဆက်လက်ထိန်းသိမ်းနိုင်ရန် ကူညီပါမည် 🙏
        </div>
      </div>
    </div>
  )
}
