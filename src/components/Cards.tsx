import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { parkBySlug } from '../data/parks'
import type { Destination, Resort } from '../data/types'
import { useQuote } from '../lib/quote'
import { ParkBadge } from './ParkBadge'

export function DestinationCard({ d }: { d: Destination }) {
  const { openQuote } = useQuote()
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[26px] bg-ink-800 shadow-xl shadow-ink-900/10">
      <img src={d.image} alt={d.title} loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-white">{d.category}</span>
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">
          {d.offers.length ? `${d.offers.length} ${d.offers.length > 1 ? 'ofertas' : 'oferta'}` : 'Sob medida'}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-aqua-200">
          <MapPin className="size-3.5" /> {d.region}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-semibold text-white sm:text-[1.7rem]">{d.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-200">{d.summary}</p>
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuote({ service: 'pacote', item: { destination: d.title }, source: `destino:${d.slug}` })}
            className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-go-500 px-4 text-sm font-semibold text-white transition hover:bg-go-600"
          >
            <Send className="size-4" /> Solicitar proposta
          </button>
          <Link to={`/destinos/${d.slug}`} aria-label={`Ver dicas de ${d.title}`} className="glass grid size-10 shrink-0 place-items-center rounded-full text-white transition hover:bg-white hover:text-ink-900">
            <ArrowUpRight className="size-4.5 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export function ResortCard({ r }: { r: Resort }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-ink-900">
      <div className="relative h-52 overflow-hidden">
        <img src={r.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-ink-950" style={{ background: r.accent }}>
          {r.parks.length} {r.slug === 'mais' ? 'experiências' : 'parques'}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-2">
        <h3 className="font-display text-2xl font-semibold text-white">{r.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">{r.tagline}</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {r.parks.map((slug) => {
            const p = parkBySlug[slug]
            return (
              <Link key={slug} to={`/orlando/parques/${slug}`} className="group/park flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] p-2 pr-3 transition hover:border-white/20 hover:bg-white/[0.08]">
                <ParkBadge park={p} size="sm" className="transition-transform duration-500 group-hover/park:scale-110 group-hover/park:-rotate-6" />
                <span className="text-[13px] leading-tight font-medium text-ink-100">{p.short}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}
