import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Calculator, FileText, Globe2, HeartHandshake, Headphones, Map, Sparkles, UserRound, WandSparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from '../components/Carousel'
import { DestinationCard } from '../components/Cards'
import { Aurora } from '../components/Hero'
import { ParkBadge } from '../components/ParkBadge'
import { QuoteBox } from '../components/quote/QuoteBox'
import { AnchorButton, Button, Kicker, LinkButton, Reveal, SectionTitle } from '../components/ui'
import { company, tripCategories } from '../data/company'
import { destinations } from '../data/destinations'
import { parkBySlug } from '../data/parks'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/utils'

const heroImages = ['maldivas', 'orlando', 'europa', 'caribe', 'rio'].map((n) => `/img/photos/${n}.webp`)
const words = ['destinos', 'Orlando', 'o Caribe', 'Europa', 'lua de mel', 'cruzeiros']

function Countdown() {
  const tokens = ['3', '2', '1']
  return (
    <div className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.25em] text-go-400 sm:text-base" aria-label="3, 2, 1, GO!">
      {tokens.map((t, i) => (
        <motion.span
          key={t}
          initial={{ opacity: 0, scale: 2.2, filter: 'blur(8px)' }}
          animate={{ opacity: [0, 1, 1], scale: [2.2, 1, 1], filter: 'blur(0px)' }}
          transition={{ delay: 0.2 + i * 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2"
        >
          {t}
          <span className="size-1 rounded-full bg-go-400/60" />
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.3, type: 'spring', stiffness: 300, damping: 12 }}
        className="rounded-md bg-go-500 px-2 py-0.5 tracking-normal text-white shadow-[0_8px_24px_-6px_var(--color-go-500)]"
      >
        GO!
      </motion.span>
    </div>
  )
}

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-grid align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: '70%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-70%', opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient col-start-1 row-start-1 pb-2 whitespace-nowrap"
        >
          {words[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HeroSlideshow() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroImages.length), 6500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence initial={false}>
        <motion.img
          key={heroImages[i]}
          src={heroImages[i]}
          alt=""
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6 }, scale: { duration: 8, ease: 'linear' } }}
          className="absolute inset-0 size-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_20%,var(--color-ink-950)_85%)]" />
    </div>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 text-white sm:pt-40 lg:min-h-[100svh] lg:pb-24">
      <HeroSlideshow />
      <Aurora className="-z-10 opacity-70" intense />
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Countdown />
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-semibold sm:text-7xl lg:text-[5.6rem]"
        >
          Transformamos sonhos em <RotatingWord />
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 sm:text-xl">
          Pacotes nacionais e internacionais, roteiros personalizados, Disney, cruzeiros e lua de mel — com consultoria de verdade do primeiro clique ao embarque.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }} className="mt-10 lg:mt-14">
          <QuoteBox />
        </motion.div>
      </motion.div>
    </section>
  )
}

function Marquee() {
  const items = [...tripCategories, ...tripCategories]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-950 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950" />
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-medium whitespace-nowrap text-ink-300 sm:text-2xl">
            {c}
            <Sparkles className="size-4 text-go-500" />
          </span>
        ))}
      </div>
    </div>
  )
}

const bento = [
  { title: 'Pacotes e roteiros personalizados', text: 'Do jeito que você sonhou, com o ritmo que faz sentido para você.', image: 'planejamento', className: 'md:col-span-2 md:row-span-2', service: 'pacote' as const },
  { title: 'Disney e Orlando', text: 'Parques, ingressos e roteiros mágicos.', image: 'disney', to: '/orlando' },
  { title: 'Cruzeiros', text: 'Marítimos e fluviais.', image: 'cruzeiros-2', service: 'cruzeiro' as const },
  { title: 'Resorts all inclusive', text: 'Descanso sem preocupação.', image: 'resort', service: 'hospedagem' as const },
  { title: 'Lua de mel', text: 'Destinos para começar a vida a dois.', image: 'maldivas-2', service: 'pacote' as const, notes: 'Interesse: Lua de mel' },
  { title: 'Grupos exclusivos', text: 'Família, amigos e empresas.', image: 'familia', className: 'md:col-span-2', service: 'pacote' as const, notes: 'Interesse: Grupo exclusivo' },
  { title: 'Ecoturismo e aventura', text: 'Trilhas, cachoeiras e natureza.', image: 'ecoturismo', className: 'md:col-span-2', service: 'pacote' as const, notes: 'Interesse: Ecoturismo e aventura' },
]

