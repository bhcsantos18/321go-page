import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeftRight, CalendarDays, ChevronDown, PlaneLanding, PlaneTakeoff, Ticket, Users } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { carCategories, cruiseRegions, insuranceCoverages } from '../../data/services'
import type { ServiceItem } from '../../lib/quote'
import { cn, todayISO } from '../../lib/utils'
import { Label, Stepper } from '../ui'
import { PlaceSearch } from './PlaceSearch'

type Patch = Partial<ServiceItem>
type Variant = 'box' | 'modal'

export function travelersSummary(i: ServiceItem, withRooms = false) {
  const total = i.adults + i.children + i.babies
  const base = `${total} ${total === 1 ? 'viajante' : 'viajantes'}`
  return withRooms ? `${base} · ${i.rooms} ${i.rooms === 1 ? 'quarto' : 'quartos'}` : base
}

function TravelerSteppers({ item, onChange, rooms }: { item: ServiceItem; onChange: (p: Patch) => void; rooms?: boolean }) {
  return (
    <div className="divide-y divide-ink-100">
      <Stepper label="Adultos" hint="12 anos ou mais" value={item.adults} min={1} max={12} onChange={(v) => onChange({ adults: v })} />
      <Stepper label="Crianças" hint="2 a 11 anos" value={item.children} max={10} onChange={(v) => onChange({ children: v })} />
      <Stepper label="Bebês" hint="Até 1 ano" value={item.babies} max={6} onChange={(v) => onChange({ babies: v })} />
      {rooms && <Stepper label="Quartos" value={item.rooms} min={1} max={8} onChange={(v) => onChange({ rooms: v })} />}
    </div>
  )
}

