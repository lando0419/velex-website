'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageIcon, FileText, BarChart3, Download, ChevronLeft, ChevronRight, Clock, CheckCircle2, Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from './ShowcaseSection'

interface DemoModalProps {
  item: GalleryItem
  onClose: () => void
}

type TabId = 'photos' | 'docs' | 'analysis' | 'downloads'

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'photos', label: 'Photos', icon: ImageIcon },
  { id: 'docs', label: 'Documentation', icon: FileText },
  { id: 'analysis', label: 'Analysis Data', icon: BarChart3 },
  { id: 'downloads', label: 'Downloads', icon: Download },
]

function StatusBadge({ status }: { status: GalleryItem['status'] }) {
  const config = {
    'complete': { label: 'Complete', icon: CheckCircle2, className: 'bg-success-green/20 text-success-green border-success-green/30' },
    'in-progress': { label: 'In Progress', icon: Loader2, className: 'bg-warning-orange/20 text-warning-orange border-warning-orange/30' },
    'coming-soon': { label: 'Coming Soon', icon: Clock, className: 'bg-titanium/20 text-titanium border-titanium/30' },
  }
  const { label, icon: Icon, className } = config[status]

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border', className)}>
      <Icon className={cn('w-3 h-3', status === 'in-progress' && 'animate-spin')} />
      {label}
    </span>
  )
}

