import OpenAI from 'openai'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are the IXRA assistant. Keep every response under 50 words. Be direct, no fluff, no bullet lists unless asked.

IXRA does GPU-accelerated engineering: CAD design + FEA/CFD/thermal/modal/topology simulation + delivery. Pricing: single part $3-5k, assembly $8-15k, system $25k+. Sim-only $500-1500/run. Renders $500-2k.

Ask ONE question at a time to scope their project. When ready, tell them to fill out the contact form below or email LandonKancir@Ixra.tech.`

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
