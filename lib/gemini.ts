import { GoogleGenAI } from '@google/genai'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
const MODEL = 'gemini-3.1-flash-lite'

interface GeneratedContent {
  name_mm: string
  requirements_mm: string
  instructions_mm: string
  checklist_mm: string   // JSON string of string[]
}

export async function generateBurmeseContent(
  name: string,
  country: string,
  level: string,
  requirements: string,
  covers: string = '',
  deadline: string = ''
): Promise<GeneratedContent> {

  const prompt = `
You are helping Myanmar citizens understand international scholarships.
Generate content in Myanmar (Burmese) script ONLY. Do not use English except for proper nouns like institution names.

Scholarship details:
- Name: ${name}
- Country: ${country}
- Level: ${level}
- Covers: ${covers}
- Deadline: ${deadline}
- Requirements (English): ${requirements}

Return ONLY a valid JSON object with exactly these 4 keys, no markdown, no extra text:

{
  "name_mm": "Scholarship name translated or transliterated to Burmese",
  "requirements_mm": "Full requirements translated to Burmese, in clear paragraphs",
  "instructions_mm": "Step-by-step preparation guide in Burmese. What the student needs to do from now until applying. Use numbered steps. Be practical and encouraging.",
  "checklist_mm": ["document 1 in Burmese", "document 2 in Burmese", "..."]
}

For instructions_mm, cover things like:
- What scores/grades are needed and how to prepare
- What tests to take (IELTS/TOEFL etc) and when
- What documents to collect
- How to write the personal statement
- When and how to apply

Make it feel like advice from a helpful older sibling who already got a scholarship.
The checklist_mm must be an array of strings, each item being one document or requirement.
`

  const response = await genai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      temperature: 0.3,
      responseMimeType: 'application/json',
    }
  })

  const text = response.text ?? ''

  // Strip any accidental markdown fences
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)

  return {
    name_mm: parsed.name_mm ?? '',
    requirements_mm: parsed.requirements_mm ?? '',
    instructions_mm: parsed.instructions_mm ?? '',
    checklist_mm: JSON.stringify(parsed.checklist_mm ?? []),
  }
}
