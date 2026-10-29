import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { serviceById, services } from '../../data/services'
import type { ServiceId } from '../../data/types'
import { newItem, useQuote, type ServiceItem } from '../../lib/quote'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { ServiceFields, TripTypeToggle } from './ServiceFields'

export function QuoteBox() {
  const { openQuote } = useQuote()
  const [tab, setTab] = useState<ServiceId>('aereo')
  const [items, setItems] = useState<Record<ServiceId, ServiceItem>>(
    () => Object.fromEntries(services.map((s) => [s.id, newItem(s.id, s.id === 'ingressos' ? { destination: 'Orlando (MCO)' } : {})])) as Record<ServiceId, ServiceItem>,
  )
  const item = items[tab]
  const patch = (p: Partial<ServiceItem>) => setItems((all) => ({ ...all, [tab]: { ...all[tab], ...p } }))

  return (
    <div className="glass relative rounded-[28px] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:p-2.5">
      <div className="flex flex-col gap-3 px-3 pt-3 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white sm:text-xl">
          <Sparkles className="size-5 text-aqua-300" /> Por onde você quer começar?
        </h2>
      </div>

      <div role="tablist" aria-label="Serviços" className="no-scrollbar -mx-0.5 flex gap-1 overflow-x-auto px-2 pb-2.5">
        {services.map((s) => {
          const active = s.id === tab
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(s.id)}
              className={cn('relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors', active ? 'text-ink-900' : 'text-ink-200 hover:bg-white/8 hover:text-white')}
            >
              {active && <motion.span layoutId="quote-tab" className="absolute inset-0 rounded-full bg-white shadow-lg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
              <s.icon className={cn('relative size-4', active && 'text-go-500')} />
              <span className="relative">{s.label}</span>
            </button>
          )
        })}
      </div>

      <div className="rounded-[22px] bg-white p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'aereo' && (
              <div className="mb-4">
                <TripTypeToggle value={item.tripType} onChange={(v) => patch({ tripType: v })} />
              </div>
            )}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
              <div className="flex-1">
                <ServiceFields item={item} onChange={patch} variant="box" />
              </div>
              <Button size="lg" className="h-12 w-full xl:w-auto" onClick={() => openQuote({ service: tab, item, source: 'home' })}>
                Solicitar <ArrowRight className="size-5 transition group-hover/btn:translate-x-1" />
              </Button>
            </div>
            <p className="mt-3 text-xs text-ink-400">
              Sem compromisso · Um consultor monta a melhor proposta de {serviceById[tab].singular} para você.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
