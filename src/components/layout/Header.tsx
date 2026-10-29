import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company } from '../../data/company'
import { useQuote } from '../../lib/quote'
import { cn } from '../../lib/utils'
import { Button } from '../ui'

export const navItems = [
  { to: '/', label: 'Início' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/orlando', label: 'Orlando' },
  { to: '/orlando/mapas', label: 'Mapas' },
  { to: '/orlando/calculadora', label: 'Calculadora' },
]

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)} aria-label={`${company.name} — página inicial`}>
      <motion.img
        src="/img/brand/logo-sm.png"
        alt=""
        className="size-12 drop-shadow-[0_6px_14px_rgba(255,77,0,0.35)]"
        whileHover={{ rotate: -8, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14 }}
      />
      {!compact && (
        <span className="hidden leading-none sm:block">
          <span className="block font-display text-lg font-bold tracking-tight text-white">3,2,1 GO!</span>
          <span className="block text-[11px] font-medium tracking-[0.2em] text-ink-300 uppercase">Viagens</span>
        </span>
      )}
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { openQuote } = useQuote()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname === to || (to === '/orlando' ? pathname.startsWith('/orlando/parques') || pathname === '/orlando' : pathname.startsWith(to)))

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled || open ? 'border-b border-white/10 bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 rounded-full p-1 lg:flex" aria-label="Principal">
            {navItems.map((item) => {
              const active = isActive(item.to)
              return (
                <NavLink key={item.to} to={item.to} className={cn('relative rounded-full px-4 py-2 text-sm font-medium transition-colors', active ? 'text-white' : 'text-ink-300 hover:text-white')}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/area-do-cliente"
              className={cn(
                'hidden h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition md:inline-flex',
                pathname.startsWith('/area-do-cliente') ? 'bg-white/10 text-white' : 'text-ink-200 hover:bg-white/10 hover:text-white',
              )}
            >
              <UserRound className="size-4" /> Área do Cliente
            </Link>
            <Button size="sm" className="h-10 px-4" onClick={() => openQuote({ source: 'header' })}>
              <span className="sm:hidden">Orçamento</span>
              <span className="hidden sm:inline">Solicitar orçamento</span>
            </Button>
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 cursor-pointer place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? 'x' : 'm'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/95 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1 px-6" aria-label="Menu mobile">
              {[...navItems, { to: '/area-do-cliente', label: 'Área do Cliente' }].map((item, i) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}>
                  <NavLink
                    to={item.to}
                    className={cn(
                      'flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-tight',
                      isActive(item.to) ? 'text-go-400' : 'text-white',
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="size-6 opacity-40" />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8">
                <Button size="lg" className="w-full" onClick={() => { setOpen(false); openQuote({ source: 'menu' }) }}>
                  Solicitar orçamento
                </Button>
                <p className="mt-6 text-center text-sm text-ink-400">
                  {company.phone} · {company.email}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
