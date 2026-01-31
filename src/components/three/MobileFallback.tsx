import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MobileFallbackProps {
  imageSrc: string
  alt: string
  className?: string
}

export function MobileFallback({
  imageSrc,
  alt,
  className,
}: MobileFallbackProps) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
