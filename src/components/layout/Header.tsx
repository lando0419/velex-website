'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '#capabilities', label: 'Capabilities', sectionId: 'capabilities' },
  { href: '#showcase', label: 'Showcase', sectionId: 'showcase' },
  { href: '/case-studies', label: 'Case Studies', sectionId: '' },
  { href: '#pricing', label: 'Pricing', sectionId: 'pricing' },
  { href: '#about', label: 'About', sectionId: 'about' },
  { href: '#faq', label: 'FAQ', sectionId: 'faq' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const updateActiveSection = useCallback(() => {
    const sections = NAV_ITEMS.map((item) => item.sectionId)
    const scrollY = window.scrollY + 120

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el && el.offsetTop <= scrollY) {
        setActiveSection(sections[i])
        return
      }
    }
    setActiveSection('')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      updateActiveSection()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateActiveSection])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-void/80 backdrop-blur-md border-b border-titanium/10'
            : 'bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-accent text-xl tracking-[0.2em] text-plasma-white hover:text-ixra-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded"
          >
            IXRA
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={activeSection === item.sectionId}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className={cn(
                'px-4 py-2 rounded text-sm font-medium transition-all duration-200',
                'bg-ixra-blue text-void hover:bg-electric-cyan',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void'
              )}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-plasma-white hover:text-ixra-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ixra-blue rounded"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {NAV_ITEMS.map((item, index) =>
                item.href.startsWith('#') ? (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-2xl font-headline transition-colors',
                      activeSection === item.sectionId
                        ? 'text-ixra-blue'
                        : 'text-plasma-white hover:text-ixra-blue'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-headline text-plasma-white hover:text-ixra-blue transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}

              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-ixra-blue text-void font-medium rounded-lg hover:bg-electric-cyan transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get a Quote
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  const className = cn(
    'group relative text-sm transition-colors duration-200',
    'focus-visible:outline-none',
    isActive
      ? 'text-plasma-white'
      : 'text-titanium hover:text-plasma-white focus-visible:text-plasma-white'
  )

  const underline = (
    <span
      className={cn(
        'absolute -bottom-1 left-0 h-px bg-ixra-blue transition-all duration-300',
        isActive ? 'w-full' : 'w-0 group-hover:w-full group-focus-visible:w-full'
      )}
    />
  )

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
        {underline}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
      {underline}
    </Link>
  )
}
