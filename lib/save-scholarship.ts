import { supabaseAdmin } from './supabase'
import { generateBurmeseContent } from './gemini'
import { ScholarshipFormData } from '@/types'

export async function saveScholarship(
  data: ScholarshipFormData,
  options: { ai_generated?: boolean } = {}
): Promise<{ id: string; error?: string }> {
  try {
    // 1. Save raw English data first so it's in DB even if AI step fails
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('scholarships')
      .insert({
        ...data,
        is_published: false,
        ai_generated: options.ai_generated ?? false,
        ai_processed: false,
      })
      .select('id')
      .single()

    if (insertError || !inserted) {
      return { id: '', error: insertError?.message ?? 'Insert failed' }
    }

    const id = inserted.id

    // 2. Generate Burmese content with Gemini
    const burmese = await generateBurmeseContent(
      data.name,
      data.country,
      data.level,
      data.requirements,
      data.covers,
      data.deadline
    )

    // 3. Update record with AI content and publish
    const { error: updateError } = await supabaseAdmin
      .from('scholarships')
      .update({
        ...burmese,
        ai_processed: true,
        is_published: true,
      })
      .eq('id', id)

    if (updateError) {
      // Still saved in DB, just not published — you can retry
      console.error('Gemini update failed:', updateError.message)
      return { id, error: 'Saved but AI generation failed. Will retry.' }
    }

    return { id }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { id: '', error: message }
  }
}
