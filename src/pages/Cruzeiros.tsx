import { Check, Lightbulb, Minus } from 'lucide-react'
import { Aurora } from '../components/Hero'
import { Carousel } from '../components/Carousel'
import { PacoteCard } from '../components/Pacotes'
import { Cabines } from '../components/cruzeiros/Cabines'
import { CartaNautica } from '../components/cruzeiros/CartaNautica'
import { HeroCruzeiros } from '../components/cruzeiros/HeroCruzeiros'
import { MonteSeuCruzeiro } from '../components/cruzeiros/MonteSeuCruzeiro'
import { RaioXDoNavio } from '../components/cruzeiros/RaioXDoNavio'
import { Reveal, SectionTitle } from '../components/ui'
import { aParte, inclusos } from '../data/cruzeiros'
import { getDestination } from '../data/destinations'
import { useEmpresa } from '../lib/empresa'

function rolarPara(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Cruzeiros() {
  const { pacotes, nomeCurto } = useEmpresa()
  const deCruzeiro = pacotes.filter((p) => p.tipo === 'cruzeiro')
  const dicas = getDestination('cruzeiros')?.tips ?? []

  return (
    <>
      <HeroCruzeiros onRoteiros={() => rolarPara('roteiros')} onMontar={() => rolarPara('monte')} onExplorar={() => rolarPara('navio')} />

      <section id="roteiros" className="relative isolate scroll-mt-16 overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle dark kicker="Carta náutica" title="Escolha a rota e acompanhe o navio" text="Cada região tem um roteiro de exemplo com os portos nas coordenadas reais. Toque em um dia para levar o navio até ele." />
          <div className="mt-12">
            <CartaNautica />
          </div>
        </div>
      </section>

      <section id="navio" className="scroll-mt-16 bg-ink-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker="Raio-X do navio" title="O que tem a bordo" text="Um navio de cruzeiro é um resort que navega. Veja onde fica cada área e o que já está incluído na tarifa." />
          <div className="mt-12">
            <RaioXDoNavio />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle kicker="Cabines" title="Qual cabine combina com você" text="O tipo de cabine é o que mais muda o valor do cruzeiro. Compare as plantas e escolha pelo seu jeito de viajar." />
          <div className="mt-12">
            <Cabines />
          </div>
        </div>
      </section>

      <section id="monte" className="relative isolate scroll-mt-16 overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
        <Aurora className="-z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle dark kicker="Monte seu cruzeiro" title="Seu cartão de embarque em quatro escolhas" text="Escolha região, mês, duração e cabine. A consultora recebe tudo e responde com as saídas e os navios disponíveis." />
          <div className="mt-12">
            <MonteSeuCruzeiro />
          </div>
        </div>
      </section>

      {deCruzeiro.length > 0 && (
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Carousel slideClass="basis-[82%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" header={<SectionTitle kicker="Saídas confirmadas" title={`Cruzeiros da ${nomeCurto}`} />}>
              {deCruzeiro.map((p) => (
                <PacoteCard key={p.id} p={p} />
              ))}
            </Carousel>
          </div>
        </section>
      )}

      <section className="bg-ink-50 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionTitle kicker="Antes de embarcar" title="O que costuma estar incluído" text="Varia conforme a companhia e a tarifa. A proposta da consultora detalha o que vale para o seu navio." className="lg:sticky lg:top-28 lg:self-start" />
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="rounded-[24px] bg-white p-6 ring-1 ring-ink-100">
                <h3 className="font-display text-lg font-semibold text-ink-900">Normalmente incluído</h3>
                <ul className="mt-4 space-y-2.5">
                  {inclusos.map((t) => (
                    <li key={t} className="flex gap-2.5 text-ink-700">
                      <Check className="mt-0.5 size-4.5 shrink-0 text-emerald-600" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.06} className="rounded-[24px] bg-white p-6 ring-1 ring-ink-100">
                <h3 className="font-display text-lg font-semibold text-ink-900">Normalmente à parte</h3>
                <ul className="mt-4 space-y-2.5">
                  {aParte.map((t) => (
                    <li key={t} className="flex gap-2.5 text-ink-700">
                      <Minus className="mt-0.5 size-4.5 shrink-0 text-go-500" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            {dicas.map((t, i) => (
              <Reveal key={t} delay={i * 0.05} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-100">
                <Lightbulb className="mt-0.5 size-5 shrink-0 text-go-500" />
                <p className="text-ink-700">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