function Services() {
  const { openQuote } = useQuote()
  return (
    <section className="relative bg-ink-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker="O que fazemos" title={<>Os melhores destinos nacionais e internacionais</>} text={company.about} />
        <div className="mt-14 grid auto-rows-[15rem] gap-4 md:grid-cols-4 md:auto-rows-[16rem]">
          {bento.map((b, i) => {
            const inner = (
              <>
                <img src={`/img/photos/${b.image}.webp`} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className={cn('font-display font-semibold text-white', i === 0 ? 'text-3xl sm:text-4xl' : 'text-xl')}>{b.title}</h3>
                    <p className="mt-1 text-sm text-ink-200">{b.text}</p>
                  </div>
                  <span className="glass grid size-11 shrink-0 place-items-center rounded-full text-white transition duration-500 group-hover:rotate-45 group-hover:bg-go-500">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </>
            )
            const cls = 'group relative isolate flex size-full flex-col justify-end overflow-hidden rounded-[26px] p-6 text-left'
            return (
              <Reveal key={b.title} delay={i * 0.06} className={b.className}>
                {b.to ? (
                  <Link to={b.to} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <button type="button" className={cn(cls, 'cursor-pointer')} onClick={() => openQuote({ service: b.service, source: 'home-servicos', notes: b.notes })}>
                    {inner}
                  </button>
                )}
              </Reveal>
            )
          })}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: HeartHandshake, title: 'Atendimento humano', text: 'Um consultor de verdade cuida da sua viagem do início ao fim.' },
            { icon: Globe2, title: 'Parcerias globais', text: 'Acesso às melhores redes de hotéis, companhias e operadoras do mundo.' },
            { icon: WandSparkles, title: 'Proposta sob medida', text: 'Nada de pacote engessado: tudo pensado para o seu perfil.' },
            { icon: Headphones, title: 'Suporte na viagem', text: 'Conte com a gente antes, durante e depois do embarque.' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="group rounded-3xl border border-ink-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-go-50 text-go-500 transition group-hover:bg-go-500 group-hover:text-white">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { n: '3', title: 'Conte sua ideia', text: 'Peça seu orçamento em poucos passos, com as datas e serviços que quiser.' },
  { n: '2', title: 'Receba a proposta', text: 'Um consultor monta o roteiro ideal com as melhores tarifas das nossas parcerias.' },
  { n: '1', title: 'Ajuste e confirme', text: 'Personalize cada detalhe e feche tudo com segurança.' },
  { n: 'GO!', title: 'Embarque', text: 'Vouchers e documentos na Área do Cliente e suporte durante a viagem.' },
]

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <Aurora className="-z-10 opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle dark kicker="Como funciona" title={<>Do sonho ao embarque em <span className="text-gradient">3, 2, 1… GO!</span></>} />
        <div ref={ref} className="relative mt-16">
          <div className="absolute top-12 right-0 left-0 hidden h-px bg-white/10 lg:block">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-gradient-to-r from-go-500 via-go-400 to-aqua-300" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12} className="relative">
                <div className={cn('relative grid h-24 w-fit min-w-24 place-items-center rounded-3xl px-5 font-display text-5xl font-bold', s.n === 'GO!' ? 'bg-go-500 text-white shadow-[0_20px_60px_-15px_var(--color-go-500)]' : 'glass text-white')}>
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-ink-300">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DestinationsPreview() {
  return (
    <section className="bg-ink-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Carousel
          slideClass="basis-[82%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          header={
            <SectionTitle
              kicker="Destinos"
              title="Inspirações para a sua próxima viagem"
              action={
                <div className="hidden md:block">
                  <LinkButton to="/destinos" variant="outline">
                    Ver todos <ArrowRight className="size-4" />
                  </LinkButton>
                </div>
              }
            />
          }
        >
          {destinations.slice(0, 8).map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
        </Carousel>
        <LinkButton to="/destinos" variant="outline" className="mt-8 w-full md:hidden">
          Ver todos os destinos <ArrowRight className="size-4" />
        </LinkButton>
      </div>
    </section>
  )
}

