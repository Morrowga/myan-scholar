import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { saveScholarship } from '@/lib/save-scholarship'
import { ScholarshipFormData } from '@/types'

// GET /api/scholarships — public listing with optional filters
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

// POST /api/scholarships — add new scholarship (protected by admin password)
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body: ScholarshipFormData = await req.json()

  if (!body.name || !body.country || !body.requirements || !body.source_url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const result = await saveScholarship(body, { ai_generated: false })

  if (result.error && !result.id) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ id: result.id, warning: result.error ?? null }, { status: 201 })
}
