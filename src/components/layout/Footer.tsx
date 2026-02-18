'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="group relative text-titanium hover:text-plasma-white transition-colors duration-200 focus-visible:text-plasma-white focus-visible:outline-none"
    >
      {children}
      {/* Underline animation */}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-ixra-blue transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
    </Link>
  )
}


const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#showcase', label: 'Showcase' },
]

const RESOURCE_LINKS = [
  { href: '/case-studies', label: 'Case Studies' },
  { href: '#capabilities', label: 'Our Arsenal' },
  { href: '#faq', label: 'FAQ' },
]

const COMPANY_LINKS = [
  { href: '#contact', label: 'Contact' },
]


export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-void border-t border-titanium/10">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(136, 146, 160, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(136, 146, 160, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 py-16 relative">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <span className="font-headline text-2xl tracking-[0.3em] text-plasma-white hover:text-ixra-blue transition-colors">
              I X R A
            </span>
          </Link>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
          {/* Navigation */}
          <div className="text-center">
            <h4 className="text-xs uppercase tracking-widest text-titanium/60 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center">
            <h4 className="text-xs uppercase tracking-widest text-titanium/60 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center">
            <h4 className="text-xs uppercase tracking-widest text-titanium/60 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <a
                  href="mailto:LandonKancir@Ixra.tech"
                  className="group relative text-titanium hover:text-plasma-white transition-colors duration-200"
                >
                  Email Us
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-ixra-blue transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Email */}
        <div className="text-center mb-6">
          <a
            href="mailto:LandonKancir@Ixra.tech"
            className="text-titanium hover:text-ixra-blue transition-colors duration-200"
          >
            LandonKancir@Ixra.tech
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-titanium/60">
          <p>© 2026 IXRA Engineering. Precision is the standard.</p>
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          className={cn(
            'absolute right-4 bottom-4 md:right-8 md:bottom-8',
            'p-3 rounded-full border border-titanium/20',
            'text-titanium hover:text-ixra-blue hover:border-ixra-blue/50',
            'focus-visible:text-ixra-blue focus-visible:border-ixra-blue/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void',
            'transition-colors duration-200'
          )}
          whileHover={{ y: -2 }}
          whileFocus={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  )
}
