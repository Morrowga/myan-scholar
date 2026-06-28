import { GoogleGenAI } from '@google/genai'

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
const MODEL = 'gemini-3.1-flash-lite'

interface GeneratedContent {
  name_mm: string
  requirements_mm: string
  instructions_mm: string
  checklist_mm: string
}

export async function generateBurmeseContent(
  name: string,
  country: string,
  level: string,
  requirements: string,
  covers: string = '',
  deadline: string = '',
  pdfBase64?: string
): Promise<GeneratedContent> {

  const textPrompt = `
You are helping Myanmar citizens understand international scholarships.
Generate content in Myanmar (Burmese) script ONLY. Do not use English except for proper nouns like institution names.

Scholarship details:
- Name: ${name}
- Country: ${country}
- Level: ${level}
- Covers: ${covers}
- Deadline: ${deadline}
- Requirements (English): ${requirements}
${pdfBase64 ? '- A PDF of the official scholarship page is attached. Use it to improve accuracy of all fields below.' : ''}

Return ONLY a valid JSON object with exactly these 4 keys, no markdown, no extra text:

{
  "name_mm": "Scholarship name translated or transliterated to Burmese",
  "requirements_mm": "Full requirements translated to Burmese in clear paragraphs",
  "instructions_mm": "Step-by-step guide in Burmese. IMPORTANT: Each step MUST be on its own new line. Use this exact format:\n၁။ first step\n၂။ second step\n၃။ third step\nWrite 5-8 steps. Each step is one or two sentences max. Cover: choosing a course, preparing language tests, collecting documents, writing personal statement, submitting application, and any automatic selection notes.",
  "checklist_mm": ["document 1 in Burmese", "document 2 in Burmese"]
}

For checklist_mm: ONLY include documents explicitly mentioned in the requirements or PDF. Do not guess or add documents not mentioned. Return empty array if none explicitly listed.
Make instructions feel like advice from a helpful older sibling who already got a scholarship.
`

  // Build contents array — add PDF if provided
  const contents: any[] = pdfBase64
    ? [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: pdfBase64,
              },
            },
            { text: textPrompt },
          ],
        },
      ]
    : [{ role: 'user', parts: [{ text: textPrompt }] }]

  const response = await genai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      temperature: 0.3,
      responseMimeType: 'application/json',
    },
  })

  const text = response.text ?? ''
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)

  return {
    name_mm: parsed.name_mm ?? '',
    requirements_mm: parsed.requirements_mm ?? '',
    instructions_mm: parsed.instructions_mm ?? '',
    checklist_mm: JSON.stringify(parsed.checklist_mm ?? []),
  }
}