import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from '../components/Carousel'
import { DestinationCard } from '../components/Cards'
import { PageHero } from '../components/Hero'
import { AnchorButton, Button, Reveal, SectionTitle } from '../components/ui'
import { whatsappLink } from '../data/company'
import { destinationCategories, destinations } from '../data/destinations'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/utils'

export default function Destinos() {
  const [cat, setCat] = useState('Todos')
  const { openQuote } = useQuote()
  const list = useMemo(() => (cat === 'Todos' ? destinations : destinations.filter((d) => d.category === cat)), [cat])

  return (
    <>
      <PageHero
        kicker="Destinos"
        title={
          <>
            Inspirações para a sua <span className="text-gradient">próxima viagem</span>
          </>
        }
        text="Praias paradisíacas, cidades icônicas, parques e aventuras. Escolha uma inspiração e receba uma proposta montada sob medida para você."
      />

      <section className="bg-ink-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Carousel
            slideClass="basis-[82%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            header={
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Categorias">
                {destinationCategories.map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={c === cat}
                    onClick={() => setCat(c)}
                    className={cn('relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors', c === cat ? 'text-white' : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:text-ink-900')}
                  >
                    {c === cat && <motion.span layoutId="dest-cat" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>
            }
          >
            {list.map((d) => (
              <motion.div key={d.slug} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <DestinationCard d={d} />
              </motion.div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker="Guia rápido" title="Dicas de cada destino" text="Melhor época, clima, documentos e o que fazer — tudo o que você precisa saber antes de decidir." />
          <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((d) => (
                <motion.div key={d.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                  <Link to={`/destinos/${d.slug}`} className="group flex items-center gap-4 rounded-3xl border border-ink-100 p-3 transition hover:border-ink-200 hover:shadow-xl hover:shadow-ink-900/5">
                    <div className="size-24 shrink-0 overflow-hidden rounded-2xl">
                      <img src={d.image} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-go-500">{d.category}</span>
                      <h3 className="truncate font-display text-lg font-semibold">{d.title}</h3>
                      <p className="line-clamp-1 text-sm text-ink-500">{d.bestSeason}</p>
                    </div>
                    <ArrowUpRight className="mr-2 size-5 shrink-0 text-ink-300 transition group-hover:rotate-45 group-hover:text-go-500" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-ink-50 py-20">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-go-500 text-white">
            <MessageCircle className="size-7" />
          </span>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Não encontrou o destino dos seus sonhos?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-500">Nossa equipe monta roteiros para qualquer lugar do mundo. Conte para a gente o que você imagina.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => openQuote({ service: 'pacote', source: 'destinos' })}>
              Solicitar proposta
            </Button>
            <AnchorButton size="lg" variant="outline" href={whatsappLink('Olá! Quero ajuda para escolher um destino.')}>
              Fale com a equipe
            </AnchorButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
