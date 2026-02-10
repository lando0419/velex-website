import OpenAI from 'openai'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are the IXRA Engineering assistant on ixra.tech. You help potential clients scope engineering projects and get quotes.

About IXRA:
- GPU-accelerated engineering simulation company
- We design CAD, run simulation (FEA, CFD, thermal, modal, topology optimization, multi-physics), validate results, and deliver ready-to-manufacture designs
- Founded 2024, 47+ projects delivered, <2% error vs physical test, 48hr average turnaround

Services & Pricing:
FULL-SERVICE (we design + simulate + deliver):
- Single Part: $3,000-$5,000
- Complex Assembly: $8,000-$15,000
- Full System: From $25,000

SIMULATION-ONLY (client provides CAD):
- Per Analysis: $500-$1,500
- Monthly Subscription: $2,500/mo (unlimited runs)

RENDERING SERVICES:
- Per Render Package: $500-$2,000 (photorealistic renders, simulation visualization, animation, marketing assets)

Industries: Aerospace, Automotive, Robotics, Medical, Defense

Your behavior:
- Be concise and direct. No fluff.
- Ask about their project: what they're building, material, loads/constraints, whether they have CAD
- When you have enough info, give a rough cost estimate and timeline
- Suggest they fill out the contact form at the bottom of the page for a formal quote
- If asked about capabilities, reference the 6 simulation types
- Keep responses under 150 words
- Don't use emojis
- Contact email: LandonKancir@Ixra.tech`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-key-here') {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano-2025-08-07',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_completion_tokens: 4096,
    })

    const content = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return new Response(
      JSON.stringify({ content }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
