import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, CreditCard, MapPin, PlaneTakeoff, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/Hero'
import { pedidoDoPacote } from '../components/Pacotes'
import { AnchorButton, Button, LinkButton, Reveal, WhatsAppIcon } from '../components/ui'
import { useEmpresa } from '../lib/empresa'
import { capaDoPacote, dataCurta, datasDoPacote, duracaoDoPacote, mensagemDoPacote, precoDoPacote, ROTULO_DO_TIPO } from '../lib/pacotes'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/utils'

export default function Pacote() {
  const { id } = useParams()
  const empresa = useEmpresa()
  const { openQuote } = useQuote()
  const [foto, setFoto] = useState(0)
  const p = empresa.pacotes.find((x) => x.id === id)

  if (empresa.estado === 'carregando') return <div className="min-h-[100svh] bg-ink-950" />

  if (!p) {
    return (
      <PageHero size="sm" kicker="Pacotes" title="Este pacote não está mais disponível" text="A oferta pode ter acabado ou mudado. Veja as outras ofertas ou fale com a equipe.">
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton to="/pacotes" size="lg">
            <ArrowLeft className="size-5" /> Ver pacotes
          </LinkButton>
          <AnchorButton href={empresa.whatsappLink()} target="_blank" rel="noreferrer" size="lg" variant="glass">
            <WhatsAppIcon className="size-5" /> WhatsApp
          </AnchorButton>
        </div>
      </PageHero>
    )
  }

  const preco = precoDoPacote(p)
  const duracao = duracaoDoPacote(p)
  const fotos = p.fotos || []
  const atual = fotos[Math.min(foto, Math.max(fotos.length - 1, 0))]

  return (
    <>
      <PageHero size="sm" kicker={ROTULO_DO_TIPO[p.tipo] ?? 'Pacote'} title={p.titulo} image={capaDoPacote(p) ?? undefined}>
        <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-200">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-go-400" /> {p.destino}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-go-400" /> {datasDoPacote(p)}</span>
          {duracao && <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-go-400" /> {duracao}</span>}
        </p>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            {atual && (
              <Reveal>
                <div className="overflow-hidden rounded-[28px] bg-ink-100">
                  <img src={atual.url} alt={p.titulo} className="aspect-[16/10] w-full object-cover" />
                </div>
                {fotos.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {fotos.map((f, i) => (
                      <button
                        key={f.url}
                        type="button"
                        onClick={() => setFoto(i)}
                        aria-label={`Foto ${i + 1}`}
                        className={cn('size-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl ring-2 transition', i === foto ? 'ring-go-500' : 'ring-transparent opacity-70 hover:opacity-100')}
                      >
                        <img src={f.url_miniatura || f.url} alt="" loading="lazy" className="size-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </Reveal>
            )}

            {p.descricao && (
              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-ink-900">Sobre o pacote</h2>
                <p className="mt-4 leading-relaxed whitespace-pre-line text-ink-600">{p.descricao}</p>
              </Reveal>
            )}

            {(p.inclui.length > 0 || p.nao_inclui) && (
              <Reveal className="mt-10 grid gap-8 sm:grid-cols-2">
                {p.inclui.length > 0 && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink-900">O que inclui</h2>
                    <ul className="mt-4 space-y-2.5">
                      {p.inclui.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-ink-600">
                          <span className="grid size-5 place-items-center rounded-full bg-go-50 text-go-500">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.nao_inclui && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink-900">Não inclui</h2>
                    <p className="mt-4 flex gap-2.5 text-ink-600">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-500">
                        <X className="size-3" strokeWidth={3} />
                      </span>
                      <span className="whitespace-pre-line">{p.nao_inclui}</span>
                    </p>
                  </div>
                )}
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="sticky top-28 rounded-[30px] bg-ink-950 p-8 text-white">
              <p className="text-sm text-ink-300">{preco ? 'A partir de' : 'Valor'}</p>
              <p className="mt-1 font-display text-4xl font-semibold">{preco || 'Sob consulta'}</p>
              {preco && <p className="text-sm text-ink-400">por pessoa</p>}
              <ul className="mt-6 space-y-3 text-sm text-ink-200">
                {p.saida_cidade && (
                  <li className="flex items-center gap-2"><PlaneTakeoff className="size-4 text-go-400" /> Saindo de {p.saida_cidade}</li>
                )}
                <li className="flex items-center gap-2"><CalendarDays className="size-4 text-go-400" /> {datasDoPacote(p)}</li>
                {p.condicoes_pagamento && (
                  <li className="flex items-start gap-2"><CreditCard className="mt-0.5 size-4 shrink-0 text-go-400" /> <span className="whitespace-pre-line">{p.condicoes_pagamento}</span></li>
                )}
              </ul>
              {p.validade && <p className="mt-6 text-xs text-ink-400">Oferta válida até {dataCurta(p.validade)}. Valores e disponibilidade confirmados na proposta.</p>}
              {!p.validade && <p className="mt-6 text-xs text-ink-400">Valores e disponibilidade confirmados na proposta.</p>}
              <Button size="lg" className="mt-6 w-full" onClick={() => openQuote(pedidoDoPacote(p))}>
                Quero este pacote <ArrowRight className="size-5" />
              </Button>
              <AnchorButton href={empresa.whatsappLink(mensagemDoPacote(p))} target="_blank" rel="noreferrer" size="lg" variant="glass" className="mt-3 w-full">
                <WhatsAppIcon className="size-5" /> Tirar dúvidas no WhatsApp
              </AnchorButton>
              <p className="mt-5 text-center text-xs text-ink-500">Código {p.codigo}</p>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/pacotes" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-go-600">
            <ArrowLeft className="size-4" /> Voltar para os pacotes
          </Link>
        </div>
      </section>
    </>
  )
}
