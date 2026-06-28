import { NextRequest, NextResponse } from 'next/server'
import { findNewScholarships } from '@/lib/claude'
import { saveScholarship } from '@/lib/save-scholarship'
import { supabaseAdmin } from '@/lib/supabase'
import { ScholarshipFormData } from '@/types'

// POST /api/daily — called by GitHub Actions cron every day
export async function POST(req: NextRequest) {
  // Verify cron secret
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = { found: 0, saved: 0, skipped: 0, errors: [] as string[] }

  try {
    // 1. Ask Claude Haiku to find scholarships
    const scholarships = await findNewScholarships()
    results.found = scholarships.length

    // 2. Get existing source URLs to avoid duplicates
    const { data: existing } = await supabaseAdmin
      .from('scholarships')
      .select('source_url')

    const existingUrls = new Set((existing ?? []).map(r => r.source_url))

    // 3. Save each new scholarship
    for (const s of scholarships) {
      if (existingUrls.has(s.source_url)) {
        results.skipped++
        continue
      }

      const formData: ScholarshipFormData = {
        name: s.name,
        country: s.country,
        level: (s.level as ScholarshipFormData['level']) ?? 'any',
        field: s.field ?? '',
        deadline: s.deadline ?? '',
        source_url: s.source_url,
        host_org: s.host_org ?? '',
        covers: s.covers ?? '',
        requirements: s.requirements,
      }

      const result = await saveScholarship(formData, { ai_generated: true })

      if (result.error && !result.id) {
        results.errors.push(`${s.name}: ${result.error}`)
      } else {
        results.saved++
        existingUrls.add(s.source_url) // prevent re-processing in same run
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1500))
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg, results }, { status: 500 })
  }

  return NextResponse.json({ success: true, results })
}
