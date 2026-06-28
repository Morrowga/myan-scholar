import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

interface FoundScholarship {
  name: string
  country: string
  level: string
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

export async function findNewScholarships(): Promise<FoundScholarship[]> {
  const today = new Date().toISOString().split('T')[0]

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    tools: [
      {
        type: 'web_search_20250305' as const,
        name: 'web_search',
      }
    ],
    messages: [
      {
        role: 'user',
        content: `Today is ${today}. Search for international scholarships in Asia and worldwide that Myanmar citizens can apply for.

Search for:
1. New scholarships announced in the last 30 days open to Myanmar citizens
2. Scholarships with upcoming deadlines in the next 6 months (country: Japan, Korea, Malaysia, Singapore, Thailand, China, Australia, Taiwan, any country)
3. Include any level: undergraduate, masters, phd

For each scholarship found, extract:
- name: official scholarship name
- country: host country
- level: undergraduate | masters | phd | any
- field: fields of study (or "All fields")
- deadline: deadline date in YYYY-MM-DD format (or "Rolling" if no fixed date)
- source_url: the official page URL
- host_org: organization offering it
- covers: what it covers (tuition, living allowance, airfare, etc.)
- start_date: when the scholarship starts (e.g. "September 2026")
- duration: how long it lasts (e.g. "Full duration of course")
- requirements: full eligibility requirements in English

Return ONLY a valid JSON array. No markdown. No explanation. Example:
[{"name":"...","country":"...","level":"...","field":"...","deadline":"...","source_url":"...","host_org":"...","covers":"...","requirements":"..."}]

Find at least 5 scholarships. Only include real, verifiable scholarships with source URLs.`
      }
    ]
  })

  // Extract the final text response from Claude
  const textBlock = response.content.find(b => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') return []

  const clean = textBlock.text.replace(/```json|```/g, '').trim()

  // Find the JSON array in the response
  const match = clean.match(/\[[\s\S]*\]/)
  if (!match) return []

  const scholarships: FoundScholarship[] = JSON.parse(match[0])
  return scholarships
}
