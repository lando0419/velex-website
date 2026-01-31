'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, ArrowUp } from 'lucide-react'
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
      <span className="absolute bottom-0 left-0 w-0 h-px bg-velex-blue transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
    </Link>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-titanium hover:text-velex-blue focus-visible:text-velex-blue transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.a>
  )
}

const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#showcase', label: 'Showcase' },
]

const RESOURCE_LINKS = [
  { href: '#', label: 'Documentation' },
  { href: '#showcase', label: 'Case Studies' },
  { href: '#faq', label: 'FAQ' },
]

const COMPANY_LINKS = [
  { href: '#', label: 'About' },
  { href: '#contact', label: 'Contact' },
  { href: '#', label: 'Careers' },
]

const SOCIAL_LINKS = [
  { href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
  { href: 'https://github.com', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
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
            <span className="font-headline text-2xl tracking-[0.3em] text-plasma-white hover:text-velex-blue transition-colors">
              V E L E X
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
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          {SOCIAL_LINKS.map((social) => (
            <SocialLink
              key={social.label}
              href={social.href}
              icon={social.icon}
              label={social.label}
            />
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-titanium/60">
          <p>© 2026 VELEX Engineering. Precision is the standard.</p>
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          className={cn(
            'absolute right-4 bottom-4 md:right-8 md:bottom-8',
            'p-3 rounded-full border border-titanium/20',
            'text-titanium hover:text-velex-blue hover:border-velex-blue/50',
            'focus-visible:text-velex-blue focus-visible:border-velex-blue/50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-velex-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void',
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
