import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { cn } from '../lib/utils'

/**
 * Carrossel com arrasto (mouse/toque), setas de navegação e barra de progresso.
 * `slideClass` define a largura de cada slide (ex.: "basis-[85%] sm:basis-1/2 lg:basis-1/3").
 */
export function Carousel({
  children,
  slideClass,
  dark,
  header,
  className,
}: {
  children: ReactNode[]
  slideClass: string
  dark?: boolean
  header?: ReactNode
  className?: string
}) {
  const [ref, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', dragFree: false })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [progress, setProgress] = useState(0)

  const sync = useCallback(() => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
    setProgress(Math.max(0, Math.min(1, api.scrollProgress())))
  }, [api])

  useEffect(() => {
    if (!api) return
    sync()
    api.on('select', sync).on('reInit', sync).on('scroll', sync)
    return () => {
      api.off('select', sync).off('reInit', sync).off('scroll', sync)
    }
  }, [api, sync])

  useEffect(() => {
    api?.reInit()
    api?.scrollTo(0, true)
  }, [api, children.length])

  const arrow = cn(
    'grid size-12 cursor-pointer place-items-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30',
    dark ? 'border-white/15 text-white hover:bg-white hover:text-ink-900' : 'border-ink-200 bg-white text-ink-800 hover:border-ink-900 hover:bg-ink-900 hover:text-white',
  )

  return (
    <div className={className}>
      <div className="mb-8 flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">{header}</div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button type="button" className={arrow} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Anterior">
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" className={arrow} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Próximo">
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="-mx-4 overflow-hidden px-4 sm:mx-0 sm:px-0">
        <div className="-ml-4 flex touch-pan-y sm:-ml-6">
          {children.map((child, i) => (
            <div key={i} className={cn('min-w-0 shrink-0 grow-0 pl-4 sm:pl-6', slideClass)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className={cn('h-1 flex-1 overflow-hidden rounded-full', dark ? 'bg-white/10' : 'bg-ink-200')}>
          <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-go-500 to-aqua-400" style={{ scaleX: Math.max(0.08, progress) }} />
        </div>
        <div className="flex gap-2 sm:hidden">
          <button type="button" className={cn(arrow, 'size-10')} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label="Anterior">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" className={cn(arrow, 'size-10')} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label="Próximo">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