function PhotoGallery({ item }: { item: GalleryItem }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const images = item.images && item.images.length > 0
    ? item.images
    : [{ src: item.image, alt: item.title }]

  const next = () => setCurrentIndex((i) => (i + 1) % images.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-video bg-titanium/10 rounded-lg overflow-hidden">
        {!imageErrors[currentIndex] ? (
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            onError={() => setImageErrors(prev => ({ ...prev, [currentIndex]: true }))}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-titanium">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Image coming soon</p>
            </div>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-void/80 border border-titanium/30 text-titanium hover:text-plasma-white hover:border-ixra-blue transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-void/80 border border-titanium/30 text-titanium hover:text-plasma-white hover:border-ixra-blue transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'relative w-20 h-14 rounded-md overflow-hidden border-2 transition-all flex-shrink-0',
                idx === currentIndex ? 'border-ixra-blue' : 'border-titanium/20 opacity-60 hover:opacity-100'
              )}
            >
              {!imageErrors[idx] ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  onError={() => setImageErrors(prev => ({ ...prev, [idx]: true }))}
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-titanium/20 flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-titanium/50" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Caption */}
      {images[currentIndex].caption && (
        <p className="text-sm text-titanium text-center">{images[currentIndex].caption}</p>
      )}
    </div>
  )
}

function DocumentsTab({ item }: { item: GalleryItem }) {
  if (!item.documents || item.documents.length === 0) {
    return (
      <div className="text-center py-12 text-titanium">
        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Documentation will be available when project is complete.</p>
      </div>
    )
  }

  const iconMap = {
    pdf: '📄',
    spec: '📋',
    report: '📊',
  }

  return (
    <div className="space-y-3">
      {item.documents.map((doc, idx) => (
        <a
          key={idx}
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-lg bg-titanium/5 border border-titanium/10 hover:border-ixra-blue/50 transition-colors group"
        >
          <span className="text-2xl">{iconMap[doc.type]}</span>
          <div className="flex-1">
            <p className="text-plasma-white font-medium group-hover:text-ixra-blue transition-colors">{doc.title}</p>
            <p className="text-xs text-titanium uppercase">{doc.type}</p>
          </div>
          <Download className="w-5 h-5 text-titanium group-hover:text-ixra-blue transition-colors" />
        </a>
      ))}
    </div>
  )
}

function AnalysisTab({ item }: { item: GalleryItem }) {
  if (!item.analysisData) {
    return (
      <div className="text-center py-12 text-titanium">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Analysis data will be available when project is complete.</p>
      </div>
    )
  }

  const analysisTypes = [
    { key: 'structural', label: 'Structural Analysis', color: 'text-stress-red' },
    { key: 'thermal', label: 'Thermal Analysis', color: 'text-warning-orange' },
    { key: 'cfd', label: 'CFD Analysis', color: 'text-ixra-blue' },
    { key: 'modal', label: 'Modal Analysis', color: 'text-deep-purple' },
  ] as const

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {analysisTypes.map(({ key, label, color }) => {
        const data = item.analysisData?.[key]
        if (!data) return null

        return (
          <div key={key} className="p-4 rounded-lg bg-titanium/5 border border-titanium/10">
            <h4 className={cn('font-medium mb-3', color)}>{label}</h4>
            <div className="space-y-2">
              {Object.entries(data).map(([metric, value]) => (
                <div key={metric} className="flex justify-between text-sm">
                  <span className="text-titanium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-plasma-white font-numbers">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DownloadsTab({ item }: { item: GalleryItem }) {
  if (!item.downloads || item.downloads.length === 0) {
    return (
      <div className="text-center py-12 text-titanium">
        <Download className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Downloads will be available when project is complete.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {item.downloads.map((dl, idx) => (
        <a
          key={idx}
          href={dl.url}
          download
          className="flex items-center gap-4 p-4 rounded-lg bg-titanium/5 border border-titanium/10 hover:border-ixra-blue/50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-ixra-blue/10 border border-ixra-blue/30 flex items-center justify-center">
            <span className="text-xs font-bold text-ixra-blue">{dl.format}</span>
          </div>
          <div className="flex-1">
            <p className="text-plasma-white font-medium group-hover:text-ixra-blue transition-colors">{dl.title}</p>
            <p className="text-xs text-titanium">{dl.size}</p>
          </div>
          <Download className="w-5 h-5 text-titanium group-hover:text-ixra-blue transition-colors" />
        </a>
      ))}

      <p className="text-xs text-titanium/60 mt-4 text-center">
        Files are provided for educational purposes. View in Blender, FreeCAD, or your preferred CAD software.
      </p>
    </div>
  )
}

export function DemoModal({ item, onClose }: DemoModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('photos')

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const categoryColors: Record<string, string> = {
    robotics: 'from-ixra-blue/30 to-electric-cyan/30',
    drones: 'from-warning-orange/30 to-stress-red/30',
    automotive: 'from-stress-red/30 to-warning-orange/30',
    aerospace: 'from-deep-purple/30 to-ixra-blue/30',
    ev: 'from-success-green/30 to-ixra-blue/30',
    medical: 'from-electric-cyan/30 to-success-green/30',
    hobby: 'from-warning-orange/30 to-success-green/30',
    industrial: 'from-titanium/30 to-ixra-blue/30',
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-void/95 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-void border border-titanium/30 rounded-xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className={cn('relative p-6 bg-gradient-to-br', categoryColors[item.category] || 'from-titanium/30 to-void')}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-void/80 border border-titanium/30 text-titanium hover:text-plasma-white hover:border-ixra-blue transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-3">
              <StatusBadge status={item.status} />
              <span className="px-3 py-1 text-xs font-medium text-ixra-blue bg-ixra-blue/10 rounded-full border border-ixra-blue/30 uppercase">
                {item.category}
              </span>
            </div>

            <h2 className="font-headline text-2xl md:text-3xl text-plasma-white mb-2">
              {item.title}
            </h2>
            <p className="text-titanium max-w-2xl">{item.description}</p>

            {/* Quick stats */}
            {item.stats && (
              <div className="flex flex-wrap gap-4 mt-4">
                {Object.entries(item.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="font-numbers text-lg text-ixra-blue">{value}</p>
                    <p className="text-xs text-titanium capitalize">{key}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-titanium/20">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'text-ixra-blue border-b-2 border-ixra-blue bg-ixra-blue/5'
                    : 'text-titanium hover:text-plasma-white hover:bg-titanium/5'
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'photos' && <PhotoGallery item={item} />}
            {activeTab === 'docs' && <DocumentsTab item={item} />}
            {activeTab === 'analysis' && <AnalysisTab item={item} />}
            {activeTab === 'downloads' && <DownloadsTab item={item} />}
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-titanium/20 bg-titanium/5">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-titanium/30 text-titanium rounded-lg hover:border-ixra-blue hover:text-plasma-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
