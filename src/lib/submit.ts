import { company } from '../data/company'
import { serviceById } from '../data/services'
import type { QuoteDraft, ServiceItem } from './quote'
import { formatDate, formatDays } from './utils'

export type RequestStatus = 'novo' | 'em-atendimento' | 'proposta-enviada' | 'fechado'

export interface StoredRequest {
  protocol: string
  createdAt: string
  status: RequestStatus
  draft: QuoteDraft
}

const STORAGE_KEY = 'go321:solicitacoes'

function makeProtocol() {
  const d = new Date()
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `GO-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function travelers(i: ServiceItem) {
  const parts = [`${i.adults} adulto${i.adults === 1 ? '' : 's'}`]
  if (i.children) parts.push(`${i.children} criança${i.children === 1 ? '' : 's'}`)
  if (i.babies) parts.push(`${i.babies} bebê${i.babies === 1 ? '' : 's'}`)
  return parts.join(', ')
}

export function describeItem(i: ServiceItem) {
  const lines: string[] = []
  const period = [formatDate(i.dateStart), formatDate(i.dateEnd)].filter(Boolean).join(' → ')
  switch (i.service) {
    case 'aereo':
      lines.push(`${i.tripType === 'so-ida' ? 'Só ida' : 'Ida e volta'}: ${i.origin || '?'} → ${i.destination || '?'}`)
      break
    case 'carro':
      lines.push(`Retirada: ${i.destination || '?'}${i.details.dropoff ? ` · Devolução: ${i.details.dropoff}` : ''}`)
      break
    case 'cruzeiro':
      lines.push(`Região: ${i.details.region || 'a definir'}${i.details.month ? ` · Mês: ${i.details.month}` : ''}`)
      break
    case 'pacote':
      lines.push(`${i.origin ? `Saindo de ${i.origin} → ` : ''}${i.destination || 'Destino a definir'}`)
      break
    default:
      lines.push(i.destination || 'Destino a definir')
  }
  if (period) lines.push(`Datas: ${period}`)
  if (i.service !== 'carro') lines.push(`Viajantes: ${travelers(i)}${i.service === 'hospedagem' ? ` · ${i.rooms} quarto(s)` : ''}`)
  for (const [k, v] of Object.entries(i.details)) {
    if (!v || ['dropoff', 'region', 'month'].includes(k)) continue
    lines.push(`${detailLabels[k] ?? k}: ${v}`)
  }
  return lines
}

const detailLabels: Record<string, string> = {
  category: 'Categoria',
  coverage: 'Cobertura',
  parks: 'Parques/atrações',
  notes: 'Observações',
  cabins: 'Cabines',
}

export function quoteToText(draft: QuoteDraft, protocol?: string) {
  const out: string[] = []
  out.push(`*Solicitação de orçamento — ${company.name}*${protocol ? `\nProtocolo: ${protocol}` : ''}`)
  out.push('')
  const groups = [draft.main, ...draft.extras]
  for (const s of groups) {
    const items = draft.items.filter((i) => i.service === s)
    items.forEach((it, idx) => {
      out.push(`*${serviceById[s].label}${items.length > 1 ? ` ${idx + 1}` : ''}*`)
      describeItem(it).forEach((l) => out.push(`• ${l}`))
    })
  }
  out.push('')
  out.push('*Preferências*')
  out.push(`• Flexibilidade: ${draft.prefs.flex}`)
  if (groups.some((s) => s === 'aereo' || s === 'pacote')) out.push(`• Classe: ${draft.prefs.cabin}`)
  if (groups.some((s) => s === 'hospedagem' || s === 'pacote')) out.push(`• Hotel: ${draft.prefs.hotel} · ${draft.prefs.board}`)
  out.push(`• Orçamento: ${draft.prefs.budget}`)
  if (draft.prefs.notes) out.push(`• ${draft.prefs.notes}`)
  if (draft.calculator) {
    const c = draft.calculator
    out.push('')
    out.push('*Calculadora de dias de parques*')
    c.selection.forEach((s) => out.push(`• ${s.name}: ${formatDays(s.days)}`))
    out.push(`• Total sugerido: ${formatDays(c.totalDays)} (${formatDays(c.parkDays)} de parques)`)
  }
  out.push('')
  out.push('*Contato*')
  out.push(`• ${draft.contact.name}`)
  out.push(`• WhatsApp: ${draft.contact.whatsapp}`)
  out.push(`• E-mail: ${draft.contact.email}`)
  if (draft.contact.notes) out.push(`• Obs.: ${draft.contact.notes}`)
  return out.join('\n')
}

export function listRequests(): StoredRequest[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveRequests(list: StoredRequest[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* armazenamento indisponível (aba anônima etc.) */
  }
}

export function updateRequestStatus(protocol: string, status: RequestStatus) {
  saveRequests(listRequests().map((r) => (r.protocol === protocol ? { ...r, status } : r)))
}

export function deleteRequest(protocol: string) {
  saveRequests(listRequests().filter((r) => r.protocol !== protocol))
}

/**
 * Envia a solicitação ao consultor.
 * - Se VITE_QUOTE_ENDPOINT estiver configurado, faz POST do JSON (webhook, CRM, Formspree...).
 * - Sempre registra no Painel do consultor (/painel) deste navegador.
 * - Na confirmação, o cliente também pode encaminhar o resumo pelo WhatsApp ou e-mail.
 */
export async function submitQuote(draft: QuoteDraft): Promise<StoredRequest> {
  const request: StoredRequest = { protocol: makeProtocol(), createdAt: new Date().toISOString(), status: 'novo', draft }
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT as string | undefined
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...request, resumo: quoteToText(draft, request.protocol) }),
    })
    if (!res.ok) throw new Error(`Falha no envio (${res.status})`)
  } else {
    await new Promise((r) => setTimeout(r, 900))
  }
  saveRequests([request, ...listRequests()])
  return request
}

export function mailtoLink(draft: QuoteDraft, protocol: string) {
  const subject = `Orçamento ${protocol} — ${draft.contact.name}`
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteToText(draft, protocol).replace(/\*/g, ''))}`
}
