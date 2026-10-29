import { motion } from 'framer-motion'
import { ArrowLeft, Calculator, Check, Clock, Maximize2, MapPin, Sparkles, Ticket } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Aurora } from '../components/Hero'
import { ParkMap } from '../components/map/ParkMap'
import { ParkBadge } from '../components/ParkBadge'
import { Button, LinkButton, Reveal, SectionTitle } from '../components/ui'
import { parkBySlug, resortBySlug } from '../data/parks'
import { useQuote } from '../lib/quote'
import { formatDays } from '../lib/utils'
import NotFound from './NotFound'

export default function Parque() {
  const { park: slug } = useParams()
  const park = slug ? parkBySlug[slug] : undefined
  const { openQuote } = useQuote()
  if (!park) return <NotFound />
  const resort = resortBySlug[park.resort]
  const siblings = resort.parks.filter((s) => s !== park.slug).map((s) => parkBySlug[s])

  const requestTickets = () =>
    openQuote({ service: 'ingressos', item: { destination: 'Orlando (MCO)', details: { parks: park.name } }, source: `parque:${park.slug}` })

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-20 text-white sm:pt-40 sm:pb-28">
        <Aurora className="-z-10" />
        <div className="absolute inset-0 -z-10 opacity-40" style={{ background: `radial-gradient(60% 80% at 85% 20%, ${park.colors[0]}, transparent 70%)` }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/orlando" className="inline-flex items-center gap-2 text-sm text-ink-300 transition hover:text-white">
            <ArrowLeft className="size-4" /> {resort.name}
          </Link>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <motion.div initial={{ scale: 0.5, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
                <ParkBadge park={park} size="lg" />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-6 text-4xl leading-[1.04] font-semibold sm:text-6xl">
                {park.name}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-5 text-lg leading-relaxed text-ink-300">
                {park.description}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-6 flex flex-wrap gap-2">
                {park.idealFor.map((t) => (
                  <span key={t} className="glass rounded-full px-3 py-1 text-sm text-ink-100">
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-3xl lg:w-80">
              <div className="bg-white/[0.03] p-5">
                <Clock className="size-5 text-aqua-300" />
                <p className="mt-3 text-xs text-ink-400">Tempo sugerido</p>
                <p className="font-display text-xl font-semibold">{formatDays(park.days)}</p>
              </div>
              <div className="bg-white/[0.03] p-5">
                <MapPin className="size-5 text-go-400" />
                <p className="mt-3 text-xs text-ink-400">Onde fica</p>
                <p className="font-display text-sm leading-snug font-semibold">{park.location ?? 'Orlando, Flórida'}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="rounded-[28px] bg-white p-7 ring-1 ring-ink-100 sm:p-9">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <Sparkles className="size-6 text-go-500" /> Destaques
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {park.highlights.map((h) => (
                <li key={h} className="rounded-2xl bg-ink-50 px-4 py-3.5 font-medium text-ink-800">
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[28px] bg-ink-950 p-7 text-white sm:p-9">
            <h2 className="font-display text-2xl font-semibold">Dicas da 3,2,1 GO</h2>
            <ul className="mt-6 space-y-3.5">
              {park.tips.map((t) => (
                <li key={t} className="flex gap-3 text-ink-200">
                  <Check className="mt-0.5 size-5 shrink-0 text-aqua-300" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {park.hasMap ? (
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              kicker="Mapa interativo"
              title={`Explore o ${park.short}`}
              text="Passe o mouse ou toque nos pontos para ver a prévia. Use os filtros para combinar atrações, restaurantes e lojas."
              action={
                <LinkButton to={`/orlando/mapas/${park.slug}`} variant="outline">
                  <Maximize2 className="size-4" /> Tela cheia
                </LinkButton>
              }
            />
            <Reveal className="mt-10">
              <ParkMap parkSlug={park.slug} embedded />
            </Reveal>
            <p className="mt-4 text-xs text-ink-400">Localização dos pontos baseada no OpenStreetMap. Atrações e horários podem mudar — a agência confirma tudo na proposta.</p>
          </div>
        </section>
      ) : (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border-2 border-dashed border-ink-200 p-8 text-center text-ink-500">O mapa interativo deste parque está em preparação. Fale com a equipe para receber o guia completo.</div>
          </div>
        </section>
      )}

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-go-500 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Vai incluir o {park.short} no roteiro?</h2>
              <p className="mt-2 text-go-50">A gente cota os ingressos com as melhores condições e combina com os outros parques.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="light" size="lg" onClick={requestTickets}>
                <Ticket className="size-5" /> Solicitar ingressos
              </Button>
              <LinkButton to="/orlando/calculadora" variant="glass" size="lg">
                <Calculator className="size-5" /> Calculadora
              </LinkButton>
            </div>
          </div>

          {siblings.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-xl font-semibold">Também no {resort.name}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.map((p) => (
                  <Link key={p.slug} to={`/orlando/parques/${p.slug}`} className="group flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <ParkBadge park={p} size="sm" className="transition group-hover:scale-110" />
                    <span className="font-medium">{p.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