function OrlandoFeature() {
  const preview = ['magic-kingdom', 'epcot', 'universal-studios', 'epic-universe', 'seaworld']
  const [count, setCount] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c + 1) % (preview.length + 1)), 1100)
    return () => clearInterval(t)
  }, [preview.length])
  const days = preview.slice(0, count).reduce((s, slug) => s + parkBySlug[slug].days, 0)

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <img src="/img/photos/orlando.webp" alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-30" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <Kicker dark>Orlando</Kicker>
          <h2 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            Parques e experiências <span className="text-gradient">em Orlando</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-300">Disney, Universal, SeaWorld e Busch Gardens com dicas de quem entende — mapas interativos de cada parque e uma calculadora para planejar os dias.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton to="/orlando" size="lg">
              Explorar parques <ArrowRight className="size-5" />
            </LinkButton>
            <LinkButton to="/orlando/mapas" size="lg" variant="glass">
              <Map className="size-5" /> Mapas interativos
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass relative rounded-[28px] p-6 sm:p-8">
            <div className="absolute -top-4 -right-4 hidden size-24 animate-float rounded-3xl bg-go-500 blur-2xl sm:block" />
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-go-500">
              <Calculator className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">Quantos dias você precisa para aproveitar Orlando?</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {preview.map((slug, i) => {
                const p = parkBySlug[slug]
                const on = i < count
                return (
                  <span key={slug} className={cn('flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-sm transition-all duration-500', on ? 'bg-white text-ink-900' : 'bg-white/5 text-ink-300')}>
                    <ParkBadge park={p} size="sm" className="size-7 rounded-full" />
                    {p.short}
                  </span>
                )
              })}
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
              <span className="text-sm text-ink-300">Tempo estimado de parques</span>
              <motion.span key={days} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-4xl font-bold">
                {String(days).replace('.', ',')} <span className="text-lg font-medium text-ink-300">dias</span>
              </motion.span>
            </div>
            <LinkButton to="/orlando/calculadora" size="lg" className="mt-6 w-full">
              Calcular meus dias e solicitar ingressos
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClientAndFranchise() {
  return (
    <section className="bg-ink-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative isolate overflow-hidden rounded-[30px] bg-white p-8 ring-1 ring-ink-100 sm:p-12">
          <div className="absolute -right-20 -bottom-20 -z-10 size-72 rounded-full bg-ocean-100 blur-3xl" />
          <span className="grid size-14 place-items-center rounded-2xl bg-ink-900 text-white">
            <UserRound className="size-7" />
          </span>
          <h3 className="mt-6 font-display text-3xl font-semibold">Área do Cliente</h3>
          <p className="mt-3 max-w-md text-ink-500">Acompanhe cada etapa da sua viagem e acesse vouchers, bilhetes, seguro e roteiro em um só lugar.</p>
          <ul className="mt-6 space-y-2 text-sm text-ink-600">
            {['Status da viagem em tempo real', 'Documentos sempre à mão', 'Contato direto com a agência'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <FileText className="size-4 text-go-500" /> {t}
              </li>
            ))}
          </ul>
          <LinkButton to="/area-do-cliente" variant="dark" size="lg" className="mt-8">
            Acessar minha área <ArrowRight className="size-5" />
          </LinkButton>
        </Reveal>
        <Reveal delay={0.1} className="relative isolate overflow-hidden rounded-[30px] bg-go-500 p-8 text-white sm:p-12">
          <img src="/img/brand/logo.png" alt="" className="absolute -right-10 -bottom-10 -z-10 w-72 animate-spin-slow opacity-20 mix-blend-luminosity" />
          <span className="text-sm font-semibold tracking-[0.2em] text-go-100 uppercase">Franquia 3,2,1 GO!</span>
          <h3 className="mt-4 max-w-md font-display text-3xl leading-tight font-semibold sm:text-4xl">Abra sua própria agência de viagens</h3>
          <p className="mt-3 max-w-md text-go-50">Empreender no turismo e transformar sonhos em destinos, oportunidades em negócios e viagens em histórias que ficam para sempre.</p>
          <AnchorButton href={company.site} variant="light" size="lg" className="mt-8">
            Conheça a franquia <ArrowUpRight className="size-5" />
          </AnchorButton>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  const { openQuote } = useQuote()
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <HowItWorks />
      <DestinationsPreview />
      <OrlandoFeature />
      <ClientAndFranchise />
      <section className="bg-ink-50 pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-ink-500">Ainda decidindo o destino?</p>
          <Button variant="outline" className="mt-3" onClick={() => openQuote({ service: 'pacote', source: 'home-rodape', notes: 'Ainda estou decidindo o destino' })}>
            Quero ajuda para escolher
          </Button>
        </div>
      </section>
    </>
  )
}