function TravelersPopover({ item, onChange, rooms }: { item: ServiceItem; onChange: (p: Patch) => void; rooms?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="field flex cursor-pointer items-center gap-2.5 text-left">
        <Users className="size-4.5 shrink-0 text-ink-400" />
        <span className="flex-1 truncate">{travelersSummary(item, rooms)}</span>
        <ChevronDown className={cn('size-4 text-ink-400 transition', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full right-0 z-30 mt-2 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-ink-100 bg-white px-4 py-2 shadow-2xl shadow-ink-900/15"
          >
            <TravelerSteppers item={item} onChange={onChange} rooms={rooms} />
            <button type="button" onClick={() => setOpen(false)} className="mt-1 mb-2 w-full cursor-pointer rounded-xl bg-ink-900 py-2.5 text-sm font-semibold text-white">
              Pronto
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Cell({ label, children, className, htmlFor }: { label: string; children: ReactNode; className?: string; htmlFor?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function DateInput({ value, onChange, min, id, invalid }: { value: string; onChange: (v: string) => void; min?: string; id?: string; invalid?: boolean }) {
  return (
    <div className="relative">
      <CalendarDays className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
      <input id={id} type="date" value={value} min={min} onChange={(e) => onChange(e.target.value)} className={cn('field pl-10', !value && 'text-ink-400', invalid && 'border-go-500 ring-4 ring-go-500/15')} />
    </div>
  )
}

function Select({ value, onChange, options, id }: { value: string; onChange: (v: string) => void; options: string[]; id?: string }) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field cursor-pointer appearance-none pr-10">
        <option value="">Selecione</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

export function TripTypeToggle({ value, onChange }: { value: ServiceItem['tripType']; onChange: (v: ServiceItem['tripType']) => void }) {
  const layoutId = useId()
  const opts: [ServiceItem['tripType'], string][] = [
    ['ida-volta', 'Ida e volta'],
    ['so-ida', 'Só ida'],
  ]
  return (
    <div className="inline-flex rounded-full bg-ink-100 p-1" role="radiogroup" aria-label="Tipo de viagem">
      {opts.map(([v, l]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v} onClick={() => onChange(v)} className={cn('relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition', value === v ? 'text-white' : 'text-ink-600 hover:text-ink-900')}>
          {value === v && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  )
}

/** Campos de um serviço. `variant="box"` = card da home (compacto); `modal` = formulário em etapas. */
export function ServiceFields({ item, onChange, variant, errors = {} }: { item: ServiceItem; onChange: (p: Patch) => void; variant: Variant; errors?: Record<string, boolean> }) {
  const today = todayISO()
  const k = (f: string) => `${item.id}-${f}`
  const det = (key: string, v: string) => onChange({ details: { ...item.details, [key]: v } })
  const travelers = (rooms?: boolean) =>
    variant === 'box' ? (
      <Cell label={rooms ? 'Hóspedes' : 'Viajantes'}>
        <TravelersPopover item={item} onChange={onChange} rooms={rooms} />
      </Cell>
    ) : (
      <div className="rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-1 sm:col-span-2">
        <TravelerSteppers item={item} onChange={onChange} rooms={rooms} />
      </div>
    )
  const dates = (a: string, b?: string) => (
    <>
      <Cell label={a} htmlFor={k('start')}>
        <DateInput id={k('start')} value={item.dateStart} min={today} invalid={errors.dateStart} onChange={(v) => onChange({ dateStart: v, dateEnd: item.dateEnd && item.dateEnd < v ? '' : item.dateEnd })} />
      </Cell>
      {b && (
        <Cell label={b} htmlFor={k('end')}>
          <DateInput id={k('end')} value={item.dateEnd} min={item.dateStart || today} onChange={(v) => onChange({ dateEnd: v })} />
        </Cell>
      )}
    </>
  )

  let cells: ReactNode
  let cols = 'lg:grid-cols-4'

  switch (item.service) {
    case 'aereo':
      cols = item.tripType === 'so-ida' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
      cells = (
        <>
          <Cell label="Origem" htmlFor={k('origin')} className="relative">
            <PlaceSearch id={k('origin')} value={item.origin} onChange={(v) => onChange({ origin: v })} icon={PlaneTakeoff} placeholder="De onde você sai?" invalid={errors.origin} />
            <button
              type="button"
              aria-label="Inverter origem e destino"
              onClick={() => onChange({ origin: item.destination, destination: item.origin })}
              className="absolute -right-4 bottom-2 z-10 hidden size-8 cursor-pointer place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-sm transition hover:rotate-180 hover:text-go-600 sm:grid"
            >
              <ArrowLeftRight className="size-3.5" />
            </button>
          </Cell>
          <Cell label="Destino" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} icon={PlaneLanding} placeholder="Para onde vai?" invalid={errors.destination} />
          </Cell>
          {dates('Ida', item.tripType === 'ida-volta' ? 'Volta' : undefined)}
          {travelers()}
        </>
      )
      break
    case 'hospedagem':
      cells = (
        <>
          <Cell label="Destino" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} placeholder="Cidade, região ou hotel" invalid={errors.destination} />
          </Cell>
          {dates('Check-in', 'Check-out')}
          {travelers(true)}
        </>
      )
      break
    case 'pacote':
      cols = 'lg:grid-cols-5'
      cells = (
        <>
          <Cell label="Saindo de" htmlFor={k('origin')}>
            <PlaceSearch id={k('origin')} value={item.origin} onChange={(v) => onChange({ origin: v })} icon={PlaneTakeoff} placeholder="Sua cidade" />
          </Cell>
          <Cell label="Destino" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} placeholder="Para onde vai?" invalid={errors.destination} />
          </Cell>
          {dates('Ida', 'Volta')}
          {travelers()}
        </>
      )
      break
    case 'carro':
      cells = (
        <>
          <Cell label="Retirada" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} placeholder="Cidade ou aeroporto" invalid={errors.destination} />
          </Cell>
          <Cell label="Devolução" htmlFor={k('drop')}>
            <PlaceSearch id={k('drop')} value={item.details.dropoff ?? ''} onChange={(v) => det('dropoff', v)} placeholder="Mesmo local" />
          </Cell>
          {dates('Data de retirada', 'Data de devolução')}
          {variant === 'modal' && (
            <Cell label="Categoria" htmlFor={k('cat')}>
              <Select id={k('cat')} value={item.details.category ?? ''} onChange={(v) => det('category', v)} options={carCategories} />
            </Cell>
          )}
        </>
      )
      break
    case 'ingressos':
      cells = (
        <>
          <Cell label="Destino" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} placeholder="Ex.: Orlando" invalid={errors.destination} />
          </Cell>
          <Cell label="Parques ou atrações" htmlFor={k('parks')}>
            <div className="relative">
              <Ticket className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
              <input id={k('parks')} value={item.details.parks ?? ''} onChange={(e) => det('parks', e.target.value)} placeholder="Disney, Universal..." className="field pl-10" />
            </div>
          </Cell>
          {dates('Primeiro dia')}
          {travelers()}
        </>
      )
      break
    case 'seguro':
      cells = (
        <>
          <Cell label="Destino" htmlFor={k('dest')}>
            <PlaceSearch id={k('dest')} value={item.destination} onChange={(v) => onChange({ destination: v })} placeholder="País ou região" invalid={errors.destination} />
          </Cell>
          {dates('Início', 'Fim')}
          {travelers()}
          {variant === 'modal' && (
            <Cell label="Cobertura" htmlFor={k('cov')}>
              <Select id={k('cov')} value={item.details.coverage ?? ''} onChange={(v) => det('coverage', v)} options={insuranceCoverages} />
            </Cell>
          )}
        </>
      )
      break
    case 'cruzeiro':
      cells = (
        <>
          <Cell label="Região" htmlFor={k('region')}>
            <Select id={k('region')} value={item.details.region ?? ''} onChange={(v) => det('region', v)} options={cruiseRegions} />
          </Cell>
          <Cell label="Mês de embarque" htmlFor={k('month')}>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
              <input id={k('month')} type="month" min={today.slice(0, 7)} value={item.details.month ?? ''} onChange={(e) => det('month', e.target.value)} className={cn('field pl-10', !item.details.month && 'text-ink-400')} />
            </div>
          </Cell>
          <Cell label="Porto de embarque" htmlFor={k('origin')}>
            <PlaceSearch id={k('origin')} value={item.origin} onChange={(v) => onChange({ origin: v })} placeholder="Ex.: Santos" />
          </Cell>
          {travelers()}
        </>
      )
      break
  }

  return (
    <div className={cn('grid gap-3', variant === 'box' ? cn('sm:grid-cols-2', cols) : 'sm:grid-cols-2')}>
      {cells}
      {variant === 'modal' && (
        <div className="sm:col-span-2">
          <Label htmlFor={k('notes')}>Detalhes adicionais</Label>
          <textarea
            id={k('notes')}
            rows={2}
            value={item.details.notes ?? ''}
            onChange={(e) => det('notes', e.target.value)}
            placeholder="Ex.: preferência de horário, companhia, hotel específico, idade das crianças..."
            className="field h-auto resize-none py-3"
          />
        </div>
      )}
    </div>
  )
}
