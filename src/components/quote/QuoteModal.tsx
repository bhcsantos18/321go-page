import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calculator, Check, Copy, LoaderCircle, Mail, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { boardOptions, budgetOptions, cabinOptions, flexOptions, hotelOptions, serviceById, services } from '../../data/services'
import type { ServiceId } from '../../data/types'
import { newItem, useQuote, type QuoteDraft, type ServiceItem } from '../../lib/quote'
import { mailtoLink, quoteToText, submitQuote, type StoredRequest } from '../../lib/submit'
import { cn, formatDays, isEmail, maskPhone } from '../../lib/utils'
import { Button, Choice, Label, WhatsAppIcon } from '../ui'
import { ServiceFields, TripTypeToggle } from './ServiceFields'

type StepKey = 'viagem' | 'preferencias' | 'servicos' | 'detalhes' | 'contato'

const stepMeta: Record<StepKey, { label: string; title: string; text: string }> = {
  viagem: { label: 'Viagem', title: 'Sua viagem', text: 'Confira os dados principais. Se tiver mais de um trecho ou hotel, é só adicionar.' },
  preferencias: { label: 'Preferências', title: 'Suas preferências', text: 'Isso ajuda o consultor a acertar de primeira na proposta.' },
  servicos: { label: 'Serviços', title: 'Quais outros serviços deseja incluir?', text: 'Selecione quantos quiser — montamos tudo em uma única proposta.' },
  detalhes: { label: 'Detalhes', title: 'Detalhes dos serviços', text: 'Preenchemos com os dados da sua viagem. Ajuste o que for preciso.' },
  contato: { label: 'Contato', title: 'Para onde enviamos a proposta?', text: 'Um consultor da 3,2,1 GO entra em contato em breve.' },
}

function needsDestination(i: ServiceItem) {
  return i.service !== 'cruzeiro'
}

function validateItems(items: ServiceItem[]) {
  const e: Record<string, boolean> = {}
  for (const i of items) {
    if (needsDestination(i) && !i.destination.trim()) e[`${i.id}.destination`] = true
    if (i.service === 'aereo' && !i.origin.trim()) e[`${i.id}.origin`] = true
  }
  return e
}

function itemErrors(errors: Record<string, boolean>, id: string) {
  return Object.fromEntries(Object.entries(errors).filter(([k]) => k.startsWith(id + '.')).map(([k, v]) => [k.split('.')[1], v]))
}

