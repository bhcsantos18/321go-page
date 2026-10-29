import { AnimatePresence, motion } from 'framer-motion'
import { Calculator, ChevronDown, Inbox, Mail, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageHero } from '../components/Hero'
import { WhatsAppIcon } from '../components/ui'
import { serviceById } from '../data/services'
import { deleteRequest, describeItem, listRequests, updateRequestStatus, type RequestStatus, type StoredRequest } from '../lib/submit'
import { cn, formatDays } from '../lib/utils'

const statusMeta: Record<RequestStatus, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'bg-go-500 text-white' },
  'em-atendimento': { label: 'Em atendimento', className: 'bg-amber-100 text-amber-800' },
  'proposta-enviada': { label: 'Proposta enviada', className: 'bg-ocean-100 text-ocean-800' },
  fechado: { label: 'Fechado', className: 'bg-emerald-100 text-emerald-800' },
}

export default function Painel() {
  const [list, setList] = useState<StoredRequest[]>([])
  const [open, setOpen] = useState<string | null>(null)
  const refresh = () => setList(listRequests())

  useEffect(() => {
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  return (
    <>
      <PageHero size="sm" kicker="Uso interno" title="Painel do consultor" text="Solicitações de orçamento recebidas pelo site. Nesta versão os pedidos ficam salvos neste navegador; configure VITE_QUOTE_ENDPOINT para enviá-los ao seu CRM, e-mail ou webhook." />
      <section className="min-h-[50vh] bg-ink-50 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap gap-3">
            {(Object.keys(statusMeta) as RequestStatus[]).map((s) => (
              <span key={s} className="rounded-2xl bg-white px-4 py-3 ring-1 ring-ink-100">
                <span className="block font-display text-2xl font-bold">{list.filter((r) => r.status === s).length}</span>
                <span className="text-xs text-ink-500">{statusMeta[s].label}</span>
              </span>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-ink-200 p-12 text-center text-ink-500">
              <Inbox className="mx-auto size-10 text-ink-300" />
              <p className="mt-4">Nenhuma solicitação ainda. Envie um pedido pelo site para vê-lo aqui.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.map((r) => {
                const d = r.draft
                const isOpen = open === r.protocol
                const phone = d.contact.whatsapp.replace(/\D/g, '')
                return (
                  <motion.li layout key={r.protocol} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100">
                    <button type="button" onClick={() => setOpen(isOpen ? null : r.protocol)} className="flex w-full cursor-pointer flex-wrap items-center gap-4 p-5 text-left">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', statusMeta[r.status].className)}>{statusMeta[r.status].label}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{d.contact.name}</span>
                        <span className="block text-xs text-ink-400">
                          {r.protocol} · {new Date(r.createdAt).toLocaleString('pt-BR')}
                        </span>
                      </span>
                      <span className="flex gap-1">
                        {[d.main, ...d.extras].map((s) => {
                          const Icon = serviceById[s].icon
                          return (
                            <span key={s} title={serviceById[s].label} className="grid size-8 place-items-center rounded-lg bg-ink-100 text-ink-600">
                              <Icon className="size-4" />
                            </span>
                          )
                        })}
                        {d.calculator && (
                          <span title="Calculadora anexada" className="grid size-8 place-items-center rounded-lg bg-ocean-100 text-ocean-700">
                            <Calculator className="size-4" />
                          </span>
                        )}
                      </span>
                      <ChevronDown className={cn('size-5 text-ink-400 transition', isOpen && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="grid gap-6 border-t border-ink-100 p-5 md:grid-cols-2">
                            <div className="space-y-4 text-sm">
                              {[d.main, ...d.extras].map((s) =>
                                d.items
                                  .filter((i) => i.service === s)
                                  .map((i, idx) => (
                                    <div key={i.id}>
                                      <p className="font-semibold">
                                        {serviceById[s].label} {idx > 0 && `#${idx + 1}`}
                                      </p>
                                      <ul className="mt-1 space-y-0.5 text-ink-600">
                                        {describeItem(i).map((l) => (
                                          <li key={l}>{l}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )),
                              )}
                              {d.calculator && (
                                <div>
                                  <p className="font-semibold">Calculadora de parques</p>
                                  <p className="text-ink-600">
                                    {d.calculator.selection.map((s) => `${s.name} (${formatDays(s.days)})`).join(', ')} — total {formatDays(d.calculator.totalDays)}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="space-y-4 text-sm">
                              <div>
                                <p className="font-semibold">Preferências</p>
                                <p className="text-ink-600">
                                  {d.prefs.flex} · {d.prefs.cabin} · {d.prefs.hotel} · {d.prefs.board} · {d.prefs.budget}
                                </p>
                                {d.prefs.notes && <p className="mt-1 text-ink-600">“{d.prefs.notes}”</p>}
                              </div>
                              <div>
                                <p className="font-semibold">Contato</p>
                                <p className="text-ink-600">
                                  {d.contact.whatsapp} · {d.contact.email}
                                </p>
                                {d.contact.notes && <p className="mt-1 text-ink-600">“{d.contact.notes}”</p>}
                                <p className="mt-1 text-xs text-ink-400">Consentimento LGPD: {d.contact.consent ? 'sim' : 'não'} · Origem: {d.source}</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <select
                                  value={r.status}
                                  onChange={(e) => {
                                    updateRequestStatus(r.protocol, e.target.value as RequestStatus)
                                    refresh()
                                  }}
                                  className="field h-10 w-auto cursor-pointer text-sm"
                                  aria-label="Status"
                                >
                                  {(Object.keys(statusMeta) as RequestStatus[]).map((s) => (
                                    <option key={s} value={s}>
                                      {statusMeta[s].label}
                                    </option>
                                  ))}
                                </select>
                                <a href={`https://wa.me/55${phone}`} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25d366] px-4 font-semibold text-white">
                                  <WhatsAppIcon className="size-4" /> WhatsApp
                                </a>
                                <a href={`mailto:${d.contact.email}?subject=Proposta ${r.protocol}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-ink-200 px-4 font-semibold">
                                  <Mail className="size-4" /> E-mail
                                </a>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteRequest(r.protocol)
                                    refresh()
                                  }}
                                  aria-label="Excluir"
                                  className="grid size-10 cursor-pointer place-items-center rounded-full text-ink-400 hover:bg-go-50 hover:text-go-600"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
