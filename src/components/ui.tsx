import { motion, type HTMLMotionProps } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'dark' | 'light' | 'ghost' | 'outline' | 'glass'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-go-500 text-white shadow-[0_10px_30px_-10px_var(--color-go-500)] hover:bg-go-600 hover:shadow-[0_14px_36px_-10px_var(--color-go-500)]',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
  light: 'bg-white text-ink-900 hover:bg-ink-100',
  ghost: 'text-ink-700 hover:bg-ink-100',
  outline: 'border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50',
  glass: 'glass text-white hover:bg-white/12',
}
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group/btn relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
}

export function Button({ variant, size, className, ...props }: BaseProps & ComponentProps<'button'>) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />
}

export function LinkButton({ variant, size, className, ...props }: BaseProps & ComponentProps<typeof Link>) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}

export function AnchorButton({ variant, size, className, ...props }: BaseProps & ComponentProps<'a'>) {
  return <a className={buttonClass(variant, size, className)} target="_blank" rel="noreferrer" {...props} />
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase',
        dark ? 'glass text-aqua-200' : 'bg-go-50 text-go-600 ring-1 ring-go-100',
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', dark ? 'bg-aqua-300' : 'bg-go-500')} />
      {children}
    </span>
  )
}

export function SectionTitle({
  kicker,
  title,
  text,
  dark,
  center,
  className,
  action,
}: {
  kicker?: string
  title: ReactNode
  text?: ReactNode
  dark?: boolean
  center?: boolean
  className?: string
  action?: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', center && 'items-center text-center md:flex-col md:items-center', className)}>
      <Reveal className={cn('max-w-2xl', center && 'mx-auto')}>
        {kicker && <Kicker dark={dark}>{kicker}</Kicker>}
        <h2 className={cn('mt-4 text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-5xl', dark ? 'text-white' : 'text-ink-900')}>{title}</h2>
        {text && <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-ink-300' : 'text-ink-500')}>{text}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  )
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
  step = 1,
  label,
  hint,
  format,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  label: string
  hint?: string
  format?: (v: number) => string
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <div className="text-[15px] font-medium text-ink-900">{label}</div>
        {hint && <div className="text-xs text-ink-400">{hint}</div>}
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, +(value - step).toFixed(1)))}
          className="grid size-9 cursor-pointer place-items-center rounded-full border border-ink-200 text-ink-700 transition hover:border-go-500 hover:text-go-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="size-4" />
        </button>
        <motion.span key={value} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="min-w-12 text-center font-display font-semibold tabular-nums">
          {format ? format(value) : value}
        </motion.span>
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, +(value + step).toFixed(1)))}
          className="grid size-9 cursor-pointer place-items-center rounded-full border border-ink-200 text-ink-700 transition hover:border-go-500 hover:text-go-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function Label({ children, htmlFor, className }: { children: ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn('mb-1.5 block text-xs font-semibold tracking-wide text-ink-500 uppercase', className)}>
      {children}
    </label>
  )
}

export function Choice({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
        active ? 'border-go-500 bg-go-500 text-white shadow-[0_8px_20px_-8px_var(--color-go-500)]' : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46m8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.04-1.58a11.4 11.4 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05" />
    </svg>
  )
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}
