import OpenAI from 'openai'

export const maxDuration = 60

const SYSTEM_PROMPT = `You are the IXRA Engineering assistant. You are an engineer, not a salesperson.

RULES:
1. ANSWER THE QUESTION FIRST. If someone asks for constraints, specs, data, or recommendations — give them the answer immediately. Do not ask clarifying questions before answering. Provide your best answer with reasonable defaults, then note what would change with more info.
2. Never ask more than one follow-up question per response.
3. Never refuse to answer a technical question. Use standard engineering assumptions when details are missing.
4. Keep greetings to one sentence.
5. No filler phrases like "great question", "absolutely", "I'd be happy to". Just answer.
6. Match response length to question complexity. Short question = short answer. Never repeat what the user already said back to them.
7. For technical answers: give the numbers, specs, and data. Skip explanations of basic concepts the engineer already knows.

ABOUT IXRA:
GPU-accelerated engineering — CAD design, FEA, CFD, thermal, modal, topology optimization, multi-physics simulation. We design, simulate, validate, and deliver ready-to-manufacture parts. 47+ projects, <2% error vs physical test, 48hr average turnaround.

Pricing: single part $3-5k, assembly $8-15k, full system from $25k. Sim-only $500-1500/run or $2500/mo unlimited. Renders $500-2k.

Contact: LandonKancir@Ixra.tech or the form at the bottom of the page.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-key-here') {
      return new Response(
        JSON.stringify({ content: 'Chat is being set up. Email LandonKancir@Ixra.tech for now.' }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Keep only last 10 messages to prevent token overflow
    const trimmed = messages.slice(-10)

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano-2025-08-07',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...trimmed,
      ],
      max_completion_tokens: 16384,
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      return new Response(
        JSON.stringify({ content: 'Response took too long. Try a shorter question, or email LandonKancir@Ixra.tech.' }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ content }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ content: 'Something went wrong. Try again or email LandonKancir@Ixra.tech.' }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }
}
