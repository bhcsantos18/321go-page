import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Gauge, Lightbulb, Map, MapPin, Tag, Ticket } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Aurora } from '../components/Hero'
import { categoryMeta, PinBadge, PoiMiniMap, poiPath } from '../components/map/ParkMap'
import { Button, LinkButton, Reveal } from '../components/ui'
import { parkBySlug } from '../data/parks'
import { pois } from '../data/pois'
import type { Poi } from '../data/types'
import { useQuote } from '../lib/quote'
import NotFound from './NotFound'

function distance(a: Poi, b: Poi) {
  const dLat = a.lat - b.lat
  const dLng = (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180)
  return Math.sqrt(dLat * dLat + dLng * dLng) * 111_320
}

export default function Local() {
  const { park: parkSlug, poi: poiId } = useParams()
  const poi = pois.find((p) => p.park === parkSlug && p.id === poiId)
  const { openQuote } = useQuote()
  if (!poi) return <NotFound />
  const park = parkBySlug[poi.park]
  const meta = categoryMeta[poi.category]
  const nearby = pois
    .filter((p) => p.park === poi.park && p.id !== poi.id)
    .map((p) => ({ p, d: distance(poi, p) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
        <Aurora className="-z-10" />
        <div className="absolute inset-0 -z-10 opacity-30" style={{ background: `radial-gradient(50% 70% at 80% 30%, ${meta.color}, transparent 70%)` }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-400" aria-label="Navegação estrutural">
            <Link to="/orlando" className="hover:text-white">
              Orlando
            </Link>
            <span>/</span>
            <Link to={`/orlando/parques/${park.slug}`} className="hover:text-white">
              {park.short}
            </Link>
            <span>/</span>
            <span className="text-ink-200">{meta.label}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 flex items-center gap-3">
            <PinBadge p={poi} className="size-10 text-base" />
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: meta.light }}>
              {meta.singular} {poi.n} · {park.short}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.08 }} className="mt-5 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
            {poi.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 flex items-center gap-2 text-ink-300">
            <MapPin className="size-4" /> {poi.area}
          </motion.p>
        </div>
      </section>

      <section className="bg-ink-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
          <div className="space-y-6">
            <Reveal className="rounded-[28px] bg-white p-7 ring-1 ring-ink-100 sm:p-9">
              <p className="text-xl leading-relaxed text-ink-800">{poi.description}</p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-ink-50 p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 uppercase">
                    <meta.icon className="size-3.5" /> Categoria
                  </dt>
                  <dd className="mt-1 font-semibold">{meta.singular}</dd>
                </div>
                <div className="rounded-2xl bg-ink-50 p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 uppercase">
                    <MapPin className="size-3.5" /> Área
                  </dt>
                  <dd className="mt-1 font-semibold">{poi.area}</dd>
                </div>
                {poi.intensity && (
                  <div className="rounded-2xl bg-ink-50 p-4">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 uppercase">
                      <Gauge className="size-3.5" /> Intensidade
                    </dt>
                    <dd className="mt-1 font-semibold">{poi.intensity}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {poi.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-go-50 px-3 py-1 text-sm font-medium text-go-700">
                    <Tag className="size-3.5" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
            {poi.tip && (
              <Reveal delay={0.06} className="flex gap-4 rounded-[28px] bg-ink-950 p-7 text-white">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-go-500">
                  <Lightbulb className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold">Dica da 3,2,1 GO</h2>
                  <p className="mt-1 text-ink-300">{poi.tip}</p>
                </div>
              </Reveal>
            )}
            <Reveal delay={0.1} className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => openQuote({ service: 'ingressos', item: { destination: 'Orlando (MCO)', details: { parks: park.name } }, source: `local:${poi.id}` })}>
                <Ticket className="size-5" /> Solicitar ingressos
              </Button>
              <LinkButton to={`/orlando/parques/${park.slug}`} variant="outline" size="lg">
                <ArrowLeft className="size-5" /> Voltar ao parque
              </LinkButton>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal className="relative h-80 overflow-hidden rounded-[28px] ring-1 ring-ink-100 sm:h-96">
              <PoiMiniMap key={poi.id} poi={poi} neighbors={nearby.map((n) => n.p)} />
              <Link
                to={`/orlando/mapas/${park.slug}?local=${poi.id}`}
                className="absolute right-4 bottom-4 z-[500] inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink-900 shadow-xl transition hover:text-go-600"
              >
                <Map className="size-4" /> Ver no mapa interativo
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[28px] bg-white p-6 ring-1 ring-ink-100">
              <h2 className="font-display text-lg font-semibold">Perto daqui</h2>
              <ul className="mt-4 space-y-1">
                {nearby.map(({ p, d }) => (
                  <li key={p.id}>
                    <Link to={poiPath(p)} className="group flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-ink-50">
                      <PinBadge p={p} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{p.name}</span>
                        <span className="text-xs text-ink-400">
                          {categoryMeta[p.category].singular} · ~{Math.max(10, Math.round(d / 10) * 10)} m
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 text-ink-300 transition group-hover:rotate-45 group-hover:text-go-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
