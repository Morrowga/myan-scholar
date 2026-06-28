import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { saveScholarship } from '@/lib/save-scholarship'
import { ScholarshipFormData } from '@/types'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get('country')
  const level = searchParams.get('level')

  let query = supabase
    .from('scholarships')
    .select('*')
    .eq('is_published', true)
    .order('deadline', { ascending: true, nullsFirst: false })

  if (country) query = query.ilike('country', `%${country}%`)
  if (level && level !== 'any') query = query.eq('level', level)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
   const session = req.cookies.get('admin_session')
    if (session?.value !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

  const body = await req.json()
  const { pdfBase64, ...formData } = body

  if (!formData.name || !formData.country || !formData.requirements || !formData.source_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const result = await saveScholarship(formData as ScholarshipFormData, {
    ai_generated: false,
    pdfBase64: pdfBase64 ?? undefined,
  })

  if (result.error && !result.id) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ id: result.id, warning: result.error ?? null }, { status: 201 })
}