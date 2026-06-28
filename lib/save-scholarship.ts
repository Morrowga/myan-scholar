import { supabaseAdmin } from './supabase'
import { generateBurmeseContent } from './gemini'
import { ScholarshipFormData } from '@/types'

export async function saveScholarship(
  data: ScholarshipFormData,
  options: { ai_generated?: boolean; pdfBase64?: string } = {}
): Promise<{ id: string; error?: string }> {
  try {
    // 1. Save raw English data first
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('scholarships')
      .insert({
        ...data,
        attachments: JSON.stringify((data as any).attachments ?? []),
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

    // 2. Generate Burmese content with Gemini — pass PDF if provided
    const burmese = await generateBurmeseContent(
      data.name,
      data.country,
      data.level,
      data.requirements,
      data.covers,
      data.deadline,
      options.pdfBase64
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
      console.error('Gemini update failed:', updateError.message)
      return { id, error: 'Saved but AI generation failed.' }
    }

    return { id }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { id: '', error: message }
  }
}