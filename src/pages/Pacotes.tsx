import { MessagesSquare } from 'lucide-react'
import { PageHero } from '../components/Hero'
import { PacoteCard } from '../components/Pacotes'
import { AnchorButton, Button, LinkButton, Reveal, WhatsAppIcon } from '../components/ui'
import { useEmpresa } from '../lib/empresa'
import { useQuote } from '../lib/quote'

export default function Pacotes() {
  const empresa = useEmpresa()
  const { openQuote } = useQuote()
  const { pacotes } = empresa

  return (
    <>
      <PageHero
        size="sm"
        kicker="Pacotes"
        title={empresa.unidade ? `Ofertas da ${empresa.nomeCurto}` : 'Pacotes e ofertas'}
        text="Saídas marcadas e condições especiais. Gostou de um? Peça a proposta e a equipe confirma valores e disponibilidade para as suas datas."
      />
      <section className="bg-ink-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {empresa.estado === 'carregando' ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-[26px] bg-ink-200/60" />
              ))}
            </div>
          ) : pacotes.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pacotes.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 0.05}>
                  <PacoteCard p={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-ink-950 to-ink-800 p-8 text-white sm:p-14">
              <div className="absolute -top-24 -right-24 size-80 rounded-full bg-go-500/30 blur-3xl" />
              <div className="relative max-w-2xl">
                <span className="grid size-14 place-items-center rounded-2xl bg-white/10">
                  <MessagesSquare className="size-7 text-aqua-300" />
                </span>
                <h2 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">Nenhuma oferta publicada agora.</h2>
                <p className="mt-3 text-lg text-ink-300">A equipe monta um roteiro sob medida, com as melhores tarifas para as suas datas.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AnchorButton size="lg" href={empresa.whatsappLink('Olá! Quero uma proposta de viagem.')} target="_blank" rel="noreferrer" className="bg-[#25d366] shadow-none hover:bg-[#1fb957]">
                    <WhatsAppIcon className="size-5" /> Fale com a equipe
                  </AnchorButton>
                  <Button size="lg" variant="glass" onClick={() => openQuote({ service: 'pacote', source: 'pacotes-vazio' })}>
                    Solicitar proposta
                  </Button>
                  <LinkButton to="/destinos" size="lg" variant="glass">
                    Ver destinos
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
