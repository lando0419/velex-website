import type { Metadata } from 'next'
import { MotorsportPage } from './MotorsportPage'

export const metadata: Metadata = {
  title: 'IXRA Motorsport | Race-Optimized Component Engineering',
  description:
    'Topology-optimized, DMLS-ready components for Formula, GT, and endurance racing teams. Validated against real motorsport part classes with measured optimization outcomes.',
  keywords: [
    'motorsport engineering',
    'topology optimization',
    'DMLS',
    'additive manufacturing',
    'race car components',
    'brake cooling ducts',
    'suspension uprights',
    'lightweight racing parts',
    'FEA simulation',
    'thermal analysis',
    'motorsport CFD',
  ],
  openGraph: {
    title: 'IXRA Motorsport | Race-Optimized Component Engineering',
    description:
      'Topology-optimized, DMLS-ready components for teams that measure advantage in grams and milliseconds.',
    type: 'website',
    url: 'https://ixra.tech/motorsport',
  },
}

export default function Page() {
  return <MotorsportPage />
}
