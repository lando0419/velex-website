import type { Metadata } from 'next'
import { inter, exo2, jetbrainsMono, bebasNeue, spaceMono } from './fonts'
import { SmoothScrollProvider } from '@/components/providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/chat'
import { ScrollProgress } from '@/components/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'IXRA | Design. Simulate. Deliver. GPU-Accelerated.',
  description:
    'From concept to validated design. Full-service engineering: we design your CAD, run GPU-accelerated simulation, validate results, and deliver. For aerospace, automotive, and advanced manufacturing.',
  keywords: [
    'engineering design services',
    'CAD design',
    'FEA',
    'CFD',
    'thermal simulation',
    'engineering simulation',
    'GPU computing',
    'finite element analysis',
    'computational fluid dynamics',
    'structural analysis',
    'product development',
  ],
  authors: [{ name: 'IXRA Engineering' }],
  creator: 'IXRA Engineering',
  publisher: 'IXRA Engineering',
  metadataBase: new URL('https://ixra.tech'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ixra.tech',
    siteName: 'IXRA Engineering',
    title: 'IXRA | Design. Simulate. Deliver.',
    description:
      'From concept to validated design. Full-service GPU-accelerated engineering for FEA, CFD, and thermal simulation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IXRA Engineering - Design. Simulate. Deliver.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IXRA | Design. Simulate. Deliver.',
    description:
      'From concept to validated design. Full-service GPU-accelerated engineering for FEA, CFD, and thermal simulation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${exo2.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${spaceMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
