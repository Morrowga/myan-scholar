'use client'
import { useEffect, useState } from 'react'
import { ScholarshipFormData } from '@/types'


const EMPTY: ScholarshipFormData = {
  name: '', country: '', level: 'masters', field: '',
  deadline: '', start_date: '', duration: '',
  source_url: '', host_org: '', covers: '', requirements: '',
  original_content: '',
}

export default function AddPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [form, setForm] = useState<ScholarshipFormData>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState<string[]>([''])
  const [pdfBase64, setPdfBase64] = useState<string | null>(null)
  const [pdfName, setPdfName] = useState<string>('')

  function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPdfName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPdfBase64(result.split(',')[1])
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    const match = document.cookie.match(/admin_authed=([^;]+)/)
    if (match && match[1]) {
      setPassword(match[1])
      setAuthed(true)
    }
  }, [])

  function login() {
    if (!password) return
    document.cookie = `admin_authed=${password}; max-age=86400; path=/`
    setAuthed(true)
  }

  function setField(k: keyof ScholarshipFormData, v: string) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function addAttachment() { setAttachments(a => [...a, '']) }
  function removeAttachment(i: number) { setAttachments(a => a.filter((_, idx) => idx !== i)) }
  function updateAttachment(i: number, val: string) {
    setAttachments(a => a.map((v, idx) => idx === i ? val : v))
  }

  async function handleSubmit() {
    if (!form.name || !form.country || !form.requirements || !form.source_url) {
      setMessage('Please fill in Name, Country, Source URL, and Requirements.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setMessage('')
    const validAttachments = attachments.filter(a => a.trim() !== '')
    const res = await fetch('/api/scholarships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ ...form, attachments: validAttachments, pdfBase64: pdfBase64 ?? undefined }),
    })
    const data = await res.json()
    if (!res.ok) { setStatus('error'); setMessage(data.error ?? 'Something went wrong'); return }
    setStatus('success')
    setMessage(`Saved! AI is generating Burmese content. ID: ${data.id}`)
    setForm(EMPTY)
    setAttachments([''])
    setPdfBase64(null)
    setPdfName('')
  }

  if (!authed) {
    return (
      <div className="container">
        <div className="add-form">
          <h1>Admin Access</h1>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') login() }} placeholder="Enter admin password" />
          </div>
          <button type="button" className="submit-btn" onClick={login}>Enter</button>
        </div>
      </div>
    )
  }

  const W = '1 / -1' // full width shorthand

  return (
    <div className="container">
      <div className="add-form">
        <h1>Add Scholarship</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
          After saving, AI will auto-generate the Burmese translation, preparation guide, and document checklist.
        </p>

        {status === 'success' && <div className="msg-success">{message}</div>}
        {status === 'error' && <div className="msg-error">{message}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.25rem' }}>

          {/* Row 1 */}
          <div className="field">
            <label>Scholarship Name *</label>
            <input value={form.name} onChange={e => setField('name', e.target.value)}
              placeholder="e.g. MEXT Japanese Government Scholarship" />
          </div>
          <div className="field">
            <label>Host Country *</label>
            <input value={form.country} onChange={e => setField('country', e.target.value)}
              placeholder="e.g. Japan" />
          </div>

          {/* Row 2 */}
          <div className="field">
            <label>Level *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.65rem 0.9rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
              {['undergraduate', 'masters', 'phd', 'any'].map(l => {
                const selected = form.level.split(',').map(s => s.trim()).includes(l)
                return (
                  <label key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--ink)', textTransform: 'capitalize' }}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {
                        const levels = form.level.split(',').map(s => s.trim()).filter(Boolean)
                        const next = selected ? levels.filter(v => v !== l) : [...levels, l]
                        setField('level', next.join(', '))
                      }}
                      style={{ accentColor: 'var(--gold)', width: '14px', height: '14px' }}
                    />
                    {l === 'any' ? 'Any / All levels' : l.charAt(0).toUpperCase() + l.slice(1)}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Row 3 */}
          <div className="field">
            <label>Start Date</label>
            <input value={form.start_date} onChange={e => setField('start_date', e.target.value)}
              placeholder="e.g. September 2026" />
          </div>
          <div className="field">
            <label>Duration</label>
            <input value={form.duration} onChange={e => setField('duration', e.target.value)}
              placeholder="e.g. 3–4 years (full degree)" />
          </div>

          {/* Row 4 */}
          <div className="field">
            <label>Application Deadline</label>
            <input type="text" value={form.deadline} onChange={e => setField('deadline', e.target.value)}
              placeholder="e.g. 2026-12-31 or Rolling" />
          </div>
          <div className="field">
            <label>Official Source URL *</label>
            <input value={form.source_url} onChange={e => setField('source_url', e.target.value)}
              placeholder="https://..." />
          </div>

          {/* Row 5 */}
          <div className="field">
            <label>Offered By (Organization)</label>
            <input value={form.host_org} onChange={e => setField('host_org', e.target.value)}
              placeholder="e.g. Newcastle University" />
          </div>
          <div className="field">
            {/* spacer */}
          </div>

          {/* PDF Upload — full width */}
          <div className="field" style={{ gridColumn: W }}>
            <label>Scholarship PDF <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional — improves AI accuracy)</span></label>
            <div style={{
              border: '1px dashed var(--border)', borderRadius: 'var(--radius)',
              padding: '1rem', background: 'var(--surface)',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <input type="file" accept="application/pdf" onChange={handlePdfChange}
                style={{ fontSize: '0.875rem', color: 'var(--muted)', cursor: 'pointer' }} />
              {pdfName && <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>✓ {pdfName}</span>}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.35rem' }}>
              Gemini will read the PDF to generate more accurate Burmese instructions and document checklist.
            </p>
          </div>

          {/* Attachment Links — full width */}
          <div className="field" style={{ gridColumn: W }}>
            <label>Attachment Links</label>
            {attachments.map((url, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input value={url} onChange={e => updateAttachment(i, e.target.value)}
                  placeholder="https://example.com/application-form.pdf" style={{ flex: 1 }} />
                {attachments.length > 1 && (
                  <button type="button" onClick={() => removeAttachment(i)} style={{
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                    color: '#f87171', borderRadius: '8px', padding: '0 0.75rem',
                    cursor: 'pointer', fontSize: '1.1rem', fontFamily: 'inherit',
                  }}>−</button>
                )}
                {i === attachments.length - 1 && (
                  <button type="button" onClick={addAttachment} style={{
                    background: 'var(--gold-lt)', border: '1px solid var(--border2)',
                    color: 'var(--gold)', borderRadius: '8px', padding: '0 0.75rem',
                    cursor: 'pointer', fontSize: '1.1rem', fontFamily: 'inherit',
                  }}>+</button>
                )}
              </div>
            ))}
          </div>

          <div className="field" style={{ gridColumn: W }}>
            <label>Fields of Study</label>
            <textarea value={form.field} onChange={e => setField('field', e.target.value)}
              placeholder={'e.g. Engineering\nScience\nArts\n(or All fields)'}
               />
          </div>

          {/* Award & Benefits — full width */}
          <div className="field" style={{ gridColumn: W }}>
            <label>Award & Benefits</label>
            <textarea value={form.covers} onChange={e => setField('covers', e.target.value)}
              placeholder={'e.g. £7,000 tuition fee award per academic year\nHealth insurance\nAccommodation support'} />
          </div>

          {/* Requirements — full width */}
          <div className="field" style={{ gridColumn: W }}>
            <label>Requirements (English) *</label>
            <textarea value={form.requirements} onChange={e => setField('requirements', e.target.value)}
              placeholder="Paste the full eligibility and application requirements here. The more detail, the better the Burmese guide will be." />
          </div>

          {/* Original Content — full width */}
          <div className="field" style={{ gridColumn: W }}>
            <label>Original Content</label>
            <textarea value={form.original_content} onChange={e => setField('original_content', e.target.value)}
              placeholder="Paste the full original content from the scholarship page here." />
          </div>

        </div>

        <button type="button" className="submit-btn" onClick={handleSubmit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving + Generating Burmese content…' : 'Save Scholarship'}
        </button>
      </div>
    </div>
  )
}