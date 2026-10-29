import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CalculatorSummary, ServiceId } from '../data/types'
import { uid } from './utils'

export interface ServiceItem {
  id: string
  service: ServiceId
  tripType: 'ida-volta' | 'so-ida'
  origin: string
  destination: string
  dateStart: string
  dateEnd: string
  adults: number
  children: number
  babies: number
  rooms: number
  /** Campos específicos de cada serviço (categoria do carro, cobertura do seguro, parques...) */
  details: Record<string, string>
}

export interface QuoteDraft {
  main: ServiceId
  items: ServiceItem[]
  extras: ServiceId[]
  prefs: { flex: string; cabin: string; hotel: string; board: string; budget: string; notes: string }
  contact: { name: string; whatsapp: string; email: string; notes: string; consent: boolean }
  calculator?: CalculatorSummary
  source: string
}

export interface OpenQuoteOptions {
  service?: ServiceId
  item?: Partial<ServiceItem>
  calculator?: CalculatorSummary
  source?: string
  notes?: string
}

export function newItem(service: ServiceId, base: Partial<ServiceItem> = {}): ServiceItem {
  return {
    tripType: 'ida-volta',
    origin: '',
    destination: '',
    dateStart: '',
    dateEnd: '',
    adults: 2,
    children: 0,
    babies: 0,
    rooms: 1,
    ...base,
    details: { ...(base.details ?? {}) },
    id: uid(),
    service,
  }
}

function emptyDraft(service: ServiceId = 'aereo'): QuoteDraft {
  return {
    main: service,
    items: [newItem(service)],
    extras: [],
    prefs: { flex: 'Datas exatas', cabin: 'Econômica', hotel: 'Indiferente', board: 'Café da manhã', budget: 'Prefiro não informar', notes: '' },
    contact: { name: '', whatsapp: '', email: '', notes: '', consent: false },
    source: 'site',
  }
}

interface QuoteContextValue {
  isOpen: boolean
  draft: QuoteDraft
  update: (fn: (d: QuoteDraft) => QuoteDraft) => void
  openQuote: (opts?: OpenQuoteOptions) => void
  closeQuote: () => void
  reset: () => void
}

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [draft, setDraft] = useState<QuoteDraft>(() => emptyDraft())

  const openQuote = useCallback((opts: OpenQuoteOptions = {}) => {
    setDraft((prev) => {
      const service = opts.service ?? 'pacote'
      const next = emptyDraft(service)
      next.items = [newItem(service, opts.item)]
      next.calculator = opts.calculator
      next.source = opts.source ?? 'site'
      next.prefs.notes = opts.notes ?? ''
      // Mantém os dados de contato já digitados nesta visita
      next.contact = { ...prev.contact, consent: false }
      return next
    })
    setOpen(true)
  }, [])

  // Funções estáveis: o modal depende delas em efeitos e não pode reiniciar a cada digitação
  const update = useCallback((fn: (d: QuoteDraft) => QuoteDraft) => setDraft((d) => fn(d)), [])
  const closeQuote = useCallback(() => setOpen(false), [])
  const reset = useCallback(() => setDraft((d) => ({ ...emptyDraft(d.main), contact: { ...d.contact, consent: false } })), [])

  const value = useMemo<QuoteContextValue>(
    () => ({ isOpen, draft, update, openQuote, closeQuote, reset }),
    [isOpen, draft, update, openQuote, closeQuote, reset],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote precisa estar dentro de <QuoteProvider>')
  return ctx
}