export function QuoteModal() {
  const { isOpen, draft, update, closeQuote, reset } = useQuote()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<StoredRequest | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const steps: StepKey[] = ['viagem', 'preferencias', 'servicos', ...(draft.extras.length ? (['detalhes'] as const) : []), 'contato']
  const step = steps[Math.min(idx, steps.length - 1)]
  const progress = status === 'done' ? 100 : ((idx + 1) / (steps.length + 1)) * 100

  useEffect(() => {
    if (!isOpen) return
    setIdx(0)
    setStatus('idle')
    setErrors({})
    setResult(null)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeQuote()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeQuote])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [idx, status])

  const setItem = (id: string, p: Partial<ServiceItem>) => update((d) => ({ ...d, items: d.items.map((i) => (i.id === id ? { ...i, ...p } : i)) }))
  const mainItem = draft.items.find((i) => i.service === draft.main) ?? draft.items[0]

  function seedFromMain(service: ServiceId) {
    return newItem(service, {
      destination: service === 'carro' || service === 'hospedagem' || service === 'ingressos' || service === 'seguro' ? mainItem?.destination ?? '' : '',
      dateStart: mainItem?.dateStart ?? '',
      dateEnd: mainItem?.dateEnd ?? '',
      adults: mainItem?.adults ?? 2,
      children: mainItem?.children ?? 0,
      babies: mainItem?.babies ?? 0,
    })
  }

  function addItem(service: ServiceId) {
    update((d) => ({ ...d, items: [...d.items, seedFromMain(service)] }))
  }
  function removeItem(id: string) {
    update((d) => ({ ...d, items: d.items.filter((i) => i.id !== id) }))
  }
  function toggleExtra(service: ServiceId) {
    update((d) => {
      const on = d.extras.includes(service)
      return on
        ? { ...d, extras: d.extras.filter((s) => s !== service), items: d.items.filter((i) => i.service !== service) }
        : { ...d, extras: [...d.extras, service], items: [...d.items, seedFromMain(service)] }
    })
  }
  function switchMain(service: ServiceId) {
    if (service === draft.main) return
    update((d) => {
      const base = d.items.find((i) => i.service === d.main)
      const items = d.items.filter((i) => i.service !== d.main && i.service !== service)
      return {
        ...d,
        main: service,
        extras: d.extras.filter((s) => s !== service),
        items: [newItem(service, base ? { ...base, details: {} } : {}), ...items],
      }
    })
  }

  function validate(): boolean {
    let e: Record<string, boolean> = {}
    if (step === 'viagem') e = validateItems(draft.items.filter((i) => i.service === draft.main))
    if (step === 'detalhes') e = validateItems(draft.items.filter((i) => i.service !== draft.main))
    if (step === 'contato') {
      const c = draft.contact
      if (c.name.trim().length < 2) e.name = true
      if (c.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = true
      if (!isEmail(c.email)) e.email = true
      if (!c.consent) e.consent = true
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function next() {
    if (!validate()) return
    if (step === 'contato') {
      setStatus('sending')
      try {
        const r = await submitQuote(draft)
        setResult(r)
        setStatus('done')
      } catch {
        setStatus('error')
      }
      return
    }
    setDir(1)
    setIdx((i) => Math.min(i + 1, steps.length - 1))
  }
  function back() {
    setErrors({})
    setDir(-1)
    setIdx((i) => Math.max(0, i - 1))
  }
  function finish() {
    closeQuote()
    setTimeout(reset, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={status === 'done' ? finish : closeQuote} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:rounded-[28px]"
          >
            {/* Cabeçalho + progresso */}
            <div className="relative shrink-0 border-b border-ink-100 px-5 pt-5 pb-4 sm:px-8 sm:pt-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-go-500 uppercase">
                    {status === 'done' ? 'Tudo certo!' : `Etapa ${idx + 1} de ${steps.length}`}
                  </p>
                  <h2 id="quote-title" className="mt-1 font-display text-xl font-semibold text-ink-900 sm:text-2xl">
                    {status === 'done' ? 'Solicitação enviada' : stepMeta[step].title}
                  </h2>
                </div>
                <button type="button" onClick={status === 'done' ? finish : closeQuote} aria-label="Fechar" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-ink-100 text-ink-600 transition hover:rotate-90 hover:bg-ink-200">
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                <motion.div className="h-full rounded-full bg-gradient-to-r from-go-500 via-go-400 to-aqua-400" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              </div>
              {status !== 'done' && (
                <ol className="mt-3 hidden gap-1 text-xs font-medium sm:flex">
                  {steps.map((s, i) => (
                    <li key={s} className={cn('flex flex-1 items-center gap-1.5 transition-colors', i < idx ? 'text-go-600' : i === idx ? 'text-ink-900' : 'text-ink-300')}>
                      <span className={cn('grid size-4.5 place-items-center rounded-full text-[10px]', i < idx ? 'bg-go-500 text-white' : i === idx ? 'bg-ink-900 text-white' : 'bg-ink-100')}>
                        {i < idx ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                      </span>
                      {stepMeta[s].label}
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Conteúdo */}
            <div ref={bodyRef} className="relative flex-1 overflow-x-hidden overflow-y-auto px-5 py-6 sm:px-8">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={status === 'done' ? 'done' : step}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {status === 'done' && result ? (
                    <DoneStep request={result} onClose={finish} />
                  ) : (
                    <>
                      <p className="mb-6 text-sm text-ink-500">{stepMeta[step].text}</p>
                      {step === 'viagem' && (
                        <TripStep draft={draft} errors={errors} setItem={setItem} addItem={addItem} removeItem={removeItem} switchMain={switchMain} />
                      )}
                      {step === 'preferencias' && <PreferencesStep draft={draft} update={update} />}
                      {step === 'servicos' && <ServicesStep draft={draft} toggle={toggleExtra} />}
                      {step === 'detalhes' && <DetailsStep draft={draft} errors={errors} setItem={setItem} addItem={addItem} removeItem={removeItem} />}
                      {step === 'contato' && <ContactStep draft={draft} update={update} errors={errors} />}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rodapé */}
            {status !== 'done' && (
              <div className="shrink-0 border-t border-ink-100 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
                {status === 'error' && <p className="mb-3 text-sm text-go-600">Não conseguimos enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.</p>}
                {Object.keys(errors).length > 0 && <p className="mb-3 text-sm text-go-600">Confira os campos destacados para continuar.</p>}
                <div className="flex items-center justify-between gap-3">
                  {idx > 0 ? (
                    <Button variant="ghost" onClick={back} disabled={status === 'sending'}>
                      <ArrowLeft className="size-4" /> Voltar
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button onClick={next} disabled={status === 'sending'} className="min-w-44">
                    {status === 'sending' ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" /> Enviando...
                      </>
                    ) : step === 'contato' ? (
                      <>
                        Enviar solicitação <ArrowRight className="size-4" />
                      </>
                    ) : (
                      <>
                        Continuar <ArrowRight className="size-4 transition group-hover/btn:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- Etapas ---------------- */

interface ItemOps {
  errors: Record<string, boolean>
  setItem: (id: string, p: Partial<ServiceItem>) => void
  addItem: (s: ServiceId) => void
  removeItem: (id: string) => void
}

function ItemCard({ item, index, total, ops }: { item: ServiceItem; index: number; total: number; ops: ItemOps }) {
  const s = serviceById[item.service]
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} className="rounded-2xl border border-ink-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink-800">
          <span className="grid size-8 place-items-center rounded-lg bg-go-50 text-go-600">
            <s.icon className="size-4" />
          </span>
          {s.label} {total > 1 && <span className="text-ink-400">#{index + 1}</span>}
        </span>
        <div className="flex items-center gap-2">
          {item.service === 'aereo' && <TripTypeToggle value={item.tripType} onChange={(v) => ops.setItem(item.id, { tripType: v })} />}
          {total > 1 && (
            <button type="button" onClick={() => ops.removeItem(item.id)} aria-label="Remover" className="grid size-9 cursor-pointer place-items-center rounded-full text-ink-400 transition hover:bg-go-50 hover:text-go-600">
              <Trash2 className="size-4" />
            </button>
          )}
        </div>
      </div>
      <ServiceFields item={item} onChange={(p) => ops.setItem(item.id, p)} variant="modal" errors={itemErrors(ops.errors, item.id)} />
    </motion.div>
  )
}

function ServiceGroup({ service, items, ops }: { service: ServiceId; items: ServiceItem[]; ops: ItemOps }) {
  const s = serviceById[service]
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((it, i) => (
          <ItemCard key={it.id} item={it} index={i} total={items.length} ops={ops} />
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => ops.addItem(service)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-200 py-3.5 text-sm font-semibold text-ink-600 transition hover:border-go-400 hover:bg-go-50/50 hover:text-go-600"
      >
        <Plus className="size-4" /> Adicionar {s.id === 'hospedagem' ? 'outra' : 'outro'} {s.singular}
      </button>
    </div>
  )
}

function TripStep({ draft, switchMain, ...ops }: { draft: QuoteDraft; switchMain: (s: ServiceId) => void } & ItemOps) {
  return (
    <div className="space-y-6">
      {draft.calculator && (
        <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-ocean-50 to-aqua-200/30 p-4 ring-1 ring-ocean-100">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ocean-600 text-white">
            <Calculator className="size-5" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-ink-900">Resultado da calculadora anexado</p>
            <p className="text-ink-600">
              {draft.calculator.selection.map((s) => s.name).join(', ')} · sugestão de {formatDays(draft.calculator.totalDays)} de viagem
            </p>
          </div>
        </div>
      )}
      <div>
        <Label>Serviço principal</Label>
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {services.map((s) => (
            <Choice key={s.id} active={draft.main === s.id} onClick={() => switchMain(s.id)} className="flex shrink-0 items-center gap-1.5">
              <s.icon className="size-4" /> {s.label}
            </Choice>
          ))}
        </div>
      </div>
      <ServiceGroup service={draft.main} items={draft.items.filter((i) => i.service === draft.main)} ops={ops} />
    </div>
  )
}

function ChoiceGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-semibold text-ink-800">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Choice key={o} active={value === o} onClick={() => onChange(o)}>
            {o}
          </Choice>
        ))}
      </div>
    </fieldset>
  )
}

function PreferencesStep({ draft, update }: { draft: QuoteDraft; update: (fn: (d: QuoteDraft) => QuoteDraft) => void }) {
  const set = (k: keyof QuoteDraft['prefs'], v: string) => update((d) => ({ ...d, prefs: { ...d.prefs, [k]: v } }))
  const all = [draft.main, ...draft.extras]
  return (
    <div className="space-y-7">
      <ChoiceGroup label="Flexibilidade de datas" options={flexOptions} value={draft.prefs.flex} onChange={(v) => set('flex', v)} />
      {all.some((s) => s === 'aereo' || s === 'pacote') && <ChoiceGroup label="Classe do voo" options={cabinOptions} value={draft.prefs.cabin} onChange={(v) => set('cabin', v)} />}
      {all.some((s) => s === 'hospedagem' || s === 'pacote') && (
        <>
          <ChoiceGroup label="Categoria do hotel" options={hotelOptions} value={draft.prefs.hotel} onChange={(v) => set('hotel', v)} />
          <ChoiceGroup label="Regime de alimentação" options={boardOptions} value={draft.prefs.board} onChange={(v) => set('board', v)} />
        </>
      )}
      <ChoiceGroup label="Orçamento estimado" options={budgetOptions} value={draft.prefs.budget} onChange={(v) => set('budget', v)} />
      <div>
        <Label htmlFor="pref-notes">Observações</Label>
        <textarea
          id="pref-notes"
          rows={3}
          value={draft.prefs.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Conte o que é importante para você: comemoração, ritmo da viagem, acessibilidade, restrições alimentares..."
          className="field h-auto resize-none py-3"
        />
      </div>
    </div>
  )
}

function ServicesStep({ draft, toggle }: { draft: QuoteDraft; toggle: (s: ServiceId) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {services
        .filter((s) => s.id !== draft.main)
        .map((s, i) => {
          const on = draft.extras.includes(s.id)
          return (
            <motion.button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(s.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all',
                on ? 'border-go-500 bg-go-50/60 shadow-[0_10px_30px_-14px_var(--color-go-500)]' : 'border-ink-100 hover:border-ink-200',
              )}
            >
              <span className={cn('grid size-12 shrink-0 place-items-center rounded-xl transition', on ? 'bg-go-500 text-white' : 'bg-ink-100 text-ink-500 group-hover:text-ink-800')}>
                <s.icon className="size-5.5" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-ink-900">{s.label}</span>
                <span className="block text-sm text-ink-500">{s.blurb}</span>
              </span>
              <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border-2 transition', on ? 'border-go-500 bg-go-500 text-white' : 'border-ink-200')}>
                <AnimatePresence>
                  {on && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          )
        })}
      <p className="text-sm text-ink-400 sm:col-span-2">Não precisa de mais nada? É só continuar.</p>
    </div>
  )
}

function DetailsStep({ draft, ...ops }: { draft: QuoteDraft } & ItemOps) {
  return (
    <div className="space-y-8">
      {draft.extras.map((s) => {
        const def = serviceById[s]
        return (
          <section key={s}>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
              <def.icon className="size-5 text-go-500" /> {def.label}
            </h3>
            <ServiceGroup service={s} items={draft.items.filter((i) => i.service === s)} ops={ops} />
          </section>
        )
      })}
    </div>
  )
}

function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 text-xs text-go-600">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContactStep({ draft, update, errors }: { draft: QuoteDraft; update: (fn: (d: QuoteDraft) => QuoteDraft) => void; errors: Record<string, boolean> }) {
  const c = draft.contact
  const set = (p: Partial<QuoteDraft['contact']>) => update((d) => ({ ...d, contact: { ...d.contact, ...p } }))
  const err = (k: string) => (errors[k] ? 'border-go-500 ring-4 ring-go-500/15' : '')
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[draft.main, ...draft.extras].map((s) => {
          const def = serviceById[s]
          const n = draft.items.filter((i) => i.service === s).length
          return (
            <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-700">
              <def.icon className="size-3.5" /> {def.label}
              {n > 1 && ` ×${n}`}
            </span>
          )
        })}
      </div>
      <Field label="Nome completo" htmlFor="c-name" error={errors.name ? 'Informe seu nome.' : undefined}>
        <input id="c-name" autoComplete="name" value={c.name} onChange={(e) => set({ name: e.target.value })} placeholder="Como podemos te chamar?" className={cn('field', err('name'))} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp" htmlFor="c-wa" error={errors.whatsapp ? 'Informe um WhatsApp com DDD.' : undefined}>
          <input id="c-wa" inputMode="tel" autoComplete="tel" value={c.whatsapp} onChange={(e) => set({ whatsapp: maskPhone(e.target.value) })} placeholder="(11) 91234-5678" className={cn('field', err('whatsapp'))} />
        </Field>
        <Field label="E-mail" htmlFor="c-mail" error={errors.email ? 'Informe um e-mail válido.' : undefined}>
          <input id="c-mail" type="email" autoComplete="email" value={c.email} onChange={(e) => set({ email: e.target.value })} placeholder="voce@email.com" className={cn('field', err('email'))} />
        </Field>
      </div>
      <Field label="Observações" htmlFor="c-notes">
        <textarea id="c-notes" rows={3} value={c.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Melhor horário para contato, dúvidas..." className="field h-auto resize-none py-3" />
      </Field>
      <label className={cn('flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition', errors.consent ? 'border-go-500 bg-go-50/50' : 'border-ink-100 bg-ink-50/60 hover:border-ink-200')}>
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input type="checkbox" checked={c.consent} onChange={(e) => set({ consent: e.target.checked })} className="peer absolute inset-0 cursor-pointer appearance-none rounded-md border-2 border-ink-300 transition checked:border-go-500 checked:bg-go-500" />
          <Check className="pointer-events-none relative size-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
        </span>
        <span className="text-sm leading-relaxed text-ink-600">
          Autorizo a {company.name} a usar meus dados para elaborar e enviar esta proposta, conforme a{' '}
          <Link to="/privacidade" target="_blank" className="font-semibold text-go-600 underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>{' '}
          e os{' '}
          <Link to="/termos" target="_blank" className="font-semibold text-go-600 underline-offset-2 hover:underline">
            Termos de Uso
          </Link>
          , nos termos da LGPD.
        </span>
      </label>
    </div>
  )
}

function DoneStep({ request, onClose }: { request: StoredRequest; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const text = quoteToText(request.draft, request.protocol)
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="relative">
        <motion.span className="absolute inset-0 rounded-full bg-go-500/30" initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.4, repeat: Infinity }} />
        <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-go-500 to-go-400 text-white shadow-[0_20px_50px_-12px_var(--color-go-500)]">
          <svg viewBox="0 0 24 24" className="size-12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
          </svg>
        </motion.div>
      </div>
      <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 font-display text-3xl font-semibold text-ink-900">
        3, 2, 1… <span className="text-gradient">GO!</span>
      </motion.h3>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-3 max-w-md text-ink-500">
        Recebemos sua solicitação, {request.draft.contact.name.split(' ')[0]}! Um consultor vai analisar tudo e falar com você pelo WhatsApp ou e-mail em breve.
      </motion.p>
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        onClick={() => {
          navigator.clipboard?.writeText(request.protocol)
          setCopied(true)
        }}
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink-100 px-4 py-2 font-mono text-sm font-semibold text-ink-800 transition hover:bg-ink-200"
      >
        Protocolo {request.protocol} {copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4 text-ink-400" />}
      </motion.button>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-8 w-full max-w-md space-y-3">
        <p className="text-sm text-ink-400">Quer agilizar? Envie o resumo direto para a equipe:</p>
        <a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] font-semibold text-white transition hover:brightness-95">
          <WhatsAppIcon className="size-5" /> Enviar pelo WhatsApp
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a href={mailtoLink(request.draft, request.protocol)} className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink-200 font-semibold text-ink-800 transition hover:bg-ink-50">
            <Mail className="size-4" /> Por e-mail
          </a>
          <Button variant="dark" className="h-12" onClick={onClose}>
            Concluir
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
