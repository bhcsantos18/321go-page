import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PacoteDoSite } from '../lib/carby'
import { useEmpresa } from '../lib/empresa'
import { capaDoPacote, datasDoPacote, duracaoDoPacote, precoDoPacote, ROTULO_DO_TIPO } from '../lib/pacotes'
import { useQuote } from '../lib/quote'
import { Carousel } from './Carousel'
import { LinkButton, SectionTitle } from './ui'

export function pedidoDoPacote(p: PacoteDoSite) {
  return {
    service: 'pacote' as const,
    item: { destination: p.destino, origin: p.saida_cidade ?? '', dateStart: p.data_ida ?? '', dateEnd: p.data_volta ?? '' },
    source: `pacote:${p.codigo}`,
    notes: `Pacote ${p.codigo} — ${p.titulo}`,
  }
}

export function PacoteCard({ p }: { p: PacoteDoSite }) {
  const { openQuote } = useQuote()
  const capa = capaDoPacote(p)
  const preco = precoDoPacote(p)
  const duracao = duracaoDoPacote(p)
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[26px] bg-ink-800 shadow-xl shadow-ink-900/10">
      {capa ? (
        <img src={capa} alt={p.titulo} loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ocean-600 to-go-500" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
        <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-white">{ROTULO_DO_TIPO[p.tipo] ?? 'Pacote'}</span>
        {preco && <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">{preco} <span className="font-normal text-ink-500">/pessoa</span></span>}
      </div>
      <div className="p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-aqua-200">
          <MapPin className="size-3.5" /> {p.destino}
        </p>
        <h3 className="mt-2 line-clamp-2 font-display text-2xl leading-tight font-semibold text-white">{p.titulo}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-200">
          <CalendarDays className="size-4 shrink-0" /> {[datasDoPacote(p), duracao].filter(Boolean).join(' · ')}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuote(pedidoDoPacote(p))}
            className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-go-500 px-4 text-sm font-semibold text-white transition hover:bg-go-600"
          >
            <Send className="size-4" /> Quero este
          </button>
          <Link to={`/pacotes/${p.id}`} aria-label={`Ver o pacote ${p.titulo}`} className="glass grid size-10 shrink-0 place-items-center rounded-full text-white transition hover:bg-white hover:text-ink-900">
            <ArrowUpRight className="size-4.5 transition group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export function PacotesDaUnidade() {
  const { pacotes, nomeCurto } = useEmpresa()
  if (!pacotes.length) return null
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel
          slideClass="basis-[82%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          header={
            <SectionTitle
              kicker="Pacotes"
              title={`Ofertas da ${nomeCurto}`}
              action={
                <div className="hidden md:block">
                  <LinkButton to="/pacotes" variant="outline">
                    Ver todos <ArrowRight className="size-4" />
                  </LinkButton>
                </div>
              }
            />
          }
        >
          {pacotes.slice(0, 8).map((p) => (
            <PacoteCard key={p.id} p={p} />
          ))}
        </Carousel>
        <LinkButton to="/pacotes" variant="outline" className="mt-8 w-full md:hidden">
          Ver todos os pacotes <ArrowRight className="size-4" />
        </LinkButton>
      </div>
    </section>
  )
}
