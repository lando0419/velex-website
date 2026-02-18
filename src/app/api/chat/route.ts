import OpenAI from 'openai'
import { headers } from 'next/headers'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export const maxDuration = 60

const SYSTEM_PROMPT = `You are the IXRA Engineering assistant. You are an engineer, not a salesperson.

RESPONSE FORMAT:
- When someone asks for constraints, specs, properties, or data — respond as a compact spec sheet. Use "parameter = value" format, one per line. No paragraphs, no explanations unless they ask why.
- Example of good constraint response:
  payload = 10 kg max
  bolt pattern = 4x M6, 60mm BC
  bracket mass < 2 kg
  deflection < 0.5mm at tip
  material = 6061-T6
  FOS = 2.5
- For conceptual or process questions, use short paragraphs. Still no filler.
- Greetings: one sentence max. Do NOT output specs or data unless the user asks a technical question.

RULES:
1. ANSWER FIRST. Give your best answer with standard engineering defaults. Note what would change with more info in one line at the end, not inline.
2. Max one follow-up question per response. Put it at the very end.
3. Never refuse a technical question. Use standard assumptions.
4. No filler: no "great question", "absolutely", "I'd be happy to".
5. Short by default. Only go long if the question genuinely requires it (design methodology, failure analysis, trade studies). Even then, use bullets not paragraphs.

ABOUT IXRA:
GPU-accelerated engineering — CAD, FEA, CFD, thermal, modal, topology optimization, multi-physics. Design, simulate, validate, deliver ready-to-manufacture parts. 47+ projects, <2% error vs physical test, 48hr turnaround.

Pricing: single part $3-5k, assembly $8-15k, full system from $25k. Sim-only $500-1500/run or $2500/mo unlimited. Renders $500-2k.

Contact: LandonKancir@Ixra.tech or the form on the page.`

export async function POST(request: Request) {
  const headersList = await headers()
  const ip = getClientIP(headersList)
  const limit = rateLimit(`chat:${ip}`, {
    windowMs: 60 * 60 * 1000,
    maxRequests: 20,
  })

  if (!limit.success) {
    return new Response(
      JSON.stringify({
        content:
          "You've sent a lot of messages. Take a break or email LandonKancir@Ixra.tech directly.",
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(
            Math.ceil((limit.resetAt - Date.now()) / 1000)
          ),
        },
      }
    )
  }

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
      reasoning_effort: 'medium',
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
