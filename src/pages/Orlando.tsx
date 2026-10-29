import { ArrowRight, ArrowUpRight, Calculator, Map, MapPin, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Carousel } from '../components/Carousel'
import { ResortCard } from '../components/Cards'
import { Aurora, PageHero } from '../components/Hero'
import { ParkBadge } from '../components/ParkBadge'
import { Button, Kicker, LinkButton, Reveal, SectionTitle } from '../components/ui'
import { getDestination } from '../data/destinations'
import { mappedParks, resorts } from '../data/parks'
import { pois } from '../data/pois'
import { useQuote } from '../lib/quote'

export default function Orlando() {
  const { openQuote } = useQuote()
  const orlando = getDestination('orlando')!
  return (
    <>
      <PageHero
        kicker="Orlando · Flórida"
        image="/img/photos/orlando.webp"
        size="lg"
        title={
          <>
            Parques e experiências <span className="text-gradient">em Orlando</span>
          </>
        }
        text="Tudo para planejar a viagem mais mágica da sua vida: guia de cada parque, mapas interativos e uma calculadora para saber quantos dias reservar."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton to="/orlando/calculadora" size="lg">
            <Calculator className="size-5" /> Calcular meus dias
          </LinkButton>
          <LinkButton to="/orlando/mapas" size="lg" variant="glass">
            <Map className="size-5" /> Mapas dos parques
          </LinkButton>
        </div>
      </PageHero>

      <section className="relative isolate overflow-hidden bg-ink-950 pt-8 pb-24 text-white sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Carousel dark slideClass="basis-[88%] sm:basis-1/2 lg:basis-1/3" header={<SectionTitle dark kicker="Resorts" title="Escolha seu universo" text="Toque em um parque para ver descrição, dicas e o mapa interativo." />}>
            {resorts.map((r) => (
              <ResortCard key={r.slug} r={r} />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="bg-ink-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-[36px] bg-ink-950 p-8 text-white sm:p-14 lg:p-20">
            <Aurora className="-z-10" intense />
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <Kicker dark>Calculadora</Kicker>
                <h2 className="mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl">Quantos dias você precisa para aproveitar Orlando?</h2>
                <p className="mt-5 max-w-xl text-lg text-ink-300">Escolha os parques e experiências, informe as datas e veja o tempo ideal de viagem — com dias de descanso incluídos. Depois é só enviar para a gente cotar os ingressos.</p>
                <LinkButton to="/orlando/calculadora" size="lg" className="mt-8">
                  Calcular meus dias e solicitar ingressos <ArrowRight className="size-5" />
                </LinkButton>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {mappedParks.concat().slice(0, 8).map((p, i) => (
                  <Reveal key={p.slug} delay={0.1 + i * 0.05} className="glass flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl p-2 text-center">
                    <ParkBadge park={p} size="md" />
                    <span className="text-[11px] leading-tight text-ink-200">{p.short}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Mapas interativos"
            title="Um mapa para cada parque"
            text="Atrações, restaurantes e lojas numerados, com filtros, busca e dicas de cada local."
            action={
              <LinkButton to="/orlando/mapas" variant="outline">
                Abrir mapas <ArrowUpRight className="size-4" />
              </LinkButton>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mappedParks.map((p, i) => {
              const count = pois.filter((x) => x.park === p.slug).length
              return (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <Link to={`/orlando/mapas/${p.slug}`} className="group flex items-center gap-4 rounded-3xl border border-ink-100 p-4 transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-xl hover:shadow-ink-900/5">
                    <ParkBadge park={p} className="transition duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-display font-semibold">{p.name}</h3>
                      <p className="flex items-center gap-1 text-sm text-ink-500">
                        <MapPin className="size-3.5" /> {count} pontos no mapa
                      </p>
                    </div>
                    <ArrowUpRight className="size-5 text-ink-300 transition group-hover:rotate-45 group-hover:text-go-500" />
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SectionTitle kicker="Antes de ir" title="Dicas para Orlando" text={orlando.bestSeason} className="lg:sticky lg:top-28 lg:self-start" />
          <div className="space-y-3">
            {[orlando.documents, ...orlando.tips].map((t, i) => (
              <Reveal key={t} delay={i * 0.05} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-100">
                <span className="font-display text-lg font-bold text-go-500">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-ink-700">{t}</p>
              </Reveal>
            ))}
            <Button size="lg" className="mt-4 w-full sm:w-auto" onClick={() => openQuote({ service: 'ingressos', item: { destination: 'Orlando (MCO)' }, source: 'orlando' })}>
              <Ticket className="size-5" /> Solicitar ingressos
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
