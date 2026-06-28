export type ScholarshipLevel = string

export interface Scholarship {
  id: string
  created_at: string
  updated_at: string

  // English
  name: string
  country: string
  level: ScholarshipLevel
  field?: string
  deadline?: string
  source_url: string
  host_org?: string
  covers?: string
  requirements: string

  // Burmese (AI-generated)
  name_mm?: string
  requirements_mm?: string
  instructions_mm?: string
  checklist_mm?: string        // JSON string → string[]
  start_date?: string
  duration?: string

  // Status
  is_published: boolean
  ai_generated: boolean
  ai_processed: boolean
}

export interface ScholarshipFormData {
  name: string
  country: string
  level: ScholarshipLevel
  field: string
  deadline: string
  start_date: string
  duration: string
  source_url: string
  host_org: string
  covers: string
  requirements: string
  original_content: string
}