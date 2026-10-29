import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarCheck, CalendarRange, Check, CircleHelp, Info, RotateCcw, Send, Sparkles, TriangleAlert, Wand2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHero } from '../components/Hero'
import { ParkBadge } from '../components/ParkBadge'
import { Button, Label, Stepper } from '../components/ui'
import { crowdLabel, monthCrowd, parkBySlug, resorts } from '../data/parks'
import type { CalculatorSummary } from '../data/types'
import { useQuote } from '../lib/quote'
import { cn, daysBetween, formatDate, formatDays, todayISO } from '../lib/utils'

type DateMode = CalculatorSummary['dateMode']

const presets = [
  { label: 'Primeira vez na Disney', parks: ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 'disney-springs'] },
  { label: 'Disney + Universal', parks: ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 'universal-studios', 'islands-of-adventure', 'epic-universe'] },
  { label: 'Fãs de montanha-russa', parks: ['islands-of-adventure', 'epic-universe', 'hollywood-studios', 'seaworld', 'busch-gardens'] },
  { label: 'Harry Potter total', parks: ['universal-studios', 'islands-of-adventure', 'epic-universe'] },
]

const stepNames = ['Datas e viajantes', 'Parques e experiências', 'Resultado']

export default function Calculadora() {
  const { openQuote } = useQuote()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [mode, setMode] = useState<DateMode>('datas')
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [months, setMonths] = useState<string[]>([])
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [sel, setSel] = useState<Record<string, number>>({})

  const summary = useMemo<CalculatorSummary>(() => {
    const selection = Object.entries(sel).map(([slug, days]) => ({ name: parkBySlug[slug].name, days }))
    const parkDays = selection.reduce((s, x) => s + x.days, 0)
    const restDays = parkDays >= 4 ? Math.floor(parkDays / 4) : 0
    const travelDays = parkDays > 0 ? 2 : 0
    return {
      dateMode: mode,
      arrival: mode === 'datas' ? arrival : undefined,
      departure: mode === 'datas' ? departure : undefined,
      months: mode === 'meses' ? months.map((m) => monthCrowd.find((x) => x.key === m)!.label) : undefined,
      adults,
      children,
      selection,
      parkDays,
      restDays,
      travelDays,
      totalDays: Math.ceil(parkDays) + restDays + travelDays,
    }
  }, [sel, mode, arrival, departure, months, adults, children])

  const tripDays = mode === 'datas' && arrival && departure ? daysBetween(arrival, departure) + 1 : 0
  const go = (n: number) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    window.scrollTo({ top: document.getElementById('calc')!.offsetTop - 90, behavior: 'smooth' })
  }

  const toggle = (slug: string) =>
    setSel((s) => {
      const n = { ...s }
      if (slug in n) delete n[slug]
      else n[slug] = parkBySlug[slug].days
      return n
    })

  function send() {
    openQuote({
      service: 'ingressos',
      item: {
        destination: 'Orlando (MCO)',
        dateStart: mode === 'datas' ? arrival : '',
        dateEnd: mode === 'datas' ? departure : '',
        adults,
        children,
        details: { parks: summary.selection.map((s) => s.name).join(', ') },
      },
      calculator: summary,
      source: 'calculadora',
      notes: mode === 'meses' && months.length ? `Meses considerados: ${summary.months?.join(', ')}` : mode === 'indefinido' ? 'Ainda não definiu as datas.' : '',
    })
  }

  return (
    <>
      <PageHero
        size="sm"
        kicker="Calculadora de dias"
        title={
          <>
            Quantos dias você precisa para <span className="text-gradient">aproveitar Orlando?</span>
          </>
        }
        text="Em três passos você descobre o tempo ideal de viagem e envia a seleção para a gente cotar os ingressos."
      />

      <section id="calc" className="bg-ink-50 pt-10 pb-32 sm:pt-14 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Progresso */}
          <div className="mb-8 flex items-center gap-2 sm:gap-4">
            {stepNames.map((n, i) => (
              <button
                key={n}
                type="button"
                onClick={() => i < step && go(i)}
                disabled={i > step}
                className={cn('group flex flex-1 cursor-pointer flex-col gap-2 text-left disabled:cursor-default', i > step && 'opacity-50')}
              >
                <span className="h-1.5 overflow-hidden rounded-full bg-ink-200">
                  <motion.span className="block h-full rounded-full bg-gradient-to-r from-go-500 to-go-400" initial={false} animate={{ width: i <= step ? '100%' : '0%' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
                </span>
                <span className="text-xs font-semibold text-ink-500 sm:text-sm">
                  <span className="text-go-500">{i + 1}.</span> {n}
                </span>
              </button>
            ))}
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
            <div className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-ink-100 sm:p-8">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={{ enter: (d: number) => ({ x: d * 40, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -40, opacity: 0 }) }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-display text-2xl font-semibold">Quando você pretende viajar?</h2>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          {(
                            [
                              ['datas', 'Tenho as datas', CalendarCheck],
                              ['meses', 'Decidindo os meses', CalendarRange],
                              ['indefinido', 'Ainda não sei', CircleHelp],
                            ] as const
                          ).map(([v, l, Icon]) => (
                            <button
                              key={v}
                              type="button"
                              aria-pressed={mode === v}
                              onClick={() => setMode(v)}
                              className={cn('flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 text-left font-semibold transition', mode === v ? 'border-go-500 bg-go-50/60 text-ink-900' : 'border-ink-100 text-ink-600 hover:border-ink-200')}
                            >
                              <span className={cn('grid size-10 place-items-center rounded-xl transition', mode === v ? 'bg-go-500 text-white' : 'bg-ink-100')}>
                                <Icon className="size-5" />
                              </span>
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {mode === 'datas' && (
                          <motion.div key="d" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="arr">Chegada em Orlando</Label>
                              <input id="arr" type="date" min={todayISO()} value={arrival} onChange={(e) => { setArrival(e.target.value); if (departure && departure < e.target.value) setDeparture('') }} className="field" />
                            </div>
                            <div>
                              <Label htmlFor="dep">Saída de Orlando</Label>
                              <input id="dep" type="date" min={arrival || todayISO()} value={departure} onChange={(e) => setDeparture(e.target.value)} className="field" />
                            </div>
                            {tripDays > 0 && <p className="text-sm text-ink-500 sm:col-span-2">Sua viagem terá <strong className="text-ink-900">{formatDays(tripDays)}</strong> em Orlando.</p>}
                          </motion.div>
                        )}
                        {mode === 'meses' && (
                          <motion.div key="m" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            <Label>Quais meses você está considerando?</Label>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                              {monthCrowd.map((m) => {
                                const on = months.includes(m.key)
                                return (
                                  <button
                                    key={m.key}
                                    type="button"
                                    aria-pressed={on}
                                    onClick={() => setMonths((x) => (on ? x.filter((k) => k !== m.key) : [...x, m.key]))}
                                    className={cn('cursor-pointer rounded-2xl border-2 p-3 text-center transition', on ? 'border-go-500 bg-go-50/60' : 'border-ink-100 hover:border-ink-200')}
                                  >
                                    <span className="block font-display font-semibold">{m.label}</span>
                                    <span className="mt-1.5 flex justify-center gap-0.5" aria-label={`Movimento: ${crowdLabel[m.level]}`}>
                                      {[1, 2, 3, 4, 5].map((l) => (
                                        <span key={l} className={cn('h-1.5 w-2 rounded-full', l <= m.level ? (m.level >= 4 ? 'bg-go-500' : m.level === 3 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-ink-200')} />
                                      ))}
                                    </span>
                                    <span className="mt-1 block text-[10px] text-ink-400">{crowdLabel[m.level]}</span>
                                  </button>
                                )
                              })}
                            </div>
                            <p className="mt-3 text-xs text-ink-400">Movimento estimado nos parques. Feriados americanos e férias escolares brasileiras costumam lotar os parques.</p>
                          </motion.div>
                        )}
                        {mode === 'indefinido' && (
                          <motion.p key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-2xl bg-ocean-50 p-4 text-sm text-ocean-800">
                            Sem problemas! Com a seleção de parques, nosso consultor sugere a melhor época para você.
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div>
                        <h2 className="font-display text-2xl font-semibold">Quem vai?</h2>
                        <div className="mt-3 divide-y divide-ink-100 rounded-2xl border border-ink-100 px-4">
                          <Stepper label="Adultos" hint="12 anos ou mais" value={adults} min={1} max={12} onChange={setAdults} />
                          <Stepper label="Crianças" hint="Até 11 anos" value={children} max={10} onChange={setChildren} />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button size="lg" onClick={() => go(1)}>
                          Escolher parques <ArrowRight className="size-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="font-display text-2xl font-semibold">Escolha parques e experiências</h2>
                        <p className="mt-1 text-ink-500">Toque para incluir e ajuste os dias de cada um.</p>
                        <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
                          {presets.map((p) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => setSel(Object.fromEntries(p.parks.map((s) => [s, parkBySlug[s].days])))}
                              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-go-500"
                            >
                              <Wand2 className="size-3.5" /> {p.label}
                            </button>
                          ))}
                          {Object.keys(sel).length > 0 && (
                            <button type="button" onClick={() => setSel({})} className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-ink-500 hover:bg-ink-100">
                              <RotateCcw className="size-3.5" /> Limpar
                            </button>
                          )}
                        </div>
                      </div>

                      {resorts.map((r) => (
                        <div key={r.slug}>
                          <h3 className="mb-3 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">{r.name}</h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {r.parks.map((slug) => {
                              const p = parkBySlug[slug]
                              const on = slug in sel
                              return (
                                <motion.div key={slug} layout className={cn('rounded-2xl border-2 transition-colors', on ? 'border-go-500 bg-go-50/40' : 'border-ink-100 hover:border-ink-200')}>
                                  <button type="button" aria-pressed={on} onClick={() => toggle(slug)} className="flex w-full cursor-pointer items-center gap-3 p-3 text-left">
                                    <ParkBadge park={p} size="sm" />
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate font-semibold">{p.short}</span>
                                      <span className="block text-xs text-ink-400">Sugestão: {formatDays(p.days)}</span>
                                    </span>
                                    <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border-2 transition', on ? 'border-go-500 bg-go-500 text-white' : 'border-ink-200')}>
                                      {on && <Check className="size-3.5" strokeWidth={3} />}
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {on && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mx-3 mb-2 border-t border-go-100">
                                          <Stepper label="Dias" value={sel[slug]} min={0.5} max={4} step={0.5} format={(v) => String(v).replace('.', ',')} onChange={(v) => setSel((s) => ({ ...s, [slug]: v }))} />
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => go(0)}>
                          <ArrowLeft className="size-4" /> Voltar
                        </Button>
                        <Button size="lg" onClick={() => go(2)} disabled={!Object.keys(sel).length}>
                          Ver resultado <ArrowRight className="size-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-7 text-white sm:p-10">
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-go-500/40 blur-3xl" />
                        <p className="relative text-sm font-semibold tracking-[0.16em] text-aqua-300 uppercase">Tempo ideal de viagem</p>
                        <motion.p initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="relative mt-2 font-display text-7xl font-bold sm:text-8xl">
                          {summary.totalDays}
                          <span className="ml-3 text-2xl font-medium text-ink-300">dias</span>
                        </motion.p>
                        <div className="relative mt-6 flex h-3 overflow-hidden rounded-full bg-white/10">
                          {[
                            { v: Math.ceil(summary.parkDays), c: 'bg-go-500' },
                            { v: summary.restDays, c: 'bg-aqua-400' },
                            { v: summary.travelDays, c: 'bg-ocean-400' },
                          ].map((b, i) => (
                            <motion.span key={i} className={b.c} initial={{ width: 0 }} animate={{ width: `${(b.v / summary.totalDays) * 100}%` }} transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
                          ))}
                        </div>
                        <div className="relative mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300">
                          <span className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-go-500" /> {formatDays(summary.parkDays)} de parques
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-aqua-400" /> {formatDays(summary.restDays)} de descanso
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-ocean-400" /> {formatDays(summary.travelDays)} de chegada e partida
                          </span>
                        </div>
                      </div>

                      {mode === 'datas' && tripDays > 0 && (
                        <div className={cn('flex gap-3 rounded-2xl p-4 text-sm', tripDays >= summary.totalDays ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800')}>
                          {tripDays >= summary.totalDays ? <Check className="size-5 shrink-0" /> : <TriangleAlert className="size-5 shrink-0" />}
                          <p>
                            {tripDays >= summary.totalDays
                              ? `Suas datas (${formatDate(arrival)} a ${formatDate(departure)}, ${formatDays(tripDays)}) comportam bem a seleção.`
                              : `Suas datas somam ${formatDays(tripDays)} — a seleção pede cerca de ${formatDays(summary.totalDays)}. Considere ajustar os dias ou remover algum parque; nosso consultor também ajuda a otimizar.`}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 rounded-2xl bg-ink-50 p-4 text-sm text-ink-600">
                        <Info className="size-5 shrink-0 text-ocean-600" />
                        <p>Este resultado é uma estimativa baseada em médias de visitação. A 3,2,1 GO confirma ingressos, disponibilidade, calendário e horários dos parques na proposta.</p>
                      </div>

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button variant="ghost" onClick={() => go(1)}>
                          <ArrowLeft className="size-4" /> Ajustar parques
                        </Button>
                        <Button size="lg" onClick={send}>
                          <Send className="size-5" /> Solicitar ingressos com esta seleção
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sua seleção */}
            <aside className="rounded-[28px] bg-white p-6 ring-1 ring-ink-100 lg:sticky lg:top-28">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Sparkles className="size-5 text-go-500" /> Sua seleção
                </h2>
                <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
                  {adults + children} {adults + children === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>
              {summary.selection.length === 0 ? (
                <p className="mt-6 rounded-2xl border-2 border-dashed border-ink-100 p-6 text-center text-sm text-ink-400">Nenhum parque selecionado ainda.</p>
              ) : (
                <ul className="mt-5 space-y-2">
                  <AnimatePresence initial={false}>
                    {Object.entries(sel).map(([slug, days]) => (
                      <motion.li key={slug} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, height: 0 }} className="flex items-center gap-3">
                        <ParkBadge park={parkBySlug[slug]} size="sm" className="size-8 rounded-lg" />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">{parkBySlug[slug].short}</span>
                        <span className="text-sm font-semibold text-ink-500 tabular-nums">{formatDays(days)}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
              <div className="mt-6 space-y-2 border-t border-ink-100 pt-5 text-sm">
                <div className="flex justify-between text-ink-500">
                  <span>Parques e experiências</span>
                  <span className="font-medium text-ink-800">{formatDays(summary.parkDays)}</span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span>Descanso sugerido</span>
                  <span className="font-medium text-ink-800">{formatDays(summary.restDays)}</span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span>Chegada e partida</span>
                  <span className="font-medium text-ink-800">{formatDays(summary.travelDays)}</span>
                </div>
                <div className="flex items-end justify-between pt-3">
                  <span className="font-semibold">Tempo estimado</span>
                  <motion.span key={summary.totalDays} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-3xl font-bold text-go-500">
                    {formatDays(summary.totalDays)}
                  </motion.span>
                </div>
              </div>
              <p className="mt-5 flex gap-2 rounded-2xl bg-ink-50 p-3 text-xs leading-relaxed text-ink-500">
                <Info className="size-4 shrink-0 text-ocean-600" /> Estimativa. A agência confirma ingressos e horários.
              </p>
              {step === 2 && (
                <Button className="mt-4 w-full" onClick={send}>
                  Solicitar ingressos
                </Button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Barra fixa no celular */}
      <AnimatePresence>
        {step === 1 && summary.selection.length > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 p-3 pr-20 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-ink-400">{summary.selection.length} selecionado(s)</p>
                <p className="font-display text-xl font-bold text-go-500">{formatDays(summary.totalDays)}</p>
              </div>
              <Button onClick={() => go(2)}>
                Ver resultado <ArrowRight className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

