import type { PacoteDoSite } from './carby'

export const ROTULO_DO_TIPO: Record<string, string> = {
  nacional: 'Nacional',
  internacional: 'Internacional',
  cruzeiro: 'Cruzeiro',
  excursao: 'Excursão',
  lua_de_mel: 'Lua de mel',
  resort: 'Resort',
  corporativo: 'Corporativo',
  outro: 'Pacote',
}

export function dataCurta(iso: string | null): string {
  if (!iso) return ''
  const [ano, mes, dia] = iso.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

export function precoDoPacote(p: Pick<PacoteDoSite, 'preco_por_pessoa' | 'moeda'>): string {
  if (!p.preco_por_pessoa) return ''
  return Number(p.preco_por_pessoa).toLocaleString('pt-BR', { style: 'currency', currency: p.moeda || 'BRL', maximumFractionDigits: 2 })
}

export function duracaoDoPacote(p: Pick<PacoteDoSite, 'duracao_dias' | 'duracao_noites'>): string {
  const partes: string[] = []
  if (p.duracao_dias) partes.push(`${p.duracao_dias} ${p.duracao_dias === 1 ? 'dia' : 'dias'}`)
  if (p.duracao_noites) partes.push(`${p.duracao_noites} ${p.duracao_noites === 1 ? 'noite' : 'noites'}`)
  return partes.join(' e ')
}

export function datasDoPacote(p: Pick<PacoteDoSite, 'data_ida' | 'data_volta'>): string {
  if (!p.data_ida) return 'Saída flexível'
  return p.data_volta ? `${dataCurta(p.data_ida)} a ${dataCurta(p.data_volta)}` : `Saída em ${dataCurta(p.data_ida)}`
}

export function capaDoPacote(p: Pick<PacoteDoSite, 'fotos'>): string | null {
  const capa = p.fotos?.[0]
  return capa ? capa.url : null
}

export function miniaturaDoPacote(p: Pick<PacoteDoSite, 'fotos'>): string | null {
  const capa = p.fotos?.[0]
  return capa ? capa.url_miniatura || capa.url : null
}

export function mensagemDoPacote(p: Pick<PacoteDoSite, 'titulo' | 'codigo'>): string {
  return `Olá! Tenho interesse no pacote ${p.titulo} (${p.codigo}).`
}
