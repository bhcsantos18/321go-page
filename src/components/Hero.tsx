import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Kicker } from './ui'

export function Aurora({ className, intense }: { className?: string; intense?: boolean }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className={cn('absolute -top-1/3 -left-1/4 size-[55rem] animate-aurora rounded-full bg-go-500 blur-[140px]', intense ? 'opacity-35' : 'opacity-25')} />
      <div className="absolute -top-1/4 right-[-20%] size-[50rem] animate-aurora rounded-full bg-ocean-500 opacity-30 blur-[140px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-40%] left-1/3 size-[40rem] animate-aurora rounded-full bg-aqua-400 opacity-15 blur-[140px] [animation-delay:-12s]" />
      <div className="grid-lines absolute inset-0" />
      <div className="noise absolute inset-0" />
    </div>
  )
}

/** Cabeçalho das páginas internas, com foto opcional em parallax. */
export function PageHero({
  kicker,
  title,
  text,
  image,
  children,
  className,
  size = 'md',
}: {
  kicker?: string
  title: ReactNode
  text?: ReactNode
  image?: string
  children?: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden bg-ink-950 text-white',
        size === 'lg' ? 'pt-36 pb-24 sm:pt-44 sm:pb-32' : size === 'md' ? 'pt-32 pb-16 sm:pt-40 sm:pb-24' : 'pt-28 pb-10 sm:pt-32 sm:pb-14',
        className,
      )}
    >
      {image ? (
        <motion.div style={{ y }} className="absolute inset-0 -z-10">
          <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} src={image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/50 to-ink-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
        </motion.div>
      ) : (
        <Aurora className="-z-10" />
      )}
      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {kicker && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Kicker dark>{kicker}</Kicker>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-4xl text-4xl leading-[1.04] font-semibold sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
