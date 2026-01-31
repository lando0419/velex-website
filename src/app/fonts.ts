import {
  Inter,
  JetBrains_Mono,
  Exo_2,
  Bebas_Neue,
  Space_Mono,
} from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
})

export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
})

export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-numbers',
  display: 'swap',
})
