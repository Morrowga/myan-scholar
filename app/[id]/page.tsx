import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Coffee, GraduationCap,Paperclip, Calendar, Globe, BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

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
          {s.start_date && (
            <div className="detail-item">
              <label>Start Date</label>
              <span>{s.start_date}</span>
            </div>
          )}
          {s.duration && (
            <div className="detail-item">
              <label>Duration</label>
              <span>{s.duration}</span>
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

          {s.field && (
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <label>Fields</label>
              <div className="mm-prose" ><ReactMarkdown>{s.field}</ReactMarkdown></div>
            </div>
          )}

          {s.covers && (
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <label>Award & Benefits</label>
              <div className="mm-prose"><ReactMarkdown>{s.covers}</ReactMarkdown></div>
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

        {s.original_content && (
          <details style={{ marginBottom: '1.25rem' }}>
            <summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: 'var(--muted)', padding: '0.5rem 0' }}>
              View Additional Description
            </summary>
            <div className='mm-prose' style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--ink)'}}>
            <ReactMarkdown>{s.original_content}</ReactMarkdown>
          </div>
          </details>
        )}

        {s.attachments && JSON.parse(s.attachments).length > 0 && (
          <div className="section-card" style={{ marginTop: '1rem' }}>
            <h2>Attachment Links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {JSON.parse(s.attachments).map((url: string, i: number) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--gold)', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                  <Paperclip size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.35rem' }} />
                   {url}
                </a>
              ))}
            </div>
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
        <div className="section-card">
          <h2>အကျဉ်းချုပ် (Summary)</h2>
          <ul className="checklist mm">
            {s.instructions_mm
              ?.split(/(?=[၁၂၃၄၅၆၇၈၉၀][။])/)
              .map(t => t.trim())
              .filter(t => t.length > 3)
              .map((item, i) => (
                <li key={i}>{item}</li>
              ))
            }
          </ul>
        </div>

        {/* Original English requirements (collapsed) */}
        <details style={{ marginBottom: '1.25rem' }}>
          <summary style={{ cursor: 'pointer', fontSize: '0.875rem', color: 'var(--muted)', padding: '0.5rem 0' }}>
            View original requirements (English)
          </summary>
          <div className='mm-prose' style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: '1.8', color: 'var(--ink)' }}>
            <ReactMarkdown>{s.requirements}</ReactMarkdown>
          </div>
        </details>

        <div style={{
          background: 'rgba(201,167,75,0.08)',
          border: '1px solid rgba(201,167,75,0.2)',
          borderRadius: 'var(--radius)',
          padding: '0.9rem 1.1rem',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7,
        }}>
          ⚠️ Please visit the official scholarship page for complete and up-to-date details before deciding.
        </div>

        {/* Apply button */}
        <a href={s.source_url} target="_blank" rel="noopener noreferrer" className="apply-btn">
          Apply Now →
        </a>

        {/* Coffee banner - shown after Apply */}
        <div className="coffee-banner">
          <Coffee size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
          {' '}
          <a href="https://buymeacoffee.com/your-username" target="_blank" rel="noopener noreferrer">
            buy me a coffee
          </a>
          {' '}
          when you get this scholarship
          {' '}
          <GraduationCap size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.35rem' }} />
        </div>
      </div>
    </div>
  )
}
