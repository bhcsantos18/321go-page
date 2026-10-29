import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Banknote, CalendarDays, Check, IdCard, Lightbulb, MessagesSquare, Send, ThermometerSun } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Carousel } from '../components/Carousel'
import { DestinationCard } from '../components/Cards'
import { PageHero } from '../components/Hero'
import { AnchorButton, Button, LinkButton, Reveal, SectionTitle } from '../components/ui'
import { WhatsAppIcon } from '../components/ui'
import { whatsappLink } from '../data/company'
import { destinations, getDestination } from '../data/destinations'
import { useQuote } from '../lib/quote'
import NotFound from './NotFound'

export default function Destino() {
  const { slug } = useParams()
  const d = getDestination(slug)
  const { openQuote } = useQuote()
  if (!d) return <NotFound />

  const request = (notes?: string) => openQuote({ service: 'pacote', item: { destination: d.title }, source: `destino:${d.slug}`, notes })

  const facts = [
    { icon: CalendarDays, label: 'Melhor época', text: d.bestSeason },
    { icon: ThermometerSun, label: 'Clima', text: d.climate },
    { icon: IdCard, label: 'Documentos', text: d.documents },
    { icon: Banknote, label: 'Moeda e idioma', text: d.currency },
  ]

  return (
    <>
      <PageHero kicker={`${d.category} · ${d.region}`} title={d.title} text={d.intro} image={d.image} size="lg">
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => request()}>
            <Send className="size-5" /> Solicitar proposta
          </Button>
          {d.related && (
            <LinkButton to={d.related.to} size="lg" variant="glass">
              {d.related.label} <ArrowRight className="size-5" />
            </LinkButton>
          )}
        </div>
      </PageHero>

      <section className="relative z-10 -mt-10 pb-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.07} className="rounded-3xl border border-ink-100 bg-white p-6 shadow-xl shadow-ink-900/5">
              <span className="grid size-11 place-items-center rounded-2xl bg-go-50 text-go-500">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-xs font-semibold tracking-wider text-ink-400 uppercase">{f.label}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-800">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <div>
            <SectionTitle kicker="O que fazer" title={`Experiências ${d.inName}`} />
            <ol className="mt-10 space-y-3">
              {d.todo.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.06}>
                  <li className="group flex gap-5 rounded-3xl bg-white p-5 ring-1 ring-ink-100 transition hover:shadow-lg hover:shadow-ink-900/5 sm:p-6">
                    <span className="font-display text-3xl font-bold text-ink-200 transition group-hover:text-go-500">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                      <p className="mt-1 text-ink-500">{t.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            {d.gallery.length > 0 && (
              <Reveal className="grid grid-cols-2 gap-3">
                {d.gallery.slice(0, 3).map((src, i) => (
                  <motion.img key={src} whileHover={{ scale: 1.03 }} src={src} alt="" loading="lazy" className={i === 0 ? 'col-span-2 h-56 w-full rounded-3xl object-cover' : 'h-40 w-full rounded-3xl object-cover'} />
                ))}
              </Reveal>
            )}
            <Reveal delay={0.1} className="rounded-3xl bg-ink-950 p-7 text-white">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Lightbulb className="size-5 text-go-400" /> Dicas da 3,2,1 GO
              </h3>
              <ul className="mt-5 space-y-3">
                {d.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-ink-200">
                    <Check className="mt-0.5 size-5 shrink-0 text-aqua-300" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker="Ofertas" title={d.offers.length ? `Propostas ${d.toName}` : 'Viagem sob medida'} text={d.offers.length ? 'Sugestões de roteiro para começar. O valor é calculado pelo consultor para as suas datas e número de viajantes.' : undefined} />
          {d.offers.length ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {d.offers.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.08} className="group relative flex flex-col rounded-[28px] border border-ink-100 bg-gradient-to-b from-white to-ink-50 p-7 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink-900/10">
                  {o.tag && <span className="absolute top-6 right-6 rounded-full bg-go-500 px-3 py-1 text-xs font-semibold text-white">{o.tag}</span>}
                  <span className="text-sm font-semibold text-ocean-600">{o.nights}</span>
                  <h3 className="mt-1 pr-24 font-display text-2xl font-semibold">{o.title}</h3>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {o.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-2.5 text-ink-600">
                        <span className="grid size-5 place-items-center rounded-full bg-go-50 text-go-500">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex items-center justify-between border-t border-ink-100 pt-5">
                    <span className="text-sm text-ink-400">Valor sob consulta</span>
                    <Button size="sm" onClick={() => request(`Oferta: ${o.title} (${o.nights})`)}>
                      Quero esta <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="relative mt-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-ink-950 to-ink-800 p-8 text-white sm:p-14">
              <div className="absolute -top-24 -right-24 size-80 rounded-full bg-go-500/30 blur-3xl" />
              <div className="relative max-w-2xl">
                <span className="grid size-14 place-items-center rounded-2xl bg-white/10">
                  <MessagesSquare className="size-7 text-aqua-300" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">No momento não há ofertas publicadas {d.toName}.</h3>
                <p className="mt-3 text-lg text-ink-300">Mas isso não é problema: nossa equipe monta um roteiro exclusivo, com as melhores tarifas para as suas datas.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AnchorButton size="lg" href={whatsappLink(`Olá! Quero uma proposta ${d.toName}.`)} className="bg-[#25d366] shadow-none hover:bg-[#1fb957]">
                    <WhatsAppIcon className="size-5" /> Fale com a equipe
                  </AnchorButton>
                  <Button size="lg" variant="glass" onClick={() => request()}>
                    Solicitar proposta
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-ink-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Carousel slideClass="basis-[82%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" header={<SectionTitle kicker="Continue explorando" title="Outros destinos" />}>
            {destinations
              .filter((x) => x.slug !== d.slug)
              .map((x) => (
                <DestinationCard key={x.slug} d={x} />
              ))}
          </Carousel>
          <Link to="/destinos" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-go-600">
            <ArrowLeft className="size-4" /> Voltar para todos os destinos
          </Link>
        </div>
      </section>
    </>
  )
}
