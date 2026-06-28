'use client'
import { useState } from 'react'
import { ScholarshipFormData } from '@/types'

const EMPTY: ScholarshipFormData = {
  name: '', country: '', level: 'masters', field: '',
  deadline: '', source_url: '', host_org: '', covers: '', requirements: ''
}

export default function AddPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [form, setForm] = useState<ScholarshipFormData>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function set(k: keyof ScholarshipFormData, v: string) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSubmit() {
    if (!form.name || !form.country || !form.requirements || !form.source_url) {
      setMessage('Please fill in Name, Country, Source URL, and Requirements.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setMessage('')

    const res = await fetch('/api/scholarships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setStatus('error')
      setMessage(data.error ?? 'Something went wrong')
      return
    }

    setStatus('success')
    setMessage(`Saved! AI is generating Burmese content. ID: ${data.id}`)
    setForm(EMPTY)
  }

  if (!authed) {
    return (
      <div className="container">
        <div className="add-form">
          <h1>Admin Access</h1>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setAuthed(true)} placeholder="Enter admin password" />
          </div>
          <button className="submit-btn" onClick={() => setAuthed(true)}>Enter</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="add-form">
        <h1>Add Scholarship</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
          After saving, AI will auto-generate the Burmese translation, preparation guide, and document checklist.
        </p>

        {status === 'success' && <div className="msg-success">{message}</div>}
        {status === 'error'   && <div className="msg-error">{message}</div>}

        <div className="field">
          <label>Scholarship Name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. MEXT Japanese Government Scholarship" />
        </div>

        <div className="field">
          <label>Host Country *</label>
          <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. Japan" />
        </div>

        <div className="field">
          <label>Level *</label>
          <select value={form.level} onChange={e => set('level', e.target.value)}>
            <option value="undergraduate">Undergraduate</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
            <option value="any">Any / All levels</option>
          </select>
        </div>

        <div className="field">
          <label>Fields of Study</label>
          <input value={form.field} onChange={e => set('field', e.target.value)} placeholder="e.g. Engineering, Science, Arts (or All fields)" />
        </div>

        <div className="field">
          <label>Application Deadline</label>
          <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
        </div>

        <div className="field">
          <label>Official Source URL *</label>
          <input value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://..." />
        </div>

        <div className="field">
          <label>Offered By (Organization)</label>
          <input value={form.host_org} onChange={e => set('host_org', e.target.value)} placeholder="e.g. Japanese Government (MEXT)" />
        </div>

        <div className="field">
          <label>What It Covers</label>
          <input value={form.covers} onChange={e => set('covers', e.target.value)} placeholder="e.g. Full tuition, monthly allowance $1000, airfare" />
        </div>

        <div className="field">
          <label>Requirements (English) *</label>
          <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)}
            placeholder="Paste the full eligibility and application requirements here in English. The more detail, the better the Burmese guide will be." />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          {status === 'loading' ? 'Saving + Generating Burmese content…' : 'Save Scholarship'}
        </button>
      </div>
    </div>
  )
}
