import { NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  company?: string
  simulationTypes?: string[]
  message?: string
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || data.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (!data.email || !isValidEmail(data.email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Log the submission (replace with actual email/CRM integration)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company || 'Not provided',
      simulationTypes: data.simulationTypes?.join(', ') || 'None selected',
      message: data.message || 'No message',
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // TODO: Integrate with CRM (HubSpot, Salesforce, etc.)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
